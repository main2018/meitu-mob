export const genDynamicWrapper = (isPC, name) => {
  const Dynamic = isPC
    ? require('pc/pc-list/pc-list')
    : require('base/tab/tab')

  return {
    name: `Dy${name}`,
    template: `<div><dynamic></dynamic></div>`,
    components: { Dynamic }
  }
}
