const nodemailer = require("nodemailer");
const fs = require('fs');
const EpassmailSender = async (email, title, body) => {
    
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
            
            let info = await transporter.sendMail({
                from: 'Atharva Solutions',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
                attachments: [
                    {
                      filename: 'Epass_work_permit.pdf',
                      content: fs.createReadStream("C:/Users/ROHIT/Desktop/WorkPermit-new/server/utils/Work_Permit_Pass.pdf"),
                      encoding: 'base64', // use 'base64' for binary attachments
                    },
                  ],
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = EpassmailSender;