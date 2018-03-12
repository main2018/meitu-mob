export const formConf = [
  /*
  {
    type: 'options',
    options: {
      name: '',
      card: 'normal'
    }
  },
  */

  {
    type: 'select',
    model: 'select',
    label: 'haha',
    options: [
      'one',
      'two'
    ]
  }, {
    type: 'file',
    label: 'coverimg',
    multiple: false
  }, {
    type: 'file',
    label: 'images',
    multiple: true
  }, {
    type: 'text',
    model: 'title',
    label: 'title',
    required: true,
    placeholder: 'title'
  /*
  }, {
    type: 'textarea',
    model: 'text',
    required: true
  }, {
    type: 'range',
    model: 'year',
    min: 1,
    max: 100,
    step: 1,
    value: 50

  }, {
    type: 'button',
    value: 'test',
    event: {
      click: 'test'
    }
  */
  }]
