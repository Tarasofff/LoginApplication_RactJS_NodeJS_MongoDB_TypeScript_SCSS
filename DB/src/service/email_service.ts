const nodemailer = require('nodemailer')
const User_Model = require('../models/user_model')

class EmailService {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async ActivationEmail(email: string, link: string) {
        const user = await User_Model.findOne({email})
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'Activation account on' + process.env.API_URL,
            text: '',
            html:
            `
            <div style="background: aqua; width: 500px; height: 300px; font-family: 'Droid Sans Mono Slashed'; box-shadow: 0 0 10px rgb(16, 153, 134);">
            <h1 style="font-weight: bold;">Hello ${user.email}, please activate your account on our website</h1>
            <a href=${link}>Click me!</a>
            </div>
            `
        }, (err: Error, info: any) => {
            if (err) {
                console.log("SendMail crashed: ", "\n", err)
            }
            console.log("Email sent: " + info.response)
        })
    }
}

module.exports = new EmailService()