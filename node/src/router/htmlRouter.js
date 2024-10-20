const express = require('express');
const { renderHTML } = require('../utils/common');
const router = express.Router();
const path = require('path');

// 화면 파일 경로 기본값
const DEFAULT_VIEW_DIR_PATH = '../views';


/** 메인 화면 표시 */
router.get('/', (req, res) => {
	return res.sendFile(
		path.join(__dirname, DEFAULT_VIEW_DIR_PATH, 'index.html')
	);
});

module.exports = router;
