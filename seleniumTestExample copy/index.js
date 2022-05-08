
require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { toUnicode } = require('punycode');
var should = require('chai').should();

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://tzoker.opap.gr/en/');

        //Maximize the window
        await driver.manage().window().maximize();

        //Navigate to Lottery Page 
        await driver.findElement(By.id('onetrust-accept-btn-handler')).click();

        await driver.findElement(By.xpath('//*[@id="tzoker-jackpot-bar"]/div/a')).click();

        //Verify navigation was correct
        let playButton = await driver.findElement(By.xpath('//*[@id="playTzoker"]/div/div[2]/div/div/fieldset/section/div/div[1]/button[1]')).getText();

        console.log("Click the button: "+playButton);

        assert.strictEqual(playButton, "Select Numbers");

        //Verify Pop-Up has opened
        await driver.findElement(By.xpath('//*[@id="playTzoker"]/div/div[2]/div/div/fieldset/section/div/div[1]/button[1]')).click();

        let popUpTitle = await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-slot"]/section/div[1]/div/div')).getText();

        console.log("New Pop-Up opens and the title is: "+popUpTitle);

        assert.strictEqual(popUpTitle, "New Area")

        //Select Numbers
        await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-3"]/div')).click();
        await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-14"]/div')).click();
        await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-25"]/div')).click();
        await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-35"]/div')).click();
        await driver.findElement(By.xpath('//*[@id="ptz-select-numbers-modal-45"]/div')).click();

        //Select Joker Number
        let tzokerNumberId = await driver.findElements(By.id('ptz-select-numbers-modal-18'));

        await tzokerNumberId[1].click();

        //Verify the Price of the ticket

        let price = await driver.findElement(By.id('ptz-select-numbers-modal__number')).getText();

        console.log("Price is: "+price)

        assert.strictEqual(price, "€0,50");
        
        //Click "Add" button to add lottery ticket
        let addButton = await driver.findElement(By.id('ptz-select-numbers-modal-confirm-button')).getText();

        console.log("Button clicked: "+addButton);

        await driver.findElement(By.id('ptz-select-numbers-modal-confirm-button')).click();

        //Check selected numbers on new lottery ticket
        let lotteryTicket = await driver.findElements(By.className('opap-selected-numbers__wrapper-content'));
        
        for(let e of lotteryTicket) {
                 await e.getText();
            }

        let lotteryNumbers = await lotteryTicket[0].getText();

        console.log("Lottery numbers are: "+lotteryNumbers);

        assert.strictEqual(lotteryNumbers, '3\n14\n25\n35\n45\n18');

    }catch (err) {
        
        console.log(err)

    } 
     
    finally {
        await driver.quit();
    }
})();