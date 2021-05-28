const app = require('./app');

const port = 4000;
require('./db/mongoose');

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
