require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const db = require("./db");
const Contact = require("./model/person_contact_schema");
const Person = require("./model/person_schema");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors("*"));

db;

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${options.name}" <${options.email}>`,
        to: process.env.EMAIL_USER,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Sent:", mailOptions);
};

const sendEmailToUser = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptionsTwo = {
        to: options.email,
        from: process.env.EMAIL_USER,
        subject: "Thanks for Subscribing!",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1>Thanks for Subscribing!</h1>
      <p>Hello!</p>
      <p>Thank you for subscribing to our updates. I’m excited to have you on board and to keep you informed about the latest trends and insights in frontend development.</p>
      <p>You'll receive updates on:</p>
      <ul>
        <li>The latest frontend tools and techniques</li>
        <li>New blog posts on best practices</li>
        <li>And much more!</li>
      </ul>
      <p>Stay connected with me on social media:</p>
      <p>
  <a href="https://www.linkedin.com/in/bipin-k-807401203/" style="margin-right: 8px;">
    LinkedIn
  </a>
  <a href="https://www.instagram.com/b_pin_007/" style="margin-right: 8px;">
    Instagram 
  </a>
  <a href="https://github.com/bpin007" style="margin-right: 8px;">
     GitHub 
  </a>
  <a href="https://wa.me/7090326602" style="margin-right: 8px;">
     WhatsApp 
     </a>
      </p>
      <p>Looking forward to sharing valuable content with you!</p>
      <p>Best regards,</p>
      <p>Bipin K</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptionsTwo);
    console.log("Sent:", mailOptionsTwo);
};

app.post("/send-email", async (req, res) => {
    try {
        const { email, subject, message, name, html } = req.body;
        await sendEmail({ email, subject, message, name, html });
        const contact = await Contact.create({ name, email, subject, message });
        res.status(200).send({
            message: "Email sent successfully",
            data: {
                _id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message,
            },
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/send-email-user", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        await sendEmailToUser({ email });

        const person = await Person.create({ email });
        console.log("Person created:", person);

        res.status(200).send({
            message: "Email sent successfully and user created",
            success: true,
            data: { _id: person._id, email: person.email },
        });
    } catch (error) {
        console.error("Error:", error);

        if (error.code === 11000) {
            return res.status(400).send({
                message: "Email already exists",
                success: false,
            });
        }

        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});


app.get("/", (req, res) => {
    res.status(200).send({ message: "welcome folks" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
