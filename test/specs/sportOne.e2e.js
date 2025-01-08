const sportOnePage= require('../pageobjects/sportOne.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoose = require("mongoose");
const Ynet= require('../../model/ynet.js');
const mongoDB= require('../../mongoConnction/mongoDB')



describe('sportOne', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
        startStep('connction to mongoDB')
        await mongoDB.connectDB();
        endStep();
        startStep('open one website');
        await browser.url('https://www.one.co.il/');
        endStep();
    })




    it('Main Article Data', async()=>{

        await sportOnePage.dataFromMainArticle(articleArray,num,);
        //num++;
    })

   

    it('three Sub-Main Articles Data ', async()=>{
        num=2
        await sportOnePage.dataFromThreeSubMainArticles(articleArray,num);
        
    })

    it('isreali sport News', async()=>{
        articleArray=[];     
        num=5;   
        await sportOnePage.dataFromThreeIsrealiFootballArticles(articleArray,num);        
        
    })

    it('global sport News', async()=>{
        articleArray=[];
        num= 8;

        await sportOnePage.dataFromThreeGlobalFootballArticles(articleArray,num);
      
    })


   
})
