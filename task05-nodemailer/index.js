const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "XXX",
    pass: "XXX",
  },
});

transporter
  .sendMail({
    from: "Node.js <verus>",
    to: "XXX",
    subject: "Message fron Node.js",
    text: "This message was sent from Node js server.",
    html: "This <i>message</i> was sent from <strong>Node js</strong> server.",
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
console.log("Finished");
