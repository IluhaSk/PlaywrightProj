
const {chromium} = require('playwright');
//var SiebelApp = require('./siebelparser/contentLoader.js');
var JSSPropertySet = require('./siebelparser/jsPropset.js'); 
//var S_App = require('./siebelparser/core');
//import {JSSPropertySet_DecodeFromString as decoder} from './siebelparser/jsPropset.js'

let responceEncodedBody;
let responceBody;
let propertSet = new JSSPropertySet();
//const ps = SiebelApp.S_App.NewPropertySet();

(async () => { 
    const browser = await chromium.launch({headless: false, slowMo:1000, args: ['--ignore-certificate-errors']});
    const page = await browser.newPage();
    await page.goto('https://rsbwstm0si1.trosbank.trus.tsocgen:8443/siebel/app/outletx/rus?SWECmd=Start');
    await page.fill('//input[@name="SWEUserName"]', 'SKL_KM'); 
    await page.fill('//input[@name = "SWEPassword"]', 'SKL_KM');
    await page.click('//parent::div[@class="siebui-login-btn"]/a');
    await page.waitForSelector('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]');
    await page.on('request', request => {
        if (request.postData().indexOf('contact_Search') !== -1) {
            request.response()
                    .then(content => content.text())
                    .then(content => content.slice(content.indexOf('@0*0'), content.length))
                    .then(content => propertSet.GetQueryString(content))
                    .then(content => console.log(content)); 
                    
            console.log(request.postData().split('tns')[3]);
            
        };
    });
    await page.fill('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]', 'SKL689', {delay:500});
    await page.keyboard.press('Enter', {delay:500});
    await page.screenshot({path: `example.png`});
})();