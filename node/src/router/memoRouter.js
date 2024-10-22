const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	return res.status(200).json({
        data: [
          {
            id: 1,
            writeDate: '2021-09-01',
            content: 'Hello World!1',
          },
          {
            id: 2,
            writeDate: '2021-09-02',
            content: 'Hello World!2',
          },
          {
            id: 3,
            writeDate: '2021-09-03',
            content: 'Hello World!3',
          }
        ]
    })
});

// 메모 등록
router.post('/', async (req, res) => {
  const category = req.body.category;
  console.log('revert test');
  console.log('이래도 안해줄꺼야?')
  console.log('추가3')
  return res.status(200).json({ category }); 
});

module.exports = router;
