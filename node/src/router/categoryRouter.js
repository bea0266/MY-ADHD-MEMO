const express = require('express');
const router = express.Router();
const logger = require('../plugin/logger');
const pool = require('../plugin/db');

/**
 * @swagger
 * /category:
 *   get:
 *     summary: 카테고리 목록 조회
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 properties:
 *                     number:
 *                         type: int
 *                         example: 1
 *                         description: 카테고리 번호
 */
router.get('/', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();

      const query = `SELECT id, name, createdDate, updatedDate FROM tb_memo_category`;
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

// 카테고리 등록
router.post('/', async (req, res) => {
  const categoryName = req.body.name;

  let conn;
  try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const query = `INSERT INTO tb_memo_category (name) VALUES (?)`;
      const result = await conn.query(query, [categoryName]);
      
      logger.info(`query insert id: ${result.insertId}`);
      
      conn.commit();
      
      return res.status(200).send({ categoryName });
  } catch (err) {
      conn.rollback();
      logger.error(err.message);
      return res.status(500).send({ msg: 'internal server error.' });
  } finally {
      if (conn) conn.release(); // 연결 해제
  }
});

// 카테고리 수정
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const categoryName = req.body.name;

  let conn;
  try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const query = `UPDATE tb_category_memo SET name=? where id=?`;
      const result = await conn.query(query, [categoryName, categoryId]);
      
      logger.info(query);      
      logger.info(`query insert id: ${result.insertId}`);
      
      conn.commit();
      
      return res.status(201).send({ id: categoryId, name: categoryName });
  } catch (err) {
      conn.rollback();
      logger.error(err.message);
      return res.status(500).send({ msg: 'internal server error.' });
  } finally {
      if (conn) conn.release(); // 연결 해제
  }
});

module.exports = router;
