const express = require('express');
const { renderHTML } = require('../utils/common');
const router = express.Router();

router.get('/', (req, res) => {
	return renderHTML(res, '', 'index');
});

module.exports = router;
