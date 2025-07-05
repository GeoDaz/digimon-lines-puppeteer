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

app.post('/digimon-lines/build', (req, res) =>
	screenshot(req, res, process.env.DIGIMON_LINES_URL)
);
app.post('/digimon-lines/build/pokemon', (req, res) =>
	screenshot(req, res, process.env.DIGIMON_LINES_URL, 'pokemon')
);
app.post('/yugioh-lines/build', (req, res) =>
	screenshot(req, res, process.env.YUGIOH_LINES_URL)
);
app.post('/dragon-quest/build', (req, res) =>
	screenshot(req, res, process.env.DRAGON_QUEST_URL)
);

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
