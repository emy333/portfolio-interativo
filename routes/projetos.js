const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Projeto = require('../models/Projeto');
const moment = require('moment');

router.get('/test', (req, res) => {
    res.send('Deu certo.');
})

router.get('/add', (req, res) => {
  res.render('add-projetos');
})


router.get('/todos-projetos', (req, res) => {
    Projeto.findAll({     
        order: [['createdAt', 'DESC']] 
    })
      .then(projetos => {
        // Formatar a data para cada usuário
        projetos.forEach(projeto => {
          projeto.dataValues.createdAt = moment(projeto.createdAt).format('DD/MM/YYYY');
        });
  
        res.render('todos-projetos', {
          projetos
        });
    });
});

//Adicionar Projeto
router.post('/add', (req, res) => {
    let {titulo, descricao, link, imagem} = req.body;

    //Inserir
    Projeto.create({
        titulo,
        descricao,
        link,
        imagem
    })
    .then(() => {
        // Redirecionar para a página de adicionar usuário com o parâmetro de sucesso
        res.redirect('/projetos/add?success=true');
      })
      .catch(err => console.log(err));

});

module.exports = router 