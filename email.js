const apiKey = process.env.MAILGUNAPIKEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ domain, apiKey });

class EmailService {
    async sendemail(email, username) {
        console.log(email);
        try {
            const data = {
                from: 'phawazzzy@gmail.com',
                to: email,
                subject: 'Ogbeni Pay me my money',
                text: 'Alaye you owe gbese you dey get rest of mind, hello!!!',
                html: `
                    <pre> 
                    <h1>Mr ${username}</h1>
                    This is nurudeen here, please you have to pay me my money right now.
                    </pre>
                `
            };

            const message = await mailgun.messages().send(data);
            console.log(message)
            if (message) return true;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

}

module.exports = new EmailService();
