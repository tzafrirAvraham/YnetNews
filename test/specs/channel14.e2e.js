const channel14Page= require('../pageobjects/channel14.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB')
const path= require('path')



describe('channel14', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
        startStep('connction to mongoDB')
        await mongoDB.connectDB();
        endStep();
        startStep('open now14 website');
        await browser.url('https://www.now14.co.il/');
        endStep();
    })




    it('Main Article Data', async()=>{

        await channel14Page.dataFromMainArticle(articleArray,num,);
        //num++;
    })

   

    it('three Sub-Main Articles Data ', async()=>{
        num=2
        await channel14Page.dataFromFourSubMainArticles(articleArray,num);
        
    })

    it('isreali sport News', async()=>{
        articleArray=[];     
        num=6;   
        await channel14Page.dataFromFiveGeneralArticles(articleArray,num);        
        
    })



   
})
