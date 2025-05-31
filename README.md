# webhook

# MailGrid Webhook – Notificações de Erros de E-mail

Bem-vindo ao repositório oficial do **Webhook MailGrid**!

## Visão Geral

Este projeto tem como objetivo fornecer um sistema de notificações automáticas via webhook para clientes MailGrid. Com o webhook ativado, seu sistema recebe notificações em tempo real sobre **falhas de entrega** de emails enviados pela infraestrutura MailGrid, permitindo ações rápidas, integrações e automação de processos internos.

O repositório traz exemplos práticos de **endpoints para recebimento de notificações** (webhooks listeners) em várias linguagens populares, facilitando a integração no seu ambiente ou aplicação.

---

## Como Funciona

1. **Envio do E-mail**  
   Seu sistema utiliza a MailGrid para envio de emails transacionais ou em massa.

2. **Falha de Entrega**  
   Caso ocorra um erro temporário ou permanente na entrega (bounce, rejeição, bloqueio, etc.), o MailGrid identifica o evento.

3. **Notificação via Webhook**  
   O sistema MailGrid envia automaticamente um payload JSON com detalhes do evento para a URL de webhook configurada por você.  
   Cada notificação contém informações como remetente, destinatário, data/hora, mensagem de erro e identificação do envio.

4. **Autenticação Segura**  
   Por segurança, cada requisição de webhook contém um **token único** no header HTTP `X-Webhook-Token`, que deve ser validado pelo seu endpoint.

---

## Exemplo de Payload Recebido

```json
{
  "msgid": "id_da_mensagem",
  "from": "remetente@seudominio.com",
  "to": "destinatario@cliente.com",
  "error_message": "552 5.2.2 Mailbox full",
  "date": "2024-05-30 13:14:22",
  "status": "erro",
  "user": "usercpanel"
}
```
---

Em caso de dúvidas, você pode soliciar apoio da nossa equipe de suporte, através da URL https://www.mailgrid.com.br/suporte
