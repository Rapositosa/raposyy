const express = require('express');
const { createCanvas, loadImage } = require('canvas');

// Cria um novo router
const router = express.Router();

// Rota para o endpoint /perfil
router.get('/', async (req, res) => {
  try {
    // Obtém o URL do avatar do parâmetro da URL
    const avatarUrl = req.query.avatar;

    // Obtém o nome do usuário do parâmetro da URL
    const userName = req.query.name;

    // Carrega a imagem do avatar
    const avatarImage = await loadImage(avatarUrl);

    // Cria um novo canvas com as dimensões desejadas
    const canvasWidth = 1505;
    const canvasHeight = 933;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Define o fundo transparente
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha o avatar em formato circular no canto superior esquerdo
    const avatarSize = 200;
    const avatarX = 20;
    const avatarY = canvasHeight / 2 - avatarSize / 2;
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

    // Define a fonte e o tamanho do texto
    const fontSize = 60;
    ctx.font = `${fontSize}px Arial`;

    // Desenha o nome do usuário ao lado do avatar
    const textX = avatarX + avatarSize + 20;
    const textY = canvasHeight / 2 + fontSize / 2;
    ctx.fillText(userName, textX, textY);

    // Converte o canvas para uma imagem base64
    const imageData = canvas.toDataURL();

    // Retorna a imagem base64 como resposta
    res.send(`<img src="${imageData}" alt="Perfil">`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao processar a imagem.');
  }
});

module.exports = router;
