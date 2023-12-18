const Pform = require("../models/permitToMove/modal");
const User = require("../models/permitToMove/tester");
const Form = require("../models/Form");
const RequiredDocs = require("../models/RequiredDocs");

module.exports.createPform = async (req, res) => {
  const {formid,filetype,p}=req.body;
  

  const newData = new Pform(p);

  newData.save();
  const tempobj = {
    "Permit_to_Move":newData._id
  }
  console.log("hello world");
  const firstRes = await RequiredDocs.findOne({formID:formid});
  let exisitingDocs = firstRes.submitedDocs;
  let newObject = {...exisitingDocs,"Permit_to_Move":newData._id};
  console.log("this is the new object",newObject);
  const response = await RequiredDocs.findOneAndUpdate({formID:formid},{$set:{submitedDocs:newObject} },{new:true});
  if(!response){
    res.status(404).json({
      sucess:false,
      message:"could not set the object"
    })
  }
  console.log("this is new Data",response);

  res.json(p);
};
module.exports.createUser = async (req, res) => {
  console.log("check");

  let p = req.body;
  console.log(p);

  const newData = new User(p);

  newData.save();

  res.json(p);
};

// Get Data
module.exports.getData = async (req, res) => {
  const {id} = req.body;
  const result = await Pform.findById(id);
  res.send(result);
};
