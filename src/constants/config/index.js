/* eslint-disable */
if (process.env.REACT_APP_ENV === 'production') {
  module.exports = require('./config.production');
} else if (process.env.REACT_APP_ENV === 'staging') {
  module.exports = require('./config.staging');
} else if (process.env.REACT_APP_ENV === 'develop') {
  module.exports = require('./config.develop');
} else if (process.env.REACT_APP_ENV === 'local') {
  module.exports = require('./config.local');
} else {
  module.exports = require('./config.local');
}
