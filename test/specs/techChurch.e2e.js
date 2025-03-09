const techChurch= require('../pageobjects/techChurch.page')
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoose = require("mongoose");
const mongoDB= require('../../mongoConnction/mongoDB');
const TechChurch = require('../../model/techChurch');

describe('', () => {

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
                await techChurch.dataFromMainArticle();
              //await techChurch.data(articleArray,num,);
              //num++;
              
          }) 
          
          

});