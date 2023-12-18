const { json } = require("express");
const Form = require("../models/Form");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const epassSender = require("../utils/ePassSender")
exports.getAllForm = async(req,res)=>{
    try {
        let {userId} = req.body;
        console.log("This is the receieved id",req.body);
        if(!userId){
            return res.status(403).json({
                success:false,
                message:"User Id is requried",
            });
        }
        const response = await Form.find({user:userId}).populate('formID').populate('requiredDocs').populate('user').exec();
        console.log("This is backend response",response);
        response.forEach((object)=>{
            object.user.password = null;
        })
        if(!response){
            return res.status(403).json({
                success:false,
                data:[],
                message:"User has not submitted any form",
            });
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully fetched user forms",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching user forms",
        });
    }
}




exports.getAllAdminForm = async(req,res)=>{
    try {
        const {admin}= req.body;
        console.log("this is received admin",admin);
        let response = [];
        console.log("this is admin1",process.env.ADMIN1);
        if(admin===process.env.ADMIN1){
            response = await Form.find({}).populate('formID').populate('requiredDocs').populate('user').exec();
        }else if(admin===process.env.ADMIN2){
            response = await Form.find({approve1:true}).populate('formID').populate('requiredDocs').populate('user').exec();
        }else{
            response = await Form.find({approve2:true}).populate('formID').populate('requiredDocs').populate('user').exec();
        }

        // console.log("This is admin backend response",response);
        response.forEach((object)=>{
            object.user.password = null;
        })

        if(!response){
            return res.status(403).json({
                success:false,
                data:[],
                message:"No forms",
            });
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully fetched all forms",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching all forms",
        });
    }
}

exports.setApproval = async(req,res)=>{
    try {
        let {formId,admin} = req.body;
        if(!formId || !admin){
            return res.status(403).json({
                success:false,
                message:"all fields required",
            });
        }
        
        console.log("this is the recieved admin",admin);
        
        let response = null;
        if(admin===process.env.ADMIN1){
            response = await Form.findOneAndUpdate({formID:formId},{approve1:true},{new:true});
            if(response){
                sendEmail(process.env.ADMIN2)
            }
        }else if(admin===process.env.ADMIN2){
            response = await Form.findOneAndUpdate({formID:formId},{approve2:true},{new:true});
            if(response){
                sendEmail(process.env.ADMIN3)
            }
        }else{
            response = await Form.findOneAndUpdate({formID:formId},{approve3:true},{new:true});
        }
        console.log("This is backend response",response);
        
        if(!response){
            return res.status(403).json({
                success:false,
                data:[],
                message:"cannot update the form approval",
            });
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully approved form",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while approving form",
        });
    }
}

exports.setDisapproval = async(req,res)=>{
    try {
        let {formId,admin,userEmail} = req.body;
        if(!formId || !admin){
            return res.status(403).json({
                success:false,
                message:"all fields required",
            });
        }
        
        console.log("this is the recieved admin",admin);
        
        let response = null;
        if(admin===process.env.ADMIN1 || admin===process.env.ADMIN2 || admin===process.env.ADMIN3){
            response = await Form.findOneAndUpdate({formID:formId},{isDissApproved:true},{new:true});
            if(response){
                sendEmailDisapprove(userEmail);
            }
        }
        console.log("This is backend response",response);
        
        if(!response){
            return res.status(403).json({
                success:false,
                data:[],
                message:"cannot update the form approval",
            });
        }

        res.status(200).json({
            success:true,
            data:response,
            message:"succesfully approved form",
        }); 


    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while approving form",
        });
    }
}

async function sendEmailDisapprove(email) {
	
	try {
		const mailResponse = await mailSender(
			email,
			"Form Dissapproved by Admin",
			`<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Form Dissapproved</title>
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
              
              <div class="message">Form Disapproved</div>
              <div class="body">
                  <h1>the form has been Disapproved please check the Dashboard or contact Admins</h1>
              </div>
              
          </div>
      </body>
      
      </html>`
		);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
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

exports.ePassSender=async(req,res)=> {
	const {email} = req.body;
	try {
		const mailResponse = await epassSender(
			email,
			"Work Permit Pass",
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
              
              <div class="message">Work Epass</div>
              <div class="body">
                  <h1>Kindly find the work permit epass in the attachment below</h1>
              </div>
              
          </div>
      </body>
      
      </html>`
		);
		console.log("Email sent successfully: ", mailResponse.response);
        res.status(200).json({
            message:mailResponse.response,
        })
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}




