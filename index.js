const express = require('express');
const cors = require('cors');
const screenshot = require('./screenshot');
const corsOptions = require('./corsOptions');

const PORT = process.env.PORT || 443;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.post('/digimon-lines/build', screenshot);

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
