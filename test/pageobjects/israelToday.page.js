
const { default: mongoose } = require('mongoose');
const BasePage = require('../pageobjects/base.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const Isreal= require('../../model/isrealHyom.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')






class isrealHyomPage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//*[@class='single-post-title']/*[@class='titleText']");}
    get subTitleText(){ return $("//*[@class='single-post-subtitle']");}
    get summaryText(){ return $$("//*[@id='text-content']/p");}
    get imageText(){ return $("(//*[contains(@class, 'single-post-media_image__img')][@src])[1]");}
    get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    // get blog(){return $('.blogs-auto-feed-header a');}
    get authorsText(){return $$("(//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span)[position() <= 10]")}
    
    get MainArticleAuthorsText(){return $("(//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span)[1]")}
    get MainArticleTime(){return $("(//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/time)[1]")}
/////////////////////////////articles/////////////////////////////////////////////////

    get articlesButton(){ return $$("(//article[contains(@class, 'post post-')]/*[@class='post-media'])[position() <= 10]");}
    get mainArticle(){ return $("//article[contains(@class, 'posts-octet__post-1')]//h3")}
    get time(){return $$("(//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/time)[position() <= 10]")}


   

       


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
       
        return  datec;

    }
    

    async getImg(){

        startStep('print img text');       
        let list= await this.imageText;
        endStep();
        return await BasePage.getAtribute(list,'src');
        

    }

    async getSummery(){
        // startStep('print summery text');       
        // // let list= await this.summaryText;
        // // let summary= "";
        // // for( let i=0; i< list.length; i++ ){
        // //    summary+= await BasePage.getText(list[i]);
        // // }
        // endStep();
        // // return summary;
        // return await BasePage.getText(this.summaryText);
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
 
    async dataFromMainArticle(arr1,num){

        let time= await (await this.MainArticleTime).getText();;
        let author= await (await this.MainArticleAuthorsText).getText();;
        
        startStep('click on main article');
        await this.mainArticle.click();
        endStep();

        await this.printData(arr1,num, time,author);
    }

    async dataFromTenArticles(arr1,num){
        let list= await this.articlesButton;
        let timeList = await this.time;
        let authorList= await this.authorsText;

        for(let i=1; i<= 9; i++){
            startStep(" clicking on article number "+ (num));
            console.log("num "+num);
            let time= await timeList[i].getText();
            let author= await authorList[i].getText(); 
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num,time,author);
            endStep();
            num++;  
        }
    }



    async printData(arr1,num, time, author){
        
        
        startStep("printing the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1= time
        let date1=await this.getDate();
        let img=await this.getImg();
        let img1;
        console.log("img link: " +await this.getImg());
         if (img?.length<1)         
         {img1='https://www.brandwiz.co.il/userfiles/image/israel_album_open/brand_israelayom_a_01.jpg'}
         else{img1='https://www.israelhayom.co.il/'+img}
        let summery1=await this.getSummery();
        let author1=author;
    
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
        endStep();
         
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdate(num,Isreal,arr1)
        endStep();

        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(3000);

    }




}
module.exports = new isrealHyomPage();
