require('dotenv').config();

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary = require('cloudinary').v2;
//making schema
const fileSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
     },
     imageUrl:{
        type:String,
     },
     tags:{
        type:String,
     },
     email:{
        type:String,
     }
});

//post middleware
fileSchema.post("save" , async function(doc){
    try{
        console.log("doc=",doc);
         
        //transporter
        let transporter = nodemailer.createTransport({
           host:process.env.MAIL_HOST,
           //port: 587, 
           //secure: false,
           auth:{
               user:process.env.MAIL_USER,
               pass:process.env.MAIL_PASS,
           },
         //   debug: true, 
         //   logger: true, 
        });

        //send mail
        let info = await transporter.sendMail({
           from:`karan - by pradip`,
           to:doc.email,
           subject:"New File Uploaded On Cloudinary",
           html:`<h2>Hello jie</h2> <p>File Uploaded view here: <a href = "${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })
        console.log("INFO= ",info);
      }   
    catch(error){
       console.error(error);
    }
})



//create anything about mail before mongoose.model
module.exports = mongoose.model("file",fileSchema);