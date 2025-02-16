
const { default: mongoose } = require('mongoose');
const BasePage = require('../pageobjects/base.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const Ynet= require('../../model/ynet.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')





class ynetNewsPage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//*[@class='mainTitle'] |  //*[@class='BlogsPageTitle']");}
    get subTitleText(){ return $("//div[@class='subTitleWrapper'] |  //*[@class='BlogsPageSubTitle']");}
    get summaryText(){ return $$("//*[@class='text_editor_paragraph rtl']");}
    get imageText(){ return $$("[id^='ReduxEditableImage_ArticleImageData']");}
    get dateTimeText(){ return $(".DateDisplay");}
    get blog(){return $('.blogs-auto-feed-header a');}
    get authorsText(){return $("//*[@class='authors ']/span[1]/a")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get mainArticleButton(){ return $("//*[contains(@class, 'TopStory1280Componenta')]");}
    get subArticlesButton(){ return $$("//*[@class='YnetMultiStripComponenta oneRow']/div/div[1]/div[1]/div[1]");}
    get politicalAndSecurityButton(){return $$("(//*[@class='MultiArticleAutoComponenta1280'])[1]/*[@class='slotsContent']/div/div[@class='slotView']/div[1]/div[1]/a");}
    get isrealNewsButton(){ return $$("(//*[@class='MultiArticleAutoComponenta1280'])[2]/*[@class='slotsContent']/div/div[@class='slotView']/div[1]/div[1]/a");}
    get worldNewsButton(){ return $$("(//*[@class='MultiArticleAutoComponenta1280'])[3]/*[@class='slotsContent']/div/div[@class='slotView']/div[1]/div[1]/a");}

    /////////////popup between the pages//////////////////////////
    get popup(){ return $("//*[@id='closeimg']");}


       


   //----------------------------------------------------------
   //Click
   //----------------------------------------------------------


    async clickOnMainArticleButton(){
        return await BasePage.clickButton(this.mainArticleButton);
        
    }

    async closePopup(){
        if(await this.popup.isExisting({ timeout: 2000 })){
            await this.popup.click();
            await browser.pause(3000);
        }

    }


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
        let status=await this.dateTimeText.isExisting();
        //console.log('Shilo dateTime '+status)
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
        // mongoose.connect('mongodb+srv://yaal-2122:wsmJQ3ggbFxFtHX@cluster0.qnlfmxm.mongodb.net/GQ-Dashboard?')
        //mongoose.connect('mongodb+srv://shilo:a72Y53vXKjhNDAJn@chatnews.uaripa9.mongodb.net/GQ-Dashboard')
        mongoose.connect('mongodb+srv://tzafriravram:jNK2c1HoPxz8EkAn@tzafrirdata.4gcmmsq.mongodb.net/?retryWrites=true&w=majority&appName=tzafrirData')
        .then(() => console.log('Connected!'));   

       
    endStep(); 
}



    //----------------------------------------------------------
    //Actions 
    //----------------------------------------------------------
 

    async dataFromMainSubTitleArticle(arr1,num){
        
        let list= await this.subArticlesButton;
        
        for(let i= 0; i< list.length ; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("List "+i+" "+list[i].getText());
            console.log("num "+num);
           
            await BasePage.clickButtonInRightSide(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;
          
            
        }

    }

    async dataFromPoliticalArticle(arr1,num){
        let list= await this.politicalAndSecurityButton;

        for(let i=0; i< 3; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
           
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;
            
            
        }
    }

    async dataFromIsrealNewsArticle(arr1,num){
        
        let list= await this.isrealNewsButton;

        for(let i=0; i<1; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;
            
           
        }
        
    }

    async dataFromWorldNewsArticle(arr1,num){
        
        let list= await this.worldNewsButton;

        for(let i=0; i<1; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            endStep();
            num++;
            
        }
        
    }

    async printData(arr1,num){
        
        
        startStep("printing the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1=await this.getTime();
        let date1=await this.getDate();
        let img1=await this.getImg();
         if (img1.length<1)         
         {img1='https://assets-global.website-files.com/63d8fee58e897e0396075286/64ca2a626e35720cb0af8c87_1%20YNET%20%D7%99%D7%93%D7%99%D7%A2%D7%95%D7%AA-04.png'}
        let summery1=await this.getSummery();
        let author1='ynet_news';
    
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
        endStep();
         
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdate(num,Ynet,arr1)
        endStep();
    
        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(4000);

    }




}
module.exports = new ynetNewsPage();
