import nodmemailer from 'nodemailer'

 export const Transporter = nodmemailer.createTransport({
    service : "gmail",
    auth:{
        user : process.env.MAIL_USERNAME,
        pass : process.env.MAIL_PASSWORD
    }
})