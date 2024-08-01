const twelveNewsPage= require('../pageobjects/twelveNews.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;




describe('DataBase Connection', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
    await browser.url('https://www.n12.co.il/')
    await browser.maximizeWindow();
    await twelveNewsPage.connectDB();
    })




    it('10 articles data ', async()=>{
        startStep('click on article '+num);
        await twelveNewsPage.dataFromTenArticlesN12(articleArray,num);
        endStep();
    })

})
