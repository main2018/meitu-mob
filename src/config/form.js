export const formConf = [
  {
    type: 'select',
    model: 'category'
  }, {
    type: 'select',
    model: 'subcategory'
  }, {
  /*
    type: 'file',
    model: 'coverimg'
  }, {
    type: 'file',
    model: 'images',
    multiple: true
  }, {
  */
    type: 'text',
    model: 'title',
    label: 'title',
    required: true,
    placeholder: 'title'
  }, {
    type: 'textarea',
    model: 'text',
    required: true
    /*
  }, {
    type: 'range',
    model: 'year',
    min: 1,
    max: 100,
    step: 1,
    value: 50
    */
  }, {
    type: 'button',
    value: 'submit',
    event: {
      click: 'publish(/album/add)'
    }
  }]
