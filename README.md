<h4 align="center">
  🚀 My.Skills
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/GuilhermeFM/my.skills">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/GuilhermeFM/my.skills">
  
  <a href="https://github.com/GuilhermeFM/feedget/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/GuilhermeFM/my.skills">
  </a>

  <a href="https://github.com/Rocketseat/semana-omnistack-10/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/GuilhermeFM/my.skills">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<br>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [HardHat](https://hardhat.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

## 💻 Projeto

My.Skill é um app simples onde você pode criar um lista de skill e salvar em uma blockchain.

## 🛠️ Como configurar

### Criando a conta na Alchemy

- Vá até a <a href="https://www.alchemy.com/">alchemy</a> e crie uma conta (grátis)
- No dashboard adicione um novo app e escolha uma blockchain que deseja conectar. Recomendo a Polygon Mumbai.
- Anote os link de wss e https.

### Configurando o APP Mobile

- Edite o arquivo src/Contracts/MySkill.ts e alteres as seguintes variáveis:

```javascript
this.webSocketProvider = new WebSocketProvider(
  // url do provider Ex.: "wss://polygon-mumbai.g.alchemy.com/v2/sua-chave-do-alchemy-aqui"
);

// Deixe o endereço do contrato como está
this.contractAddress = "0x4398486516c38330BEfD6FB1cC32BD1D7Da80c8D";

// Cuidado para não subir essa informações para o repositório 
this.walletPublicKey = "endereço-publico-da-sua-carteira";

// Cuidado para não subir essa informações para o repositório
this.walletPrivateKey = "chave-privada-da-sua-carteira";
```

- Feito isso basta executar o app com o comando `expo start`

## 🤔 O que ainda sera implementado neste APP ?

- Configuração da carteira pelo APP;
- Escolha da blockchain onde será armazenada as Skill;
- Esqueci de algo ? Crie uma Issue com sua sugestão;

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
