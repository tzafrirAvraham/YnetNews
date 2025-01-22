const sportwalla= require('../pageobjects/wallaSport.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;

const mongoDB= require('../../mongoConnction/mongoDB.js')



describe('sportOne', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
        startStep('connction to mongoDB')
        await mongoDB.connectDB();
        endStep();
        startStep('open one website');
        await browser.url('https://sports.walla.co.il/');
        endStep();
    })




    it('main Article Data', async()=>{

        await sportwalla.dataFromMainArticle(articleArray,num,);
        //num++;
    });

    it('9 Article Data', async()=>{
        num=2

        await sportwalla.dataFromTenArticles(articleArray,num,);
        //num++;
    });
})
