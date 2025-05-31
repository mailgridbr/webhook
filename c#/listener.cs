[HttpPost]
public async Task<IActionResult> ReceiveWebhook()
{
    const string TOKEN_CORRETO = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123"; // Token individual do cliente

    if (!Request.Headers.TryGetValue("X-Webhook-Token", out var token) || token != TOKEN_CORRETO)
        return StatusCode(403, "Acesso negado!");

    using var reader = new StreamReader(Request.Body);
    var body = await reader.ReadToEndAsync();

    System.IO.File.AppendAllText("webhook_log.txt", $"---- {DateTime.Now} ----\nRAW: {body}\n------------------------\n");

    // Enviar email com MailKit ou SMTP padrão aqui...

    return Ok("OK");
}
