const puppeteer = require('puppeteer');

async function getTweetScreenshot(tweetLink) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(tweetLink);

    await page.waitForSelector('article[data-testid="tweet"]');

    await page.addStyleTag({
        content: 'div[data-testid="BottomBar"], div[data-testid="sidebarColumn"] { display: none !important; }',
    });

    await page.addStyleTag({
        content: 'header { display: none !important; }',
    });

    await page.addStyleTag({
        content: 'div[aria-label="Home timeline"] > *:first-child { display: none !important; }',
    });

    await page.addStyleTag({
        content: 'div[role="group"] { display: none !important; }',
    });

    await page.waitForTimeout(1000);

    // Get the bounding box of the first div element with data-testid="cellInnerDiv"
    const divHandle = await page.$('div[data-testid="cellInnerDiv"]');
    const boundingBox = await divHandle.boundingBox();

    // Take a screenshot of the first div element
    const screenshot = await divHandle.screenshot({
        type: 'jpeg',
        quality: 90,
        clip: {
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width,
            height: boundingBox.height,
        },
    });

    await browser.close();

    return screenshot;
}

function isTweetUrl(url) {

    const tweetUrlRegex = /^https?:\/\/twitter\.com\/.*\/status\/\d+/;
    return tweetUrlRegex.test(url);
}

export default async function handler(req, res) {
    console.log(req.query)

    const { tweetLink } = req.query;

    if (!tweetLink || !isTweetUrl(tweetLink)) {
        res.status(400).send('Please provide a tweeter link');
        return;
    }

    try {
        // const screenshot = await getTweetScreenshot(tweetLink);
        // Return an image
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.send(screenshot);

        //Return base64 to make it easier on the extension.
        const screenshot = await getTweetScreenshot(tweetLink);
        const dataUrl = 'data:image/jpeg;base64,' + screenshot.toString('base64');
        res.send(dataUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while taking the screenshot');
    }
}
