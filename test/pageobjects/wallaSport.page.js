const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const SportWalla= require('../../model/wallaSport.js');
const mongoDB= require('../../mongoConnction/mongoDB.js')






class wallaSport {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//h1[contains(@class, 'title')]");}
    get subTitleText(){ return $("//h2[contains(@class, 'subtitle')]");}
    get date(){return $("//*[contains(@class, 'date-and-time-p')]")} //date inside the attribure title
    get summaryText(){ return $$("//*[@class='article_speakable']");}
    get imageText(){ return $("(//*[contains(@class,'article-image')]/img)[1] | (//*[contains(@class,'ratio-desktop')]/img)[1]");}
    //get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
    get time(){return $("//*[contains(@class, 'date-and-time-p')]");}
    //get authorsText(){return $$("//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get MainArticlesButton(){ return $("(//article//img)[1]");}
    // get ThreeSubMainArticles(){ return $$("//*[contains(@class, 'one-secondaries-articles')]//a[contains(@class, 'one-article')]")}
    // get ThreeIsrealiArticles(){ return $$("//a[text()= 'כדורגל ישראלי'][@id]/following-sibling::a[contains(@class, 'one-article')][position() <= 3]")}
    get tenArticlePicture() {return $$("(//article//picture)[position() <=10]")}
   


   

       


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
        console.log('strat get sub-titlr data')
        startStep('print sub title text');       
        endStep();

        return await BasePage.getText(this.subTitleText);
    }

     async getTime(){
        console.log('strat get time data')
        let temp;
        startStep('print Time text');       
        endStep();
        let status=await this.time.isExisting();
        if (status)
          {console.log('Shilo dateTime '+status)
          let timeAndDate= await BasePage.getText(this.time);
          let arr= timeAndDate.split(" / ");
          temp= arr[1];
        }
       else 
        {console.log('Shilo dateTime '+status)
            temp= '00:00'}
        return temp;
    }

    async getDate(){
        console.log('strat get date data')
        startStep('print Time text');       
        endStep();
        let timeAndDate= await BasePage.getText(this.time);
        let arr= timeAndDate.split(" / ");
        let temp= arr[0];

        return temp;
    }
    

    async getImg(){
        
        console.log('strat get img data')
        startStep('print img text');     
        
        const isExisting = await this.imageText.isExisting({ timeout: 4000 });

        if(isExisting){
            endStep();
            return await BasePage.getAtribute(this.imageText,'srcset');
        }
        // let list= await this.imageText;
        endStep();
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFjaXl5COCUQ9oaNaIUnPDxnq_tf_hKNamBQ&s'
        

    }

    async getSummery(){
        console.log('strat get summery data')
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

    async dataFromTenArticles(arr1,num){
        let list= await this.tenArticlePicture;
    
        for(let i=1; i< 10; i++){
            startStep(" clicking on article number "+ (num));
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
        // console.log("img link: " +img1);
        //  if (img1?.length<1)         
        //  {img1='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/122012/one_0.png?itok=wlgLfw4m'}
        let summery1=await this.getSummery();
        let author1="sportWalla";
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
         
        console.log('strat push the data')
        startStep('push the data to mongoos database')
        await mongoDB.CreateOrUpdate(num,SportWalla,arr1)
        endStep();
    
        startStep("back to home page");
        await browser.back();
        endStep();
        await browser.pause(4000);

    }




}
module.exports = new wallaSport();