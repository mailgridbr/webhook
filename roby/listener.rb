require 'sinatra'
require 'mail'
TOKEN_CORRETO = "TOKEN_DO_CLIENTE_EXEMPLO_ABC123" # O token individual desse cliente

Mail.defaults { delivery_method :smtp, address: "localhost", port: 25 }

post '/' do
  token = request.env["HTTP_X_WEBHOOK_TOKEN"]
  halt 403, "Acesso negado!" unless token == TOKEN_CORRETO
  data = request.body.read
  File.open('webhook_log.txt', 'a') do |f|
    f.puts "---- #{Time.now} ----\nRAW: #{data}\n------------------------\n"
  end
  Mail.deliver do
    from     'webhook@seudominio.com'
    to       'alvi@alaj.com.br'
    subject  'Webhook recebido!'
    body     "Recebido:\n\n#{data}"
  end
  "OK"
end
