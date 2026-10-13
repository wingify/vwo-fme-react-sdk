
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./wingify-fme-react-sdk.cjs.production.min.js')
} else {
  module.exports = require('./wingify-fme-react-sdk.cjs.development.js')
}
