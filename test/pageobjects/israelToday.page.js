
const { default: mongoose } = require('mongoose');
const BasePage = require('../pageobjects/base.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const Isreal= require('../../model/isrealHyom.js');





class isrealHyomPage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//*[@class='single-post-title']/*[@class='titleText']");}
    get subTitleText(){ return $("//*[@class='single-post-subtitle']");}
    get summaryText(){ return $$("//*[@id='text-content']/p[not(div)]");}
    get imageText(){ return $$("//*[contains(@class, 'single-post-media_image__img')][@src]");}
    get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    // get blog(){return $('.blogs-auto-feed-header a');}
    get authorsText(){return $$("//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get articlesButton(){ return $$("//article[contains(@class, 'post post-')]/*[@class='post-media']");}
    get time(){return $$("//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/time")}


   

       


   //----------------------------------------------------------
   //Click
   //----------------------------------------------------------




    //----------------------------------------------------------
    //Actions (get)
    //----------------------------------------------------------

    async getTitle(){
        startStep('print title text');       
        endStep();

        return await BasePage.getText(this.titleText);
    }

    async getSubTitle(){
        startStep('print sub title text');       
        endStep();

        return await BasePage.getText(this.subTitleText);
    }

     async getTime(){
        let temp;
        startStep('print Time text');       
        endStep();
        let status=await this.time.isExisting();
        if (status)
          {console.log('Shilo dateTime '+status)
          temp= await BasePage.getText(this.dateTimeText);} 
       else 
        {console.log('Shilo dateTime '+status)
            temp= '00:00'}
        return temp;
    }

    async getDate(){
        startStep('print Time text');       
        endStep();
        const date = new Date();
        let day =  date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        const datec=day+"/"+month+"/"+year;
       
        return await datec;

    }
    

    async getImg(){

        startStep('print img text');       
        let list= await this.imageText;
        endStep();
        return await BasePage.getAtribute(list[0],'src');
        

    }

    async getSummery(){
        startStep('print summery text');       
        let list= await this.summaryText;
        let summary= "";
        for( let i=0; i< list.length; i++ ){
           summary+= await BasePage.getText(list[i]);
        }
        endStep();
        return summary;
    }

    async connectDB(){
        startStep('connectDB');       
         mongoose.connect('mongodb+srv://yaal-2122:wsmJQ3ggbFxFtHX@cluster0.qnlfmxm.mongodb.net/GQ-Dashboard?')
        //mongoose.connect('mongodb+srv://shilo:a72Y53vXKjhNDAJn@chatnews.uaripa9.mongodb.net/GQ-Dashboard')
        //mongoose.connect('mongodb+srv://tzafriravram:jNK2c1HoPxz8EkAn@tzafrirdata.4gcmmsq.mongodb.net/?retryWrites=true&w=majority&appName=tzafrirData')
        .then(() => console.log('Connected!'));   

       
    endStep(); 
}
//    async updateDB()
//    { this.connectDB();
//        const filter = { count: "11" };
//         const update = { title: "Blabla" };        
//         let doc1=await Ynet.findOne(filter, { timeout: 30000 });
//         console.log("updateDB status - "+doc1);
// //        let doc = await Ynet.findOneAndUpdate(filter, update);
//    }


    //----------------------------------------------------------
    //Actions 
    //----------------------------------------------------------
 

    
    async dataFromTenArticles(arr1,num){
        let list= await this.articlesButton;
        let timeList = await this.time;
        let authorList= await this.authorsText;

        for(let i=0; i< 9; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            let time= await timeList[i].getText();
            let author= await authorList[i].getText(); 
            await BasePage.clickButton(list[i+1]);
            await this.printData(arr1,num,time,author);
            browser.pause(5000)
            num++;
            endStep();
            
        }
    }



    async printData(arr1,num, time, author){
        
        
        startStep("printing the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1= time
        let date1=await this.getDate();
        let img1=await this.getImg();
        console.log("img link: " +await this.getImg());
         if (img1?.length<1)         
         {img1='https://assets-global.website-files.com/63d8fee58e897e0396075286/64ca2a626e35720cb0af8c87_1%20YNET%20%D7%99%D7%93%D7%99%D7%A2%D7%95%D7%AA-04.png'}
        let summery1=await this.getSummery();
        let author1=author;
        console.log("title is: " +await this.getTitle());
        console.log("img link: " +await this.getImg());
        console.log("sub title: " +await this.getSubTitle());
        console.log("time: " + time1)
        console.log("date: " +await this.getDate());
        console.log("summery : " +await this.getSummery());
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
         
        const filter = { count: num.toString() };
        let doc1=await Isreal.findOne(filter);
        console.log("filter - "+doc1);;
        if (doc1== null)
        {
            console.log("filter - "+doc1);
        const ynet= await Isreal.create(arr1[0]);
        console.log("Insert "+num+" verify")
        }
        else{
            console.log("filter - "+doc1);
            const update = {title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}; 
            let doc = await Isreal.findOneAndUpdate(filter, update);
            console.log("Update "+num+" verify")
        }
        
        
        endStep();
        startStep("back to home page");
        await browser.pause(2000);
        await browser.back();
        endStep();
        await browser.pause(7000);

    }




}
module.exports = new isrealHyomPage();
