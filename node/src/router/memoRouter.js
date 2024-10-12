const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	return res.json({
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

module.exports = router;
