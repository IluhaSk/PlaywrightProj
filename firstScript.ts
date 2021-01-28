const {chromium} = require('playwright');
var convert = require('./siebelparser/convert.js'); 
const ass = require('assert');
const fs = require('fs');
var parser = require('fast-xml-parser');
var _ = require('lodash');

let responceRo;
let responceBody;
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

function printing(object) {
    console.log(_.keys(object));
    console.log(_.get(object, 'PropertySet'));
    console.log(object.PropertySet.result.payload.searchResult.PropertySet)
}

function responseChanger(page) {
    page.route('https://rsbwstm0si1.trosbank.trus.tsocgen:8443/**', async route => {
        if (route.request().postData() == null) {route.continue();} 
            else if (route.request().postData().indexOf(endPointName) !== -1) {
                //await page.waitForResponse(response => response.request() == route.request()); 
                //responceRo = await route.request().response();
                await route.fulfill({
                    body: '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><SOAP-ENV:Body><ns:InvokeOutletXEndpoint_Output xmlns:ns="http://siebel.com/CustomUI"><ns:responseString>@0*0*0*1*0*0*1*2*6*result0*15*majorApiVersion1*23*1*4*meta0*11*userMessage0*12*errorMessage0*16*userErrorMessage0*0*0*4*auth0*2*1*7*payload0*10*validation0*14*excludedClient0*0*2*12*searchResult0*26*0*0*0*10*First Name6*ПОМОЕВ18*ATC Client Segment7*Розница2*Id8*1-NJDZ2R8*BIS Code3*R2622*ATC Client Acnt Region0*9*Last Name4*УШАТ18*Search Record Type6*Клиент6*BIS Id6*FART019*Doc Seria4*240812*ATC VIP Flag1*N13*Doc Issued By10*ДИДЛВАОИЧВ11*Branch Name10*Московский3*M/F7*Мужской16*Personal Manager2*  4*Type15*ФИЗИЧЕСКОЕ ЛИЦО17*ATC Salary Client3*Нет10*Birth Date10*01/01/199010*Doc Number6*1425488*Doc Type21*Паспорт гражданина РФ11*Middle Name0*22*ATC Potential VIP Flag1*N9*Siebel Id8*1-NJDZ2R5*Email24*whwyo8lxnz@violinss.fart12*Phone Number12*+7910410506511*Reg Address0*12*Search Level1*226*0*0*0*10*First Name6*ПОМОЕВ18*ATC Client Segment7*Розница2*Id8*1-NJDZ2R8*BIS Code3*R2622*ATC Client Acnt Region0*9*Last Name4*УШАТ18*Search Record Type6*Клиент6*BIS Id6*FART019*Doc Seria4*240812*ATC VIP Flag1*N13*Doc Issued By10*ДИДЛВАОИЧВ11*Branch Name10*Московский3*M/F7*Мужской16*Personal Manager2*  4*Type15*ФИЗИЧЕСКОЕ ЛИЦО17*ATC Salary Client3*Нет10*Birth Date10*01/01/199010*Doc Number6*1425488*Doc Type21*Паспорт гражданина РФ11*Middle Name0*22*ATC Potential VIP Flag1*N9*Siebel Id8*1-NJDZ2R5*Email24*whwyo8lxnz@violinss.fart12*Phone Number12*+7910410506511*Reg Address0*12*Search Level1*2</ns:responseString></ns:InvokeOutletXEndpoint_Output></SOAP-ENV:Body></SOAP-ENV:Envelope>'
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
            await printing(responceBody);
            
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
