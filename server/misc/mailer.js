import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kech3443@gmail.com',
    pass: 'nkkybaby4422'
  }
});
export default {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({
        from, subject, to, html
      }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};
