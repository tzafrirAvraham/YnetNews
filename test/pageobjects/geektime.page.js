const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const geekTime= require('../../model/geektime.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')






class geektimePage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//*[@class='head-title']");}
    get subTitleText(){ return $("//*[@class='head-sub-title']");}
    get date(){return $("//*[@class= 'date sp']")} //date inside the attribure title
    get summaryText(){ return $$("//*[@id= 'content']//p[not(@id)]");}
    get imageText(){ return $("//*[contains(@id, 'attachment')]//img");}
    //get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    get time(){return $("(//p[contains(@class, 'leading-tight')])[2]");}
    get authorsText(){return $("//*[@class= 'author sp']")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get tenArticlesButtons(){ return $$("(//*[contains(@class, 'card_thumb')])[position() <= 10]");}
    
  
   


   

       


   //----------------------------------------------------------
   //Click
   //----------------------------------------------------------

   async closeAd() {
    try {
        // Wait up to 10 seconds for the iframe to appear
        const adIframe = await $('(//iframe[@aria-label="Advertisement"])[7]');
        console.log('search for the ad')
        if (!(await adIframe.waitForExist({ timeout: 30000 }))) {
            console.log('No ad appeared, continuing test...');
            console.log('ad not exist')
            return; // Exit function if no ad
        }

        await browser.switchToFrame(adIframe); // Switch to iframe
        console.log('switch to ad')

        // Wait up to 5 seconds for the dismiss button inside the iframe
        const dismissButton = await $("//*[@id=dismiss-button | //*[@aria-label='סגור את המודעה']");
        if (await dismissButton.waitForDisplayed({ timeout: 5000 })) {
            await dismissButton.click();
            console.log('Ad closed.');
        } else {
            console.log('Dismiss button not found, continuing test...');
        }

        await browser.switchToFrame(null); // Switch back to main content
    } catch (error) {
        console.log('Error handling ad:', error.message); // Log but don't fail test
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
        startStep('print Time text');       
        endStep();
        return '00:00';
    }

    async getDate(){
        // startStep('print Time text');    
        // let date= await BasePage.getText(this.date)   
        // endStep();
       
        // return date;
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
 

    
   

    async dataFromTenArticles(arr1,num){
        let list= await this.tenArticlesButtons;
    
        for(let i=0; i< 10; i++){
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
         {img1='https://upload.wikimedia.org/wikipedia/commons/c/c1/%D7%9C%D7%95%D7%92%D7%95_%D7%90%D7%AA%D7%A8_%D7%92%D7%99%D7%A7%D7%98%D7%99%D7%99%D7%9D_%D7%9E%D7%A2%D7%95%D7%93%D7%9B%D7%9F.jpg'}
        let summery1=await this.getSummery();
        let author1= await this.getAuthor();
  
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
        endStep();
         
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdate(num,geekTime,arr1)
        endStep();
    
        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(4000);

    }




}
module.exports = new geektimePage();