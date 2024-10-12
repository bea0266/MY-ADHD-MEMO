const path = require('path');

function renderHTML(res, directory, fileName) {
	return res.sendFile(
		path.join(__dirname, `../views${directory}`, fileName + '.html')
	);
}

module.exports = { renderHTML };
