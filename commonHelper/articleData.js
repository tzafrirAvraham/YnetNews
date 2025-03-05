const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;


class articleData{
                 

    async getTitle(titleText){
        startStep('print title text');  
        let title=  await BasePage.getText(titleText);    
        endStep();

        return title;
    }

    async getSubTitle(subTitleText){
        startStep('print sub title text');
        let subTitle= await BasePage.getText(subTitleText);      
        endStep();

        return subTitle
    }

     async getTime(dateTimeText){
        let temp;
        startStep('print Time text');       
        
        let status=await dateTimeText.isExisting();
        //console.log('Shilo dateTime '+status)
        if (status)
          {console.log('Shilo dateTime '+status)
          temp= await BasePage.getText(dateTimeText);} 
       else 
        {console.log('Shilo dateTime '+status)
            temp= '00:00'}
        endStep();
        return temp;
    }

    async getDate(){
        startStep('print Time text');       
        
        const date = new Date();
        let day =  date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        const datec=day+"/"+month+"/"+year;

        endStep();
        return  datec;

    }
    

    async getImg(imageText){

        startStep('print img text');       
        let list= imageText;
        let img= await BasePage.getAtribute(list[0],'src');
        endStep();
        return img
        

    }

    async getSummery(summaryText){
        startStep('print summery text');       
        let list= summaryText;
        let summary= "";
        for( let i=0; i< list.length; i++ ){
           summary+= await BasePage.getText(list[i]);
        }
        endStep();
        return summary;
    }
}



module.exports= new articleData();