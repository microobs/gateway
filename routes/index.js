const pkg = require('../package.json'),
  router = require('express').Router();

router.use('/metrics', require('./metrics'));

router.use('/logs', require('./logs'))

router.use('/health', require('./health'));

router.use('/version', (req, res) => {
  res.json({
    "applicationName": pkg.name,
    "versionRelease": pkg.version
  })
});

module.exports = router;