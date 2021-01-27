

const {chromium} = require('playwright');
//var SiebelApp = require('./siebelparser/contentLoader.js');
var convert = require('./siebelparser/convert.js'); 
const ass = require('assert');
const fs = require('fs');
//var xmlToObj = require('xml2js');
var parser = require('fast-xml-parser');
var _ = require('lodash');
//var S_App = require('./siebelparser/core');
//import {JSSPropertySet_DecodeFromString as decoder} from './siebelparser/jsPropset.js'

let responceEncodedBody;
let responceBody;
var parserOptions = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    //attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    //tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

//let propertSet = new JSSPropertySet();

//const ps = SiebelApp.S_App.NewPropertySet();

(async () => { 
    const browser = await chromium.launch({headless: false, slowMo:1000, args: ['--ignore-certificate-errors']});
    const page = await browser.newPage();
    await page.goto('https://rsbwstm0si1.trosbank.trus.tsocgen:8443/siebel/app/outletx/rus?SWECmd=Start');
    await page.fill('//input[@name="SWEUserName"]', 'SKL_KM'); 
    await page.fill('//input[@name = "SWEPassword"]', 'SKL_KM');
    await page.click('//parent::div[@class="siebui-login-btn"]/a');
    await page.waitForSelector('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]');
    await page.on('request', async request => {
        if (request.postData().indexOf('contact_Search') !== -1) {
            const responceBody = await request.response()
                    .then(content => content.text())
                    .then(content => content.slice(content.indexOf('@0*0'), content.length))
                    .then(content => convert(content))
                    .then(content => parser.parse(content, {attributeNamePrefix:"", ignoreAttributes : false, parseAttributeValue : true}));
                    
                    //.then(content => fs.promises.writeFile('pesponceXML.xml', content)); 
                    
            await console.log(request.postData().split('tns')[3]);
            await printing(responceBody);
            
        };
    });
    
    await page.fill('//parent::label[@title="BIS ID"]/following::input[@class="ant-input FormInput__defaultStyle___2OWp4"]', 'SKL689', {delay:500});
    await page.keyboard.press('Enter', {delay:500});
    await page.screenshot({path: `example.png`});
    
})();

function printing(object) {
    console.log(_.keys(object));
    console.log(_.get(object, 'PropertySet'));
    console.log(object.PropertySet.result.payload.searchResult.PropertySet)

}
