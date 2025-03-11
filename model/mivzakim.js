const mongoose = require('mongoose');
//const { Schema, model } = mongoose;
const Schema = mongoose.Schema;





const blogSchema = new mongoose.Schema(
  {
   
    title: String,//[{type: String}],
    time: String,//[{type: String}],
    author:String,//[{type: String}],
    num: Number,//[{type: Number}],
    date:String,//[{type: String}],
    image:String,//[{type: String}],
    video:String,//[{type: String}]
}
);


const mivzakim = mongoose.model('mivzakims', blogSchema);
//export default Ynet;
module.exports = mivzakim