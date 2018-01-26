export const loadScript = (key) => {
  if (global.AMap) {
    return Promise.resolve(global.AMap)
  }
  return new Promise((resolve, reject) => {
    global._init = () => {
      resolve(global.AMap)
      global.document.body.removeChild($script)
      global._init = null
    }
    const $script = document.createElement('script')
    global.document.body.appendChild($script)
    const url = 'http://webapi.amap.com'
    $script.src = `${url}/maps?v=1.3&key=${key}&callback=_init`
  })
}

export const initMap = () => {
  const AMap = global.AMap
  this.map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: this.initZoom
  })
  this.map.plugin(['AMap.ToolBar'], () => {
    let tool = new AMap.ToolBar({
      position: 'RT'
    })
    this.map.addControl(tool)
  })
  this.map.plugin('AMap.Geolocation', () => {
    this.geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      buttonOffset: new AMap.Pixel(10, 100),
      buttonPosition: 'LT'
    })
    this.map.addControl(this.geolocation)
    this.geolocation.getCurrentPosition()
  })
}

export const _initMap = (AMap) => {
  this._globalAmap = AMap
  this._map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: this.initZoom
  })
  this._map.plugin(['AMap.ToolBar'], () => {
    let tool = new AMap.ToolBar({
      position: 'RT'
    })
    this._map.addControl(tool)
  })
  // this.setCenterMarker(AMap)
  this._map.plugin('AMap.Geolocation', () => {
    this._geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
      buttonOffset: new AMap.Pixel(10, 100), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonPosition: 'LT'
    })
    this._map.addControl(this._geolocation)
    this._geolocation.getCurrentPosition()
    AMap.event.addListener(this._geolocation, 'complete', this.onComplete) // 返回定位信息
    AMap.event.addListener(this._geolocation, 'error', this.onError)      // 返回定位出错信息
  })
}
