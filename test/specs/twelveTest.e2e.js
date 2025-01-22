const twelveNewsPage= require('../pageobjects/twelveNews.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB.js')





describe('N12 News', () => {
    let articleArray;
    let num=1;
    it('Connect DB ', async()=>{
    await browser.url('https://www.n12.co.il/')
    await browser.maximizeWindow();
    await mongoDB.connectDB();

    })




    it('N12 10 articles data ', async()=>{
        startStep('click on article '+num);
        await twelveNewsPage.dataFromTenArticlesN12(articleArray,num);
        endStep();
    })

})
