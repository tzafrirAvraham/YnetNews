const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const { default: mongoose } = require('mongoose');


class mongoDB{
                 
    async connectDB() {
        startStep('connectDB');       
        // await mongoose.connect('mongodb+srv://yaal-2122:wsmJQ3ggbFxFtHX@cluster0.qnlfmxm.mongodb.net/GQ-Dashboard?')
        await mongoose.connect('mongodb+srv://tzafriravram:jNK2c1HoPxz8EkAn@tzafrirdata.4gcmmsq.mongodb.net/?retryWrites=true&w=majority&appName=tzafrirData')
        .then(() => console.log('Connected!'));   
        endStep(); 
    }

    async CreateOrUpdate(num,modelName,arr){
        const filter = { count: num.toString() };
        let doc1=await modelName.findOne(filter);
        //console.log("filter - "+doc1);;
        //create section
        if (doc1== null){
            startStep('go to create section')
            console.log("there is no artice found - "+doc1);
            await modelName.create(arr[0]);
            console.log("Insert "+num+" verify")
            endStep();
        }
        // update section
        else{
            startStep('go to update section')
            //console.log("filter - "+doc1);
            await modelName.findOneAndUpdate(filter, arr[0]);
            console.log("Update "+num+" verify")
            endStep();
        }
        
    }
}



module.exports= new mongoDB();