const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: 
    {
        type:String,
        required:true["You must add some question"],
    },
    options:
    {
        type:String,
        required:true["You must give options"]
    },
    correctOption: 
    {
        type:Number,
        required:true["You must give one correct option"]
    }
  });
  const TestSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  


module.exports= mongoose.model("Test",TestSchema)