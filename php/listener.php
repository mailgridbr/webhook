<?php
$token_correto = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123"; // O token individual desse cliente
$headers = getallheaders();
if (!isset($headers['X-Webhook-Token']) || $headers['X-Webhook-Token'] !== $token_correto) {
    http_response_code(403);
    exit("Acesso negado!");
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$log = "---- ".date("Y-m-d H:i:s")." ----\n";
$log .= "INPUT RAW: $input\n";
$log .= "DECODED:\n".print_r($data, true)."\n";
$log .= "------------------------\n";
file_put_contents(__DIR__ . '/webhook_log.txt', $log, FILE_APPEND);

$assunto = "Webhook recebido!";
$mensagem = "Recebido:\n\n" . print_r($data, true);
$headers_mail  = "From: webhook@seudominio.com\r\n";
mail("alvi@alaj.com.br", $assunto, $mensagem, $headers_mail);

http_response_code(200);
echo "OK";
?>
