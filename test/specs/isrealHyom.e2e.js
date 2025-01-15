const isrealHyomPage= require('../pageobjects/israelToday.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB')






describe('Isreal Hayom', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
    await browser.url('https://www.israelhayom.co.il/')
    startStep('connction to mongoDB')
    await mongoDB.connectDB();
    endStep();
    })




    it('main article data', async()=>{
        await isrealHyomPage.dataFromMainArticle(articleArray,num);
    });

    it('9articles data isreal hayom', async()=>{
        num=2
        await isrealHyomPage.dataFromTenArticles(articleArray,num);
    })

})
