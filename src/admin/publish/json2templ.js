const CLASS_PREFIX = 'aw-'

export function genTemplate (arr) {
  return `<ul>${genLiDom(arr)}</ul>`
}

export function genModel (arr) {
  let model = {}
  arr.forEach(json => {
    if (json.type === 'file' || json.type === 'button') { return }
    model[json.model] = ''
  })
  return model
}

function genLiDom (arr) {
  let liDom = ''
  let element = ''
  arr.forEach(json => {
    element = json.type === 'textarea' ? 'textarea' : 'input'
    liDom += `
    <li class="${CLASS_PREFIX}item}">
      <label for="${json.model}">${json.label || json.model || ''}</label>
      <${element} ${genAttribute(json)}></${element}>
    </li>`
  })
  return liDom
}

function genAttribute (json) {
  let attr = `${bindModel(json)} name="${json.model}"`
  for (let key in json) {
    if (key === 'model') { continue }
    attr += key === 'event' ? `${bindEvent(json)}` : `${key}="${json[key]}"`
  }
  return attr
}

function bindModel (json) {
  let noModel = json.type === 'file' || json.type === 'button'
  return noModel ? '' : `v-model="postJson.${json.model}"`
}

function bindEvent (json) {
  let event = ''
  for (let key in json.event) {
    event += ` @${key}=${getFunString(json.event[key])}`
  }
  return event
}

function getFunString (event) {
  let hasParam = /\(/.test(event)
  if (!hasParam) { return event }
  let funName = event.split('(')[0]
  let param = /\((\S+)\)/.exec(event)[1]
  return `"${funName}('${param}')"`
}
