const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const makoModel= require('../../model/mako.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')






class mako {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//section[@class='article-header i-pic']/header/h1");}
    get subTitleText(){ return $("//section[@class='article-header i-pic']/header/h2");}
    //get date(){return $("//*[@class='article-credit']/time")} //date inside the attribure title
    get summaryText(){ return $$("//section[@class='article-body']/p");}
    get imageText(){ return $("//section[@class='article-header W-pic wide']/figure/img");}
    get dateTimeText(){ return $("//span[@class='display-date']/[span[1]");}
    get time(){return $("(//span[@class='display-date']/span)[1]");}
    //get authorsText(){return $("(//p[contains(@class, 'leading-tight')])[1]")}
    
/////////////////////////////articles/////////////////////////////////////////////////

get MainArticlesButton(){ return $("//section[@class='MainItem_root__8FVmo']/article/a/div[2]");}
get FiveSubMainArticles(){ return $$("//section[@class='FiveItemsLayout_root__A6Nh5 FiveItemsLayout_grid__vmTsN']/article/a")}
get TwoSubMainArticles(){ return $$("//div[@class='Desktop_root__Ear5O']/div/article")}
get ThreeSubMainArticles(){ return $$("[//section[@class='ComponentLayout_root__dDoG2']/div/article/a/figure][position() <= 2]")}





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
        startStep('print time text');       
        endStep();

        return await BasePage.getText(this.time);
    //     let temp;
    //     startStep('print Time text');       
    //     endStep();
    //     let status=await this.time.isExisting();
    //     if (status)
    //       {console.log('Shilo dateTime '+status)
    //       let timeAndDate= await BasePage.getText(this.time);
    //       let arr= timeAndDate.split(" ");
    //       temp= arr[1];
    //     }
    //    else 
    //     {console.log('Shilo dateTime '+status)
    //         temp= '00:00'}
    //     return temp;
    }

    async getDate(){
        startStep('print date text');       
        endStep();
        // let timeAndDate= await BasePage.getText(this.time);
        // let arr= timeAndDate.split(" ");
        // let temp= arr[0];
        //return temp;

        return await BasePage.getText(this.dateTimeText);
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



    //----------------------------------------------------------
    //Actions (Data)
    //----------------------------------------------------------
 

    
    async dataFromMainArticle(arr1,num){
        
        startStep('click on main article');
        await this.MainArticlesButton.click();
        endStep();

        await this.printData(arr1,num);
    }

    async dataFromFiveSubMainArticles(arr1,num){
        let list= await this.FiveSubMainArticles;
    
        for(let i=0; i< 4; i++){
            startStep(" clicking on article number "+ (i+1));
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;   
        }
    }

    async dataFromTwoSubMainArticles(arr1,num){
        let list= await this.TwoSubMainArticles;
    
        for(let i=0; i< 2; i++){
            startStep(" clicking on article number "+ (i+1));
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;   
        }
    }

    async dataFromThreeSubMainArticles(arr1,num){
        let list= await this.ThreeSubMainArticles;
    
        for(let i=0; i< 3; i++){
            startStep(" clicking on article number "+ (i+1));
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;   
        }
    }

    // async dataFromThreeIsrealiFootballArticles(arr1,num){
    //     let list= await this.ThreeIsrealiArticles;
    
    //     for(let i=0; i< 3; i++){
    //         startStep(" clicking on article number "+ (i+1));
    //         console.log("num "+num);
            
    //         await BasePage.clickButton(list[i]);
    //         await this.printData(arr1,num);
    //         endStep();   
    //         num++;
            
    //     }
    // }

    // async dataFromThreeGlobalFootballArticles(arr1,num){
    //     let list= await this.ThreeGlobalArticles;
    
    //     for(let i=0; i< 3; i++){
    //         startStep(" clicking on article number "+ (i+1));
    //         console.log("num "+num);
            
    //         await BasePage.clickButton(list[i]);
    //         await this.printData(arr1,num);
    //         endStep();
    //         num++;
               
    //     }
    // }




    async printData(arr1,num){
        
        
        startStep("collect the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1= await this.getTime();
        let date1=await this.getDate();
        let img1=await this.getImg();
        console.log("img link: " +img1);
         if (img1?.length<1)         
         {img1='https://img.mako.co.il/2024/07/21/makologonew2024_autoOrient_i.jpg'}
        let summery1=await this.getSummery();
        let author1="Mako";
        // console.log("title is: " +title1);
        // console.log("img link: " +img1);
        // console.log("sub title: " +subTitle1);
        // console.log("time: " + time1)
        // console.log("date: " +date1);
        // console.log("summery : " +summery1);
        // console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        // console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
        endStep();
         
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdate(num,makoModel,arr1)
        endStep();
    
        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(4000);

    }




}
module.exports = new mako();

