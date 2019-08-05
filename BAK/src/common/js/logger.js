/**
 * customizable console.log for chromium-browser
 * @params: 'bold', '#0c0', '18px', '18rem'
 */
export const log = function (...rest) {
  if (process.env.NODE_ENV !== 'development') return
  let style = ''
  let hasOpt = false
  let msgs = []
  let reg = {
    color: /^#\s*([0-9a-f]{3}){1,2}$/gi,
    fontSize: /[px | rem]$/gi,
    fontWeight: /^bold$/gi
  }
  rest.forEach((opt) => {
    let isOpt = false
    for (let key in reg) {
      if (reg[key].test(opt)) {
        style += `${key.replace(/([A-Z]{1})/g, `-$1`).toLowerCase()}: ${opt}; `
        isOpt = true
        hasOpt = true
      }
    }
    if (!isOpt) {
      msgs.push(opt)
    }
  })
  let needsColorOpt = !hasOpt || (hasOpt && !/color/gi.test(style))
  if (needsColorOpt) { style += `color: #0c0` }
  showMsgs(msgs, style)
}

function showMsgs (msgs, style) {
  let sysInfo = navigator.appVersion
  if (/iPhone|Android/.test(sysInfo)) {
    for (let msg of msgs) {
      console.log(msg)
    }
    return
  }
  // console log result
  for (let msg of msgs) {
    if (msg instanceof Array) {
      let i = 0
      for (let item of msg) {
        console.log(`%c${i++}: `, style)
        console.log(`%c${JSON.stringify(item)}`, style)
      }
      return
    } else if (typeof msg === 'object') {
      console.log(`%c{`, style)
      for (let key in msg) {
        console.log(`%c${key}: ${JSON.stringify(msg[key])}`, style)
      }
      console.log(`%c}`, style)
    } else {
      console.log(`%c${msg}`, style)
    }
  }
}

