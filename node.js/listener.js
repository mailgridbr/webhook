const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const TOKEN_CORRETO = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123"; // O token individual desse cliente

app.use(express.json());

app.post('/', async (req, res) => {
    const token = req.headers['x-webhook-token'];
    if (token !== TOKEN_CORRETO) {
        return res.status(403).send('Acesso negado!');
    }
    // Grava log
    const log = `---- ${new Date().toISOString()} ----\nRAW: ${JSON.stringify(req.body)}\n------------------------\n`;
    fs.appendFileSync('webhook_log.txt', log);

    // Envia email
    let transporter = nodemailer.createTransport({ host: "localhost", port: 25, secure: false });
    let mailOptions = {
        from: '"Webhook" <webhook@seudominio.com>',
        to: "alvi@alaj.com.br",
        subject: "Webhook recebido!",
        text: "Recebido:\n\n" + JSON.stringify(req.body, null, 2)
    };
    await transporter.sendMail(mailOptions);

    res.send('OK');
});

app.listen(8080, () => console.log('Webhook listener na porta 8080'));
