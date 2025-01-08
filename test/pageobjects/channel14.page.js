const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const channnel14= require('../../model/channel14.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')






class sportOne {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//h1[contains(@class, 'text-NowBlue')]");}
    get subTitleText(){ return $("//h3[contains(@class, 'text')]");}
    //get date(){return $("//*[@class='article-credit']/time")} //date inside the attribure title
    get summaryText(){ return $$("//div[contains(@class, 'ArticleContent')]/p");}
    get imageText(){ return $("//div[contains(@class,'relative h-full w-full')]/img");}
    //get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    get time(){return $("(//p[contains(@class, 'leading-tight')])[2]");}
    get authorsText(){return $("(//p[contains(@class, 'leading-tight')])[1]")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get MainArticlesButton(){ return $("(//article/a)[1]");}
    get fourSubMainArticles(){ return $$("//a[@target]/article/div/div[1]")}
    get fiveGeneralArticles(){ return $$("//section[2]//img[@data-nimg='fill']")}
  
   


   

       


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
          {
            console.log('Shilo dateTime '+status)
            temp= await BasePage.getText(this.time);
        }
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
       
        return datec;
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

    async getAuthor(){
        startStep('print author text');       
        endStep();

        return await BasePage.getText(this.authorsText);
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

    async dataFromFourSubMainArticles(arr1,num){
        let list= await this.fourSubMainArticles;
    
        for(let i=0; i< 4; i++){
            startStep(" clicking on article number "+ (i+1));
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;
            
        }
    }

    async dataFromFiveGeneralArticles(arr1,num){
        let list= await this.fiveGeneralArticles;
    
        for(let i=0; i< 5; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();   
            num++;
            
        }
    }

  




    async printData(arr1,num){
        
        
        startStep("collect the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1= await this.getTime();
        let date1=await this.getDate();
        let img1=await this.getImg();
        console.log("img link: " +img1);
         if (img1?.length < 1 || img1 == null)        
         {img1='https://gurutv.online/wp-content/uploads/xch14new.jpg.pagespeed.ic.lWe3ApJG9-.jpg'}
        let summery1=await this.getSummery();
        let author1= await this.getAuthor();
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
        await mongoDB.CreateOrUpdate(num,channnel14,arr1)
        endStep();
    
        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(4000);

    }




}
module.exports = new sportOne();