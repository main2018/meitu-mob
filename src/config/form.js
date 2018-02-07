export const formConf = [
  {
    model: 'coverimg',
    label: 'cover',
    type: 'file'
  }, {
    model: 'title',
    label: 'title',
    required: true,
    type: 'text',
    placeholder: 'title'
  }, {
    model: 'text',
    type: 'textarea'
  }, {
    model: 'year',
    type: 'range',
    min: 1,
    max: 100,
    step: 1,
    value: 50
  }, {
    type: 'button',
    value: 'submit',
    event: {
      click: 'publish(/album/add)'
    }
  }]
