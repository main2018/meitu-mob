export function getLocalStore (item) {
  return global.localStorage.getItem(item)
}

export function setLocalStore (item, value) {
  global.localStorage.setItem(item, value)
}
