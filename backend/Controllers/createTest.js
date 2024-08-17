const Test=require("../models/questionsSchema")

const createTest=async(req,res)=>{
    const { title, questions } = req.body;
   const test = new Test({ title, questions, createdBy: req.user.id });
  await test.save();
  res.json({ message: 'Test created' });
}
module.exports=createTest;