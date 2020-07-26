const cron = require("node-cron");
const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport")

const app = express();

const account = nodemailer.createTestAccount((err, testaccount) => {
    if(err){
        console.log(err.message)
        process.exit(1);
    }
    console.log(testaccount)
    return testaccount;
});

let task = cron.schedule("* * * * *", ()=>{
let startTime = new Date().getSeconds()

        console.log("running cron job")
    let transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
         auth: {
            user: "pdnlplr2oe342g4f@ethereal.email",
            pass: "Zj6vhqnkXaKWkefCJj"
        }

    }))

    const mailOptions = {
        from: "pdnlplr2oe342g4f@ethereal.email",
        to: "phawazzzy@gmail.com",
        subject: "hello there!",
        text: "hello test nodejs cron",
        html: `<b> A message from node js cron bear with us</b>`
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        console.log("info",info.messageId);
        if (err) {
            console.log(err.message)
        }
    })
     let stopTime = new Date().getSeconds()
    console.log(stopTime - startTime);
    })
    task.start();

app.listen(8000);
