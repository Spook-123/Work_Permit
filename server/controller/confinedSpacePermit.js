const Form = require("../models/confinedSpacePermit");
const RequiredDocs = require("../models/RequiredDocs");
// Create Form
module.exports.createForm = async (req, res) => {
  const { body, formid, filetype } = req.body;
  const form = new Form(body);
  console.log("this is confined space form", form);
  await form.save();
  const tempobj = {
    Confined_space: form._id,
  };
  const firstRes = await RequiredDocs.findOne({formID:formid});
  let exisitingDocs = firstRes.submitedDocs;
  let newObject = {...exisitingDocs,"Confined_space": form._id,};
  const response = await RequiredDocs.findOneAndUpdate(
    { formID: formid },
    { $set: { submitedDocs: newObject } },
    { new: true }
  );
  if (!response) {
    res.status(404).json({
      sucess: false,
      message: "could not set the object",
    });
  }
  res.send(form);
};

// Display form details
module.exports.showDetails = async (req, res) => {
  const { id } = req.body;
  const form = await Form.findById(id);
  console.log("Backend-data");
  console.log(form);
  res.send(form);
};
