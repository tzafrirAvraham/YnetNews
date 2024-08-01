const isrealHyomPage= require('../pageobjects/israelToday.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoose = require("mongoose");
const Ynet= require('../../model/ynet.js');



describe('DataBase Connection', () => {
    let articleArray;
    let num=1;
    it('Connect DB ', async()=>{
    await browser.url('https://www.israelhayom.co.il/')
    await isrealHyomPage.connectDB();
    })




    it('10 articles data isreal hayom', async()=>{
        startStep('click on article '+num);
        await isrealHyomPage.dataFromTenArticles(articleArray,num);
        endStep();
    })

})
