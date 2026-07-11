const nodemailer = require('nodemailer');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = await readBody(req);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.SMTP_USER,
    subject: `Contato pelo site — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    html: `<p><strong>Nome:</strong> ${name}</p>
<p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Mensagem:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
  });

  return res.status(200).json({ ok: true });
};
