const { default: mongoose } = require('mongoose');
const BasePage = require('./base.page.js');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
import TechChurch from '../../model/techChurch.js';
const mongoDB= require('../../mongoConnction/mongoDB.js')


class techChurch{

//////////////////////////data from article///////////////////////////////////////////////////

get titleText(){ return $("//div[@class='article-hero__middle']");}
get subTitleText(){ return $("//p[@id='speakable-summary']");}
get date(){return $("//div[@class='wp-block-post-date']");} //date inside the attribure title
get summaryText(){ return $$("//div[contains(@class, 'entry-content wp-block-post-content is-layout-constrained')]/p[@class='wp-block-paragraph']|//h3[@class='wp-block-heading']/strong");}
get imageText(){ return $("");}
//get dateTimeText(){ return $("span[class='single-post-meta-dates']");}
get time(){return $("");}
//get authorsText(){return $$("//article[contains(@class, 'post post-')]/*[@class='post-content ']//*[@class='post-meta']/span")}

/////////////////////////////articles/////////////////////////////////////////////////

get MainArticleButton(){ return $("//*/main//div[@class='hero-package-2__featured']");}
get twoMainArticlesButton(){ return $$(".hero-package-2__upnext .wp-block-techcrunch-card");}
get latestNewsArticlesButton(){ return $$("li[class*='wp-block-post post']");}


} module.exports= new techChurch();