curl -X POST http://localhost:8080/webhook.php \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Token: TOKEN_DO_CLIENTE_EXEMPLO_ABC123" \
  -d '{
    "msgid": "id_da_mensagem",
    "from": "remetente@seudominio.com",
    "to": "destinatario@cliente.com",
    "error_message": "552 5.2.2 Mailbox full",
    "date": "2024-05-30 13:14:22",
    "status": "erro",
    "user": "usercpanel"
  }'
