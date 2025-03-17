const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mivzakim= require('../../model/mivzakim.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')
const helper= require('../../commonHelper/articleData.js')






class mivzakimPage {



//////////////////////////ynet///////////////////////////////////////////////////☺

    get ynetTitleText(){ return $$("(//*[@class= 'titleRow   ']/*[@class='title'])[position() <= 5 ]");}
    get ynetTime(){return $$("(//time[@class= 'DateDisplay'])[position() <= 5 ]");}

//////////////////////////walla///////////////////////////////////////////////////☺

    get wallaTitleText(){ return $$("(//h1[@class='breaking-item-title'])[position() <= 5 ]");}
    get wallaTime(){return $$("(//*[@class= 'red-time'])[position() <= 5 ]");}

//////////////////////////rotter///////////////////////////////////////////////////☺

    get rotterTitleText(){ return $$("(//td[@width='70%'])[position() <= 5]");}
    get rotterTime(){return $$("(//td[@align='center']/font[@class='text13b'])[position() <= 5]");}

//////////////////////////maariv///////////////////////////////////////////////////

    get maarivTitleText(){ return $$("(//*[@class='breaking-news-item-title'])[position() <= 5]");}
    get maarivTime(){return $$("(//*[@class='breaking-news-item-time'])[position() <= 5]");}

//////////////////////////hamal///////////////////////////////////////////////////

    get hamalTitleText(){ return $$("(//*[contains(@class, 'styles_titleContainer')])[position() <= 5]");}
    get hamalTime(){return $$("(//*[contains(@class, 'styles_date_')])[position() <= 5]");}
    


    //----------------------------------------------------------
    //Actions (isExist)
    //----------------------------------------------------------
   
    async getHamalImageSrc(i) {
        const imageElement = await $(`//article[${i}]//*[contains(@class, 'imageContainer')]/img`);
    
        if (await imageElement.isExisting()) {
            return await imageElement.getAttribute('src');
        } else {
            return "NULL";
        }
    }
    //----------------------------------------------------------
    //Actions (Data)
    //----------------------------------------------------------
 

    
  

    async dataFromRotter(arr1,num){
        let listOfTitles= await this.rotterTitleText;
        let listOfTimes= await this.rotterTime;
        const author='Rotter'
    
        for(let i=0; i< 5; i++){
            startStep("rotter mivzak "+ (i+1));
            let title=await helper.getTitle(listOfTitles[i]);
            let time=await helper.getTime(listOfTimes[i]);
            await this.printData(arr1,num,title,time,author,"NULL");
            endStep();
            num++;
            
        }
    }

    async dataFromYnet(arr1,num){
        let listOfTitles= await this.ynetTitleText;
        let listOfTimes= await this.ynetTime;
        const author='Ynet'
    
        for(let i=0; i< 5; i++){
            startStep("ynet mivzak "+ (i+1));
            let title=await helper.getTitle(listOfTitles[i]);
            let time=await helper.getTime(listOfTimes[i]);
            await this.printData(arr1,num,title,time,author,"NULL");
            endStep();
            num++;
            
        }
    }

    async dataFromMaariv(arr1,num){
        let listOfTitles= await this.maarivTitleText;
        let listOfTimes= await this.maarivTime;
        const author='Maariv'
    
        for(let i=0; i< 5; i++){
            startStep("maariv mivzak "+ (i+1));
            let title=await helper.getTitle(listOfTitles[i]);
            let time=await helper.getTime(listOfTimes[i]);
            await this.printData(arr1,num,title,time,author,"NULL");
            endStep();
            num++;
            
        }
    }

    async dataFromWalla(arr1,num){
        let listOfTitles= await this.wallaTitleText;
        let listOfTimes= await this.wallaTime;
        const author='Walla'
    
        for(let i=0; i< 5; i++){
            startStep("walla mivzak "+ (i+1));
            let titleWalla=await helper.getTitle(listOfTitles[i]);
            let title= titleWalla.replace(/\d{2}:\d{2}\s*\/\s*/, "").trim();gi
            let time=await helper.getTime(listOfTimes[i]);
            await this.printData(arr1,num,title,time,author,"NULL");
            endStep();
            num++;
            
        }
    }

    async dataFromHamal(arr1,num){
        let listOfTitles= await this.hamalTitleText;
        let listOfTimes= await this.hamalTime;
        const author='Hamal'
    
        for(let i=0; i< 5; i++){
            startStep("hamal mivzak "+ (i+1));
            let fullText=await helper.getTitle(listOfTitles[i]);
            let title= fullText.replace(/\d{2}:\d{2}\s*\/\s*/, "").trim();
            let timeText=await helper.getTime(listOfTimes[i]);
            let time=timeText.match(/\d{2}:\d{2}/)?.[0] || "00:00";
            let image= await this.getHamalImageSrc(i+1)
            await this.printData(arr1,num,title,time,author,image);
            endStep();
            num++;
            
        }
    }

    


    async printData(arr1,num, title1, time1,author1,image){

        let date= "NULL";
        // let image= "NULL";
        let video= "NULL";
   
        arr1=[{title:title1,time:time1,author:author1,num: num, date: date, image: image, video: video}];
 
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdateByNum(num,mivzakim,arr1)
        endStep();

        await browser.pause(4000);

    }




}
module.exports = new mivzakimPage();