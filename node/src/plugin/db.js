const mariadb = require('mariadb');
const logger = require('./logger');
require('dotenv').config(); // dotenv 설정

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'adhd_memo',
    connectionLimit: process.env.DB_CONN_LIMIT || 5
});

// 연결 테스트 및 로그 기록
pool.getConnection()
    .then(conn => {
        logger.info('MariaDB connection established successfully.');
        conn.release(); // 연결 해제
    })
    .catch(err => {
        logger.error('Error connecting to MariaDB:', err);
    });
module.exports = pool;