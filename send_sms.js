const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const message = `Mr yomi.
This is Nurudeen, I'm sure you remember me right.
If you don't remember me, I'm the guy that you owe 56k.
Please pay my money to this account.

0241259669, wema
0232673079, GTB
Acct name: Agbaje Nurudeen

Thank you.`

module.exports = function sms() {
    try {
        console.log('sms sending.....')
        client.messages
            .create({
                body: message,
                from: '+17738230851',
                to: '+2348184303931'
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error)
    }


}

