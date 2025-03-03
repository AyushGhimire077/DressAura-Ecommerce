//Downlaod nodemailer ( npm i nodemailer )
//Import it 

import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_SERVER,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
})

export default transporter;