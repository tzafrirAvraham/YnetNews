import mongoose from 'mongoose';
//const { Schema, model } = mongoose;
const Schema = mongoose.Schema;





const blogSchema = new mongoose.Schema(
  {
   
    title: String,//[{type: String}],
    subTitle: String,//[{type: String}],
    date: String,//[{type: String}],
    time: String,//[{type: String}],
    image: String,//[{type: String}],
    summary: String,//[{type: String}],
    author:String,//[{type: String}],
    count: Number,//[{type: Number}]
}
);


const Twelve = mongoose.model('n12_news', blogSchema);
//export default Ynet;
module.exports = Twelve