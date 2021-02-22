const nodemailer = require('nodemailer');
const { google } = require('googleapis');


// These id's and secrets should come from .env file.
const CLIENT_ID = 'YOUR CLIENT ID';
const CLEINT_SECRET = 'YOUR CLIENT SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR REFRESH TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'alexandercode1464@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let HTMLcontent = `
      <h1>Prueba de estilos</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab commodi, expedita nesciunt dolore quia nulla vero saepe est. Ipsam, odio.</p>
      <button style="color:blue;text-align:center;" ><a style="text-decoration:none;" href = "https://www.youtube.com/channel/UCs1DHnQij0wp0lP1V96rukg">Click here!</a></button>
    `

    const mailOptions = {
      from: 'SENDED AUTHORIZADED',
      to: 'EMAIL',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: HTMLcontent,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));