export const genDynamicWrapper = (isPC, name) => {
  const Dynamic = isPC
    ? require('pc/pc-index/pc-index')
    : require('base/tab/tab')

  return {
    name,
    template: `<div><dynamic></dynamic></div>`,
    components: { Dynamic }
  }
}
