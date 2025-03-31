const geektimePage= require('../pageobjects/geektime.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB')
const path= require('path')



describe('geektime', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
        startStep('connction to mongoDB')
        await mongoDB.connectDB();
        endStep();
        startStep('open geektime website');
        await browser.url('https://www.geektime.co.il/');
        await browser.maximizeWindow();

        endStep();
    })




    it('10 Article Data', async()=>{

        await geektimePage.dataFromTenArticles(articleArray,num,);


    })

   
   
})
