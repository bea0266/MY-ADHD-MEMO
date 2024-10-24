const express = require('express');
const router = express.Router();
const logger = require('../plugin/logger');
const pool = require('../plugin/db');

router.get('/', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();

      const query = `SELECT id, content, createdDate, updatedDate, category FROM tb_memo`;
      const result = await conn.query(query);
      
      logger.info(query);
      logger.info(JSON.stringify(result));
      
      return res.status(200).send({ items: result });
  } catch (err) {
      logger.error(err.message);
      return res.status(500).send({ msg: 'internal server error.' });
  } finally {
      if (conn) conn.release(); // 연결 해제
  }
});

// 메모 등록
router.post('/', async (req, res) => {
  const category = req.body.category;

  let conn;
  try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const query = `INSERT INTO tb_memo (category) VALUES (?)`;
      const result = await conn.query(query, [category]);
      
      logger.info(`query insert id: ${result.insertId}`);
      
      conn.commit();
      
      return res.status(200).send({ category });
  } catch (err) {
      conn.rollback();
      logger.error(err.message);
      return res.status(500).send({ msg: 'internal server error.' });
  } finally {
      if (conn) conn.release(); // 연결 해제
  }
});

// 메모 수정
router.put('/:id', async (req, res) => {
  const memoId = req.params.id;
  const content = req.body.content;

  let conn;
  try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const query = `UPDATE tb_memo SET content=? where id=?`;
      const result = await conn.query(query, [content, memoId]);
      
      logger.info(query);      
      logger.info(`query insert id: ${result.insertId}`);
      
      conn.commit();
      
      return res.status(201).send({ id: memoId, content });
  } catch (err) {
      conn.rollback();
      logger.error(err.message);
      return res.status(500).send({ msg: 'internal server error.' });
  } finally {
      if (conn) conn.release(); // 연결 해제
  }
});

module.exports = router;
