import { post, get } from './ajax-axios'
import {
  getLocalStore,
  setLocalStore,
  delLocalStore
} from './localStorage'
import { log } from './logger'
import { getQiniuUrl } from './qiniu-api.js'

export const AjaxPost = {
  install (Vue) {
    Vue.prototype.post = post
    Vue.post = post
  },
  post: post
}

export const AjaxGet = {
  install (Vue) {
    Vue.prototype.get = get
    Vue.get = get
  },
  get: get
}

export const GetLocal = {
  install (Vue) {
    Vue.prototype.getLocal = getLocalStore
    Vue.getLocal = getLocalStore
  },
  getLocal: getLocalStore
}

export const SetLocal = {
  install (Vue) {
    Vue.prototype.setLocal = setLocalStore
    Vue.setLocal = setLocalStore
  },
  setLocal: setLocalStore
}

export const DelLocal = {
  install (Vue) {
    Vue.prototype.delLocal = delLocalStore
    Vue.delLocal = delLocalStore
  },
  delLocal: delLocalStore
}

export const QiniuUrl = {
  install (Vue) {
    Vue.prototype.$qiniuUrl = getQiniuUrl
    Vue.$qiniuUrl = getQiniuUrl
  },
  $qiniuUrl: getQiniuUrl
}

export const Log = {
  install (Vue) {
    Vue.prototype.log = log
    Vue.log = log
  },
  log: log
}

export const _2space = str => str.replace(/__/g, ' ')
export const timeFormat = str => str ? str.substr(0, 10) : null

export function setObjectPropToData (prop, data) {
  let ob = {}
  for (let key in this[data]) {
    ob[key] = this[data][key]
  }
  this[data] = this[prop]
  for (let key in ob) {
    let hasKey = this[data].hasOwnProperty(key)
    if (!hasKey) { this[data][key] = ob[key] }
  }
}

export function getBgStyle (uri, ratio = '3 : 2') {
  const isRatio = (typeof ratio === 'string' || typeof ratio === 'undefined')
  const needCompress = (ratio === false)
  const url = getQiniuUrl(uri, needCompress)

  ratio = isRatio ? ratio : '3 : 2'
  let style = {
    height: 0,
    width: '100%',
    paddingBottom: getImgHeight(ratio),
    backgroundColor: '#eee',
    backgroundImage: uri ? `url(${url})` : '',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  return style
}

export function getImgHeight (ratio = '3 : 2') {
  let height = ''
  if (/:/g.test(ratio)) {
    let w = +ratio.split(':')[0]
    let h = +ratio.split(':')[1]
    if (w > 0 && h > 0) { height = ~~(100 / w * h) + '%' }
  } else {
    height = ratio
  }
  return height
}

export async function getRemoteImgsSize (imgs) {
  let images = await Promise.all(
    imgs.map(img => _getSize(img))
  )
  return Promise.resolve(images)
}

function _getSize (img) {
  return new Promise(resolve => {
    let dom = document.createElement('img')
    dom.src = getQiniuUrl(img.url || img.uri)
    dom.onload = () => {
      let { width, height } = dom
      resolve({ ...img, width, height })
    }
    dom.onerror = () => {
      console.log('on error')
    }
  })
}

export function getCacheImgSize (img) {
  return new Promise((resolve) => {
    let interVal = setInterval(() => {
      if (img.width > 0 || img.height > 0) {
        let { width, height } = img
        clearInterval(interVal)
        resolve({ width, height })
      }
    }, 40)
  })
}

export function sortCompare (prop, rise = true) { // 排序
  return (pre, next) => {
    const obj1 = pre[prop]
    const obj2 = next[prop]
    const riseVal = obj1 < obj2 ? -1 : (obj1 > obj2 ? 1 : 0)
    const downVal = obj1 < obj2 ? 1 : (obj1 > obj2 ? -1 : 0)
    return rise ? riseVal : downVal
  }
}

export function sortAlbum (album) {
  const keys = ['links', 'images', 'videos']
  keys.forEach(key => {
    if (album[key].length <= 1) { return }
    album[key].sort(sortCompare('order'))
  })
  return album
}

/* eslint-disable */
export const Searcher = (() => {
  let escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
  let escapeReg = reg => reg.replace(escapeRegExp, '\\$&');
  //groupLeft 与 groupRight是对结果进一步处理所使用的分割符，可以修改
  // let groupLeft = '(',
  //     groupRight = ')';
  // let groupLeft = '<span style="color: red">',
  //     groupRight = '</span>';
  let groupLeft = '',
      groupRight = '';
  let groupReg = new RegExp(escapeReg(groupRight + groupLeft), 'g');
  let groupExtractReg = new RegExp('(' + escapeReg(groupLeft) + '[\\s\\S]+?' + escapeReg(groupRight) + ')', 'g');
  //从str中找到最大的匹配长度
  let findMax = (str, keyword) => {
    let max = 0;
    keyword = groupLeft + keyword + groupRight;
    str.replace(groupExtractReg, m => {
      //keyword完整的出现在str中，则优秀级最高，排前面
      if (keyword == m) {
          max = Number.MAX_SAFE_INTEGER;
      } else if (m.length > max) {//找最大长度
          max = m.length;
      }
    });
    return max;
  };
  let keyReg = key => {
    let src = ['(.*?)('];
    let ks = key.split('');
    if (ks.length) {
      while (ks.length) {
        src.push(escapeReg(ks.shift()), ')(.*?)(');
      }
      src.pop();
    }
    src.push(')(.*?)');
    src = src.join('');
    let reg = new RegExp(src, 'i');
    let replacer = [];
    let start = key.length;
    let begin = 1;
    while (start > 0) {
      start--;
      replacer.push('$', begin, groupLeft + '$', begin + 1, groupRight);
      begin += 2;
    }
    replacer.push('$', begin);
    const info = {
      regexp: reg,
      replacement: replacer.join('')
    };
    return info;
  };
  return {
    search(list, keyword) {
      //生成搜索正则
      let kr = keyReg(keyword);
      let result = [];
      for (let e of list) {
        //如果匹配
        if (kr.regexp.test(e)) {
          //把结果放入result数组中
          result.push(e.replace(kr.regexp, kr.replacement)
              .replace(groupReg, ''));
        }
      }
      //对搜索结果进行排序
      //1\. 匹配关键字大小写一致的优先级最高，比如搜索up, 结果中的[user-page,beginUpdate,update,endUpdate]，update要排在最前面，因为大小写匹配
      //2\. 匹配关键字长的排在前面
      result = result.sort((a, b) => findMax(b, keyword) - findMax(a, keyword));
      return result;
    }
  };
})();
