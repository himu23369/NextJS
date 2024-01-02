import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
 
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        //Doing changes in the User Fields based on the email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate({ _id: userId }, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate({ _id: userId }, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        //Set the mail options
        const mailOptions = {
            from: "himu123@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Email Verification" : "Reset Password",
            //Creating html for sending the user
            html: `<p>Click <a href = ${process.env.DOMAIN}/verify?token=${hashedToken}> here </a> to ${emailType === 'VERIFY' ? "Email Verification" : "Reset Password"}</p>
            or copy and paste link below in your browser.
            <br>${process.env.DOMAIN}/verify?token=${hashedToken}`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        console.log(error.message)
    }
}
