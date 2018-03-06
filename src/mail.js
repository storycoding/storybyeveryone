// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const setup = async function() {
  
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  

  let name = "Person";
  let address = "domestoboto@gmail.com";

  const msg = {
    to: address,
    from: 'hello@storybyeveryone.com',
    subject: 'Welcome to the story by everyone, ' + name + '.',
    text: 'this is the text',
    html: `<div>
    <p>Hello, ${name}</p>
    <p>Thank you for joining the story by everyone.</p>
    <p>As I treasure your time and attention, I will send you <strong>only one</strong> more email to let you know when the full website is launched.</p>
    <p>Looking forward to sharing my stories with you,</p>
    <p>Nuno</p>
    </div>`,
  };
  
  sgMail.send(msg).then((res)=>console.log(res)).catch((err)=>console.error(err));
  
}

setup();