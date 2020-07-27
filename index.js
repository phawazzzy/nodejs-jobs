const cron = require("node-cron");
const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport")
const  dotenv = require("dotenv").config()
const sendSms = require("./send_sms")


const app = express();

const account = nodemailer.createTestAccount((err, testaccount) => {
    if(err){
        console.log(err.message)
        process.exit(1);
    }
    console.log(testaccount)
    return testaccount;
});

cron.schedule("00 00 08 * * *", () => {
    sendSms();
})

cron.schedule("0 */25 * * * *", ()=>{
    sendSms();
    console.log("running cron job")
    let transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: process.env.host,
         auth: {
            user: process.env.user,
            pass: process.env.pass
        }

    }))

    const mailOptions = {
        from: process.env.user,
        to: process.env.receiver,
        subject: "hello there!",
        text: "hello test nodejs cron",
        html: `<b>Hello ${process.env.name}, hope you are doing well</b>
        <p> It is more than a year now that you owe me money, i just want to let you know that i have not forgotten that
        money ${process.env.amount} isnt a small amount you know.
        </p>

        <b><p> I assume you have forgotten that is why i wrote this script to remind you everyday </p></b>
        <p> this mail will stop when you pay my money, best regards</p>
        `
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        console.log("info",info.messageId); 
        if (err) {
            console.log(err.message)
        }
    })
    })

app.listen(process.env.PORT || 8000);
