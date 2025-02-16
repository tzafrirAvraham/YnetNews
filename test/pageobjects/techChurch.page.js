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
                let dateAndTime
                let time;
                startStep('print Time text');       
                endStep();
                let status=await this.dateTimeText.isExisting();
                if (status){
                  dateAndTime=(await this.dateTimeText).split(" ")
                 // console.log('Shilo dateTime '+dateAndTime)
                  time = await BasePage.getText(this.time[0]);
                  return time;
                }
               else 
                {console.log('Shilo dateTime '+status)
                    temp= '00:00'}
                return temp;
            }


} module.exports= new techChurch();