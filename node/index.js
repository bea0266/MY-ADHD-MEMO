// node로 렌더링하면 서버 사이드에서 렌더링이 가능해진다. 즉 처리 속도가 빠르다.
// 또한, 검색엔진이 크롤링할 때에도 문제가 없다.

const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');
const { renderHTML } = require('./src/utils/common');
const htmlRouter = require('./src/router/htmlRouter');
const memoRouter = require('./src/router/memoRouter');
const winstonLogger = require('./src/plugin/logger');

const app = express();
const port = 3000;

app.use(express.static('public'));
// body-parser 미들웨어 추가
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱

app.use((req, res, next) => {
	winstonLogger.info(`request body: ${JSON.stringify(req.body)}`);
    next();
	// console.log('logger test');
});
app.use(logger('dev'));
app.use('/', htmlRouter);
app.use('/memo', memoRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

module.exports = app;