const GeneralPermit = require('../models/GeneralPermit');
const Form = require("../models/Form");
const RequiredDocs = require("../models/RequiredDocs");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

exports.CreateForm = async(req,res)=>{
    try {
        let {formData,userId} = req.body;

        if(!formData){
            return res.status(403).json({
                success:false,
                message:"all field required",
            });
        }
    
        const response = await GeneralPermit.create({user:userId,formData:formData});
        const reqDocRes = await RequiredDocs.create({formID:response._id});
        const formRes = await Form.create({user:userId,formID:response._id,requiredDocs:reqDocRes._id});
        if(!response || !reqDocRes || !formRes){
            return res.status(403).json({
                success:false,
                message:"Could not store general permit",
            });
        }
        sendEmail(process.env.ADMIN1);
        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully created general permit",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while storing general permit",
        });
    }
}

exports.getGeneralForm = async(req,res)=>{
    try {
        let {formId} = req.body;
        if(!formId){
            return res.status(403).json({
                success:false,
                message:"all field required",
            });
        }
    
        const response = await GeneralPermit.findById(formId);
        
        if(!response){
            return res.status(403).json({
                success:false,
                message:"Could not find the general permit",
            });
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully fetched general permit",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching general permit",
        });
    }
}





async function sendEmail(email) {
	
	try {
		const mailResponse = await mailSender(
			email,
			"Approved by Admin",
			`<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Form Approval</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              
              <div class="message">Form Approval</div>
              <div class="body">
                  <h1>the form has been approved please check the dashboard</h1>
              </div>
              
          </div>
      </body>
      
      </html>`
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}