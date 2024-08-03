       
const { default: mongoose } = require('mongoose');
const BasePage = require('../pageobjects/base.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const Twelve= require('../../model/twelve.js');





class twelvePage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("section h1");}
    get subTitleText(){ return $("section h2");}
    get summaryText(){ return $$("section[class='article-body'] p");}
    get imageText(){ return $("(//figure/img)[1]");}
    //get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    get date(){return $("//*[@class='display-date']/span[1]");}
    //get authorsText(){return $$("//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get articlesButton(){ return $$("//*[@id='part1']/ul/li/figure");}
    get time(){return $("//*[@class='display-date']/span[2]")}


   

       


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
          temp= await BasePage.getText(this.time);} 
       else 
        {console.log('Shilo dateTime '+status)
            temp= '00:00'}
        return temp;
    }

    // async getDate(){
    //     let temp;
    //     startStep('print date text');       
    //     endStep();
    //     let status=await this.date.isExisting();
    //     if (status)
    //       {console.log('Shilo date '+status)
    //       temp= await BasePage.getText(await this.date);} 
    //    else 
    //     {console.log('Shilo date '+status)
    //         const date = new Date();
    //         let day =  date.getDate();
    //         let month = date.getMonth()+1;
    //         let year = date.getFullYear();
    //         temp=day+"/"+month+"/"+year;
    //    }
    // }

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
        // let list= await this.imageText;
        endStep();
        return await BasePage.getAtribute(this.imageText,'src');
        

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
 

    
    async dataFromTenArticlesN12(arr1,num){
        let list= await this.articlesButton;
       

        for(let i=0; i< 9; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            num++;
            endStep();
            
        }
    }



    async printData(arr1,num){
        
        
        startStep("printing the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1= await this.getTime();
        let date1=await this.getDate();
        let img1=await this.getImg();
        console.log("img link: " +img1);
         if (img1?.length<1)         
         {img1='https://img.mako.co.il/2022/03/13/N12logo.png'}
        let summery1=await this.getSummery();
        let author1="N12";
        console.log("title is: " +title1);
        console.log("img link: " +img1);
        console.log("sub title: " +subTitle1);
        console.log("time: " + time1)
        console.log("date: " +date1);
        console.log("summery : " +summery1);
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
         
        const filter = { count: num.toString() };
        let doc1=await Twelve.findOne(filter);
        // console.log("filter - "+doc1);;
        if (doc1== null)
        {
            console.log("filter - "+doc1);
        const twelve12= await Twelve.create(arr1[0]);
        console.log("Insert "+num+" verify")
        }
        else{
            console.log("filter - "+doc1);
            const update = {title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}; 
            let doc = await Twelve.findOneAndUpdate(filter, update);
            console.log("Update "+num+" verify")
        }
        
        
        endStep();
        startStep("back to home page");
        let web= 'https://www.n12.co.il/'
        let webNow
        do{
            await browser.back();
            await browser.pause(1500);
            webNow=await browser.getUrl()

        }while(webNow !== web)
        
        endStep();

    }




}
module.exports = new twelvePage();