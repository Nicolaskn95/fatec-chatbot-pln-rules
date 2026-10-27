const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Classificador Bayesiano
const classifier = new natural.BayesClassifier();

// Treinamento básico
classifier.addDocument("oi", "saudacao");
classifier.addDocument("olá", "saudacao");
classifier.addDocument("bom dia", "saudacao");
classifier.addDocument("boa tarde", "saudacao");
classifier.addDocument("boa noite", "saudacao");

classifier.addDocument("quero saber meu pedido", "pedido_status");
classifier.addDocument("meu pedido chegou", "pedido_status");
classifier.addDocument("acompanhar pedido", "pedido_status");
classifier.addDocument("onde está o pacote", "pedido_status");
classifier.addDocument("rastrear entrega", "pedido_status");

classifier.addDocument("obrigado", "agradecimento");
classifier.addDocument("valeu", "agradecimento");
classifier.addDocument("muito obrigado", "agradecimento");
classifier.addDocument("agradeço", "agradecimento");

// Novas intenções adicionadas
// 1. Preço / Valores
classifier.addDocument("qual o preço", "preco");
classifier.addDocument("quanto custa", "preco");
classifier.addDocument("qual o valor do produto", "preco");
classifier.addDocument("valores e planos", "preco");
classifier.addDocument("tabela de preços", "preco");
classifier.addDocument("quanto tenho que pagar", "preco");

// 2. Ajuda / Suporte
classifier.addDocument("preciso de ajuda", "ajuda");
classifier.addDocument("pode me ajudar", "ajuda");
classifier.addDocument("estou com dúvidas", "ajuda");
classifier.addDocument("não sei o que fazer socorro", "ajuda");
classifier.addDocument("como funciona o suporte", "ajuda");
classifier.addDocument("preciso de suporte", "ajuda");

// 3. Cancelamento
classifier.addDocument("quero cancelar", "cancelamento");
classifier.addDocument("cancelar minha assinatura", "cancelamento");
classifier.addDocument("como cancelo meu plano", "cancelamento");
classifier.addDocument("desistir da compra", "cancelamento");
classifier.addDocument("quero encerrar o serviço", "cancelamento");
classifier.addDocument("solicitar cancelamento", "cancelamento");

// Re-treinamento do modelo
classifier.train();

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const intent = classifier.classify(message.toLowerCase());
  let reply = "Desculpe, não entendi.";

  switch (intent) {
    case "saudacao":
      reply = "Olá! Em que posso te ajudar hoje?";
      break;
    case "pedido_status":
      reply = "Para consultar seu pedido, informe o número ou e-mail da compra.";
      break;
    case "agradecimento":
      reply = "De nada! Estou sempre à disposição.";
      break;
    case "preco":
      reply = "Nossos planos começam a partir de R$ 29,90/mês. Gostaria de ver a tabela detalhada de preços?";
      break;
    case "ajuda":
      reply = "Com certeza! Estou aqui para ajudar. Você pode perguntar sobre pedidos, preços, cancelamento ou suporte geral.";
      break;
    case "cancelamento":
      reply = "Sentimos muito que queira cancelar. Você pode solicitar o cancelamento diretamente no menu 'Minha Conta' ou com nosso suporte.";
      break;
  }

  res.json({ reply, intent });
});

app.listen(3000, () => console.log("Chatbot PLN rodando na porta 3000"));
