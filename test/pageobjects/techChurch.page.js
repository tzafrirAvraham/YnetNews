const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
import TechChurch from '../../model/techChurch.js';
const mongoDB= require('../../mongoConnction/mongoDB.js')


class techChurch{

//////////////////////////data from article///////////////////////////////////////////////////

get titleText(){ return $("//div[@class='article-hero__middle']");}
get subTitleText(){ return $("//p[@id='speakable-summary']");}
get summaryText(){ return $$("//div[contains(@class, 'entry-content')]/p|//h3/strong|//h1[contains(@id, 'h-lg-s')]");}
get imageText(){ return $("//figure[@class='wp-block-post-featured-image']/img");}
get dateTimeText(){ return $("//div[@class='wp-block-post-date']/time");}
//get time(){return $("");}
get authorsText(){return $$("//div[@class='wp-block-tc23-author-card-name']/a")}

/////////////////////////////articles/////////////////////////////////////////////////

get MainArticleButton(){ return $("//*/main//div[@class='hero-package-2__featured']");}
get twoMainArticlesButton(){ return $$(".hero-package-2__upnext .wp-block-techcrunch-card");}
get restOfArticlesButton(){ return $$("//div[contains(@class, 'wp-block-group heading')]/following-sibling::div/ul/li");}


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
               let status=await this.dateTimeText.isExisting();
               if (status)
                 {console.log('Shilo dateTime '+status)
                 let timeAndDate= await BasePage.getText(this.dateTimeText);
                 let arr= timeAndDate.split("·");
                 temp= arr[0];
               }
              else 
               {console.log('Shilo dateTime '+status)
                   temp= '00:00'}
               return temp;
           }

           async getDate(){
                   startStep('print Time text');       
                   endStep();
                   let timeAndDate= await BasePage.getText(this.dateTimeText);
                   let arr= timeAndDate.split("·");
                   let temp= arr[1];
                   return temp;
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
                    await this.MainArticleButton.click();
                    endStep();
                    await this.printData(arr1,num);
                }    
                
                
            async dataFromTwoMainArticles(arr1,num){
                    let list= await this.twoMainArticlesButton;
                
                    for(let i=0; i< 2; i++){
                        startStep(" clicking on article number "+ (i+1));
                        await BasePage.clickButton(list[i]);
                        await this.printData(arr1,num);
                        endStep();
                        num++;
                        
                    }
                }

                async dataFromRestOfArticles(arr1,num){
                    let list= await this.restOfArticlesButton;
                    for(let i=0; i< 10; i++){
                        startStep(" clicking on article number "+ (i+1));
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
                     if (img1?.length<1)         
                     {img1='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/122012/one_0.png?itok=wlgLfw4m'}
                    let summery1=await this.getSummery();
                    let author1="TechChurch";
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
                    await mongoDB.CreateOrUpdate(num,TechChurch,arr1)
                    endStep();
                
                    startStep("back to home page");
                    await browser.back();
                    endStep();
                    await browser.pause(4000);
            
                }
            


} module.exports = new techChurch();