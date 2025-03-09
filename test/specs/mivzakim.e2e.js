const mivzakin= require('../pageobjects/mivzakim.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoDB= require('../../mongoConnction/mongoDB.js')



describe('mivzakim', () => {
    let articleArray;
    let num=1;
    before('Connect DB ', async()=>{
        startStep('connction to mongoDB')
        await mongoDB.connectDB();
        endStep();
    })




    it('ynet data', async()=>{
        startStep('open ynet-mivzakim website');
        await browser.url('https://www.ynet.co.il/news/category/184');
        endStep();

        await mivzakin.dataFromYnet(articleArray,num,);
        //num++;
    });

    it('rotter data', async()=>{
        num=6
        startStep('open rotter- mivzakim website');
        await browser.url('https://rotter.net/forum/listforum.php');
        endStep();

        await mivzakin.dataFromRotter(articleArray,num,);
        //num++;
    });

    it('maariv data', async()=>{
        num=11
        startStep('open maariv-mivzakim website');
        await browser.url('https://www.maariv.co.il/breaking-news');
        endStep();

        await mivzakin.dataFromMaariv(articleArray,num,);
        //num++;
    });

    it('hamal data', async()=>{
        num=16
        startStep('open hamal website');
        await browser.url('https://hamal.co.il/main');
        endStep();

        await mivzakin.dataFromHamal(articleArray,num,);
        //num++;
    });

    it('walla data', async()=>{
        num=21
        startStep('open walla- mivzakim website');
        await browser.url('https://news.walla.co.il/breaking');
        endStep();

        await mivzakin.dataFromWalla(articleArray,num,);
        //num++;
    });
})
