const puppeteer = require("puppeteer");
const data = require("./config.json");

let NumberOfPost = process.argv[2];

async function main() {
    let browser = await puppeteer.launch({
        headless: false,         //chrome will be visible
        defaultViewport: false,
        args: ['--start-maximized']   //to open chrome in full window
    });
    
    const tab = await browser.newPage();

    //loging in intagram
    
    await tab.goto('https://www.instagram.com/', { waitUntil: "networkidle2" });
    await tab.type("input[name='username']", data.user, { delay: 100 });
    await tab.type("input[name='password']", data.pwd, { delay: 100 });

    // clicking submit button on login page

    await tab.waitForSelector("button[type='submit']", { visible: true });
    await tab.click("button[type='submit']");

    //waiting for page to load after login

    await tab.waitForSelector(".aOOlW.HoLwm", { visible: true });
    await tab.click(".aOOlW.HoLwm");

    //typing desired page and then clicking on it

    await tab.type("input[placeholder='Search']", "pepcoding");
    await tab.waitForSelector(".-qQT3", { visible: true });
    let options = await tab.$$(".-qQT3");
    await options[0].click();

    //clicking on their post

    await tab.waitForNavigation({ waitUntil: "networkidle2" }),
        await tab.click("._9AhH0");

    //liking desired number of post

    for (let i = 0; i < NumberOfPost; i++) {
        await tab.waitForSelector(".fr66n button");
        await tab.click(".fr66n button");
        await Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle2" }),
            tab.click("._65Bje.coreSpriteRightPaginationArrow"),
        ]);
    }

    await tab.click(".Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG");

    //loging out from instagram

    await tab.waitForSelector(".Fifk5 ._2dbep.qNELH", {visible: true});
    await tab.click(".Fifk5 ._2dbep.qNELH");
    let opt = await tab.$$(".-qQT3");
    await opt[4].click();


    //closing browser 

    await browser.close();

}

main();