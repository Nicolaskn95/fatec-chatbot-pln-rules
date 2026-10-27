const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  let response = "Desculpe, não entendi sua pergunta.";

  if (message.includes("login")) {
    response = "Você pode redefinir sua senha clicando em 'Esqueci minha senha'.";
  } else if (message.includes("plano")) {
    response = "Temos planos Básico e Premium. Qual você gostaria de saber mais?";
  } else if (message.includes("atendente")) {
    response = "Ok! Encaminhando você para um atendente.";
  }
  // Regra 4: Horário de funcionamento
  else if (
    message.includes("horario") ||
    message.includes("horas") ||
    message.includes("funcionamento") ||
    message.includes("aberto") ||
    message.includes("abre") ||
    message.includes("fecha")
  ) {
    response = "Nosso horário de funcionamento é de segunda a sexta, das 08h às 18h, e aos sábados das 09h às 13h.";
  }
  // Regra 5: Localização / Endereço
  else if (
    message.includes("localizacao") ||
    message.includes("endereco") ||
    message.includes("onde fica") ||
    message.includes("onde estao") ||
    message.includes("unidade") ||
    message.includes("onde voces ficam")
  ) {
    response = "Estamos localizados na Av. Paulista, 1000 - Bela Vista, São Paulo - SP. Venha nos visitar!";
  }
  // Regra 6: Promoções e Cupons
  else if (
    message.includes("promocao") ||
    message.includes("promocoes") ||
    message.includes("desconto") ||
    message.includes("oferta") ||
    message.includes("cupom")
  ) {
    response = "Temos promoções especiais esta semana! Use o cupom PROMO10 para ganhar 10% de desconto em qualquer plano.";
  }
  // Regra 7: Saudações
  else if (
    message.includes("ola") ||
    message.includes("oi") ||
    message.includes("bom dia") ||
    message.includes("boa tarde") ||
    message.includes("boa noite")
  ) {
    response = "Olá! Como posso ajudar você hoje? Você pode tirar dúvidas sobre horários, localização, promoções, planos ou solicitar um atendente.";
  }

  res.json({ reply: response });
});

app.listen(3000, () => console.log("Chatbot rodando na porta 3000"));
