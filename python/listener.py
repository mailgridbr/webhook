from flask import Flask, request, abort
import smtplib
from email.message import EmailMessage
import datetime

app = Flask(__name__)
TOKEN_CORRETO = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123"  # O token individual desse cliente

@app.route("/", methods=["POST"])
def receber_webhook():
    token = request.headers.get('X-Webhook-Token')
    if token != TOKEN_CORRETO:
        abort(403)
    data = request.get_json()
    # Grava log
    with open("webhook_log.txt", "a") as f:
        f.write(f"---- {datetime.datetime.now()} ----\nRAW: {request.data.decode()}\nDECODED: {data}\n------------------------\n")
    # Envia email
    msg = EmailMessage()
    msg.set_content("Recebido:\n\n" + str(data))
    msg['Subject'] = "Webhook recebido!"
    msg['From'] = "webhook@seudominio.com"
    msg['To'] = "alvi@alaj.com.br"
    with smtplib.SMTP("localhost") as s:
        s.send_message(msg)
    return "OK"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
