
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { from, subject, message } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.eu',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: 'nelsongongbot@gmail.com',
    subject,
    text: `${from} sent: \n${message}`,
  }

  try {
    await transporter.verify();
    const response = await transporter.sendMail(mailOptions);
    return Response.json({ status: 200, statusText: JSON.stringify(response) })
  } catch (error) {
    return Response.json( { status: 500, statusText: JSON.stringify(error) })
  }
}