// Token individual desse cliente
private static final String TOKEN_CORRETO = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123";

@PostMapping("/")
public ResponseEntity<String> receiveWebhook(
    @RequestHeader(value="X-Webhook-Token", required=false) String token,
    @RequestBody String payload) {
    if (!TOKEN_CORRETO.equals(token)) {
        return new ResponseEntity<>("Acesso negado!", HttpStatus.FORBIDDEN);
    }
    // Gravar log (simples)
    try (FileWriter fw = new FileWriter("webhook_log.txt", true)) {
        fw.write("---- " + LocalDateTime.now() + " ----\nRAW: " + payload + "\n------------------------\n");
    } catch (Exception e) { /* trate o erro */ }
    // Enviar email com JavaMail/Spring Email (exemplo não incluído por brevidade)
    return ResponseEntity.ok("OK");
}
