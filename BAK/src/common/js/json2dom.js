/**
 */

export const json2dom = (arr) => {
  if (!arr.length) { return }
  let dom = document.createElement('ul')
  dom.setAttribute('class', prefix('form'))
  arr.forEach(json => dom.append(genDom[json.type](json)))
  return dom
}

let genDom = {
  text: json => getDomByType(json, true),
  file: json => getDomByType(json, true),
  time: json => getDomByType(json, true),
  range: json => getDomByType(json, true),
  button: json => getDomByType(json),
  textarea: json => getDomByType(json, true)
}

let getDomByType = (json, lable) => {
  let element = json.type === 'textarea' ? 'textarea' : 'input'
  let dom = document.createElement(element)
  for (let key in json) {
    if (key === 'event') { continue }
    if (key === 'field') {
      dom.setAttribute('name', json.field)
      dom.setAttribute('id', json.field)
      dom.setAttribute('value', json.placeholder ? json.placeholder : ' ')
    } else {
      dom.setAttribute(key, json[key])
    }
  }
  for (let key in json.event) {
    dom.addEventListener(key, json.event[key])
  }
  return genLiDom(dom, json.field)
}

function genLiDom (dom, lable) {
  let liDom = document.createElement('li')
  liDom.setAttribute('class', prefix('item'))
  if (lable) {
    liDom.innerHTML = `
    <lable>${lable}</lable>
    `
  }
  liDom.append(dom)
  return liDom
}

function prefix (className) {
  return `aw-${className}`
}

