const {chromium} = require('playwright');
var convert = require('./siebelparser/convert.js'); 
const ass = require('assert');
const fs = require('fs');
const parser = require('fast-xml-parser');
const _ = require('lodash');
const fetc = require('node-fetch');
const https = require('https');

let responceRo;
let responseBody;
const endPointName = 'contact_Search';
const login = 'SKL_KM';
const password = 'SKL_KM';
var launchOptions = {
    headless: false, 
    slowMo:1000, 
    timeout:0, 
    logger: {
            isEnabled: (name, severity) => name === 'browser',
            log: (name, severity, message, args) => console.log(`${name} ${message}`)},
    args: ['--ignore-certificate-errors']};

const noCertAgent = new https.Agent({rejectUnauthorized: false});

function printing(object) {
    console.log(_.keys(object));
    console.log(_.get(object, 'PropertySet'));
    console.log(object.PropertySet.result.payload.searchResult.PropertySet)
}

function tagReplacer(responseBody, tagName, newValue) {
        //const string = '12*PropertyName5*Value9*';
        //replacer = 'NewValue';
        var NVLen = newValue.length; 
        var separatIndex = responseBody.indexOf('*', responseBody.indexOf(tagName));
        var OVLen = responseBody.substring((responseBody.indexOf(tagName) + tagName.length), responseBody.indexOf('*', responseBody.indexOf(tagName)));
        var oldValue = responseBody.substring(separatIndex + 1, 1 +  parseInt(separatIndex) + parseInt(OVLen) );
        var regexstring;
        if (NVLen < 10) {
            regexstring = '\\d\\*' + oldValue;
        } else {
            regexstring = '\\d\\d\\*' + oldValue;
        }
        var regexp = new RegExp(regexstring);
        var newString = responseBody.replace(regexp, NVLen + '*' + newValue  );
        return newString;
}

function responseChanger(page) {
    page.route('https://rsbwstm0si1.trosbank.trus.tsocgen:8443/**', async route => {
        if (route.request().postData() == null) {route.continue();} 
            else if (route.request().postData().indexOf(endPointName) !== -1) {
                //console.log(route.request().headers());
                await fetc(route.request().url(), { 
                    method: route.request().method(),
                    body: route.request().postData(), 
                    headers: route.request().headers(),
                    agent: noCertAgent })
                .then(responce =>  responseBody = responce.body.read().toString());
                
                //await https.request()
                console.log(responseBody);
                responseBody = await tagReplacer(responseBody, 'First Name', 'Вадим');                
                await route.fulfill({
                            body: responseBody
              });
      } else route.continue(); });
};

function responseGetter(page) {
    page.on('request', async request => {
        if (request.postData().indexOf(endPointName) !== -1) {
            const responceBody = await request.response()
                .then(content => content.text())
                .then(content => content.slice(content.indexOf('@0*0'), content.length))
                .then(content => convert(content))
                .then(content => parser.parse(content, {attributeNamePrefix:"", ignoreAttributes : false, parseAttributeValue : true}));    
            await console.log(request.postData().split('tns')[3]);
            //await printing(responceBody);
            
        };
    });
};

(async () => { 
    const browser = await chromium.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto('https://rsbwstm0si1.trosbank.trus.tsocgen:8443/siebel/app/outletx/rus?SWECmd=Start');
    await page.fill('//input[@name="SWEUserName"]', login); 
    await page.fill('//input[@name = "SWEPassword"]', password);
    await responseChanger(page);
    await page.click('//parent::div[@class="siebui-login-btn"]/a');
    await page.waitForSelector('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]');
    await responseGetter(page);
    await page.fill('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]', 'SKL689', {delay:500});
    await page.keyboard.press('Enter', {delay:500});
    await page.screenshot({path: `example.png`});   
})();
