const makePage= require('../pageobjects/mako.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB')






describe('Mako', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
    await browser.url('https://www.mako.co.il/')
    startStep('connction to mongoDB')
    await mongoDB.connectDB();
    endStep();
    await browser.setWindowSize(3840, 2160);

    })




    it('main article data', async()=>{
        await makePage.dataFromMainArticle(articleArray,num);
    });

    it('date from five', async()=>{
        num=2
        await makePage.dataFromFiveSubMainArticles(articleArray,num);
    })

    it('date from Two', async()=>{
        num=6
        await makePage.dataFromTwoSubMainArticles(articleArray,num);
    })

    it('date from Three', async()=>{
        num=8
        await makePage.dataFromThreeSubMainArticles(articleArray,num);
    })

})
