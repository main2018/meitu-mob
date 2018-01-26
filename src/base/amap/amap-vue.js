exports.js = () => {
  return {
    name: 'vue-amap',
    data () {
      return {
        // Global引用
        _globalAmap: null,
        // 本地map实例
        _map: null,
        // 本地geolocation实例
        _geolocation: null,
        // debug use
        poiList: '',
        markers: []
      }
    },

    props: {
      initZoom: {
        type: Number,
        default: 16
      }
    },

    methods: {
      _initMap (AMap) {
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
        this.setCenterMarker(AMap)
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
      },
      _loadScript () {
        if (!global.AMap) {
          return new Promise((resolve, reject) => {
            global._init = () => {
              resolve(global.AMap)
              global.document.body.removeChild($script)
              global._init = null
            }
            const $script = document.createElement('script')
            global.document.body.appendChild($script)
            // 配置web key 6a46e03bea82e6046f9388f6b6f4539b
            // 测试key
            // $script.src = 'http://webapi.amap.com/maps?v=1.3&key=6a46e03bea82e6046f9388f6b6f4539b&callback=_init'
            // 正式key
            $script.src = 'http://webapi.amap.com/maps?v=1.3&key=103606a500d2aad32dd532c11c099f3a&callback=_init'
          })
        }
        return Promise.resolve(global.AMap)
      }
    },

    created () {
      this._loadScript().then(this._initMap)
    }
  }
}
