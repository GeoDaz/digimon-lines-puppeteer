const puppeteer = require('puppeteer');
require('dotenv').config();

const screenshot = async (req, res) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			executablePath:
				process.env.NODE_ENV === 'production'
					? process.env.PUPPETEER_EXECUTABLE_PATH
					: puppeteer.executablePath(),
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--single-process',
				'--no-zygote',
			],
		});
		try {
			const page = await browser.newPage();
			const xCases = req.body.columns.length;
			const yCases = req.body.size;
			await page.setViewport({
				width: 70 + 45 + 175 * xCases,
				height: 70 + 45 + 175 * yCases,
			});
			// prettier-ignore
			await page.goto(
			process.env.DIGIMON_LINES_URL
			+ '/build/' 
			+ encodeURIComponent(JSON.stringify(req.body))
			+ '/screen'
		);

			await new Promise(resolve => setTimeout(resolve, 500));
			const screenshot = await page.screenshot();
			await browser.close();

			res.setHeader('Content-Type', 'image/png');
			res.send(screenshot);
		} catch (e) {
			res.status(500).json({ message: e.message });
		} finally {
			await browser.close();
		}
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

module.exports = screenshot;
