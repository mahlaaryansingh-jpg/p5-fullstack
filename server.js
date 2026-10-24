
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Set the SendGrid API key from backend/.env
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Newsletter API route
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    // Check that an email was provided
    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email address."
      });
    }

    const cleanEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the email format
    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    // Check that the API key exists
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({
        message: "SendGrid API key is missing."
      });
    }

    // Prepare the email
    const msg = {
      to: cleanEmail,
      from: "mahlaaryansingh@gmail.com",
      subject: "DEV@Deakin Newsletter Subscription",
      text: "Thank you for subscribing to the DEV@Deakin newsletter!",
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You have signed up for the DEV@Deakin newsletter.</p>
      `
    };

    // Send the email using SendGrid
    const [apiResponse] = await sgMail.send(msg);

    // Log SendGrid's actual response for the demonstration
    console.log("SendGrid API status:", apiResponse.statusCode);
    console.log("SendGrid response headers:", apiResponse.headers);

    return res.status(200).json({
      message: "Your subscription email request was accepted."
    });
  } catch (error) {
    console.error(
      "SendGrid error status:",
      error.code || error.response?.statusCode
    );
    console.error(
      "SendGrid error details:",
      error.response?.body || error.message
    );

    return res.status(502).json({
      message: "SendGrid could not accept the email request."
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
