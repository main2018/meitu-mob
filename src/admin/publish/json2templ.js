import { CLASS_PREFIX } from 'common/constant'

export function genTemplate (arr) {
  // console.log(`<ul class="${CLASS_PREFIX}form">${genLiDom(arr)}</ul>`)
  return `<ul class="${CLASS_PREFIX}form">${genLiDom(arr)}</ul>`
}

export function genModel (arr) {
  let model = {}
  arr.forEach(json => {
    if (json.type === 'file' || json.type === 'button') { return }
    model[json.model] = ''
    if (json.options) { model[json.model] = json.options[0] }
  })
  return model
}

function genLiDom (arr) {
  let liDom = ''
  let element = ''
  arr.forEach(json => {
    if (json.type === 'options') { return }
    element = genElement(json.type)
    liDom += `
    <li class="${CLASS_PREFIX}item">
      ${genLabel(json)}
      <${element} ${genAttribute(json)}>
        ${genOptions(json, json.options)}
      </${element}>
    </li>`
  })
  liDom += `
    <li class="quill-wrapper">
      <label>Content</label>
      <quill-editor :options="editorOptions" v-model="postJson.content"></quill-editor>
    </li>
    <li class="${CLASS_PREFIX}btn">
      <input class="warn" type="button" value="reset" @click="reset">
      <input class="normal" type="button" value="submit" @click="publish('/album/add')">
    </li>
  `
  return liDom
}

function genLabel (json) {
  if (!json.label && !json.model) { return '' }
  let mark = json.required ? '<span class="aw-warn">*</span>' : ''
  return `<label for="${json.model}"> ${mark}${json.label || json.model} </label>`
}

function genElement (type) {
  let element = ''
  switch (type) {
    case 'textarea': element = 'textarea'; break
    case 'select': element = 'select'; break
    default: element = 'input'
  }
  return element
}

function genOptions (json, options) {
  let elements = ''
  if (json.type === 'select' && options) {
    options.forEach(opt => { elements += `<option>${opt}</option>` })
  }
  return elements
}

function genAttribute (json) {
  let attr = `${bindModel(json)} name="${json.model}"`
  for (let key in json) {
    if (!needAddAttr(key, json)) { continue }
    attr += key === 'event' ? `${bindEvent(json)}` : `${key}="${json[key]}"`
  }
  if (json.type === 'file') { attr += ` @change="getFile($event)"` }
  return attr
}

function needAddAttr (key, formJson) {
  let needAdd = true
  if (key === 'model' || key === 'options') { needAdd = false }
  if (key === 'type' && formJson.type === 'select') { needAdd = false }
  return needAdd
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
