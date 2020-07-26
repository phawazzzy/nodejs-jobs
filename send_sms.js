const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

const message = `Hello ${process.env.name}, hope you are doing well.
 It is more than a year now that you owe me money, i just want to let you know that i have not forgotten that
money ${process.env.amount} isnt a small amount you know.
 I assume you have forgotten that is why i wrote this script to remind you everyday
this message will stop when you pay my money, best regards`

module.exports = function sms() {
    try {
        client.messages
        .create({
           body: message,
           from: '+14144090801',
           to: '+2349028110588'
         })
        .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error)
    }
   
  
}

