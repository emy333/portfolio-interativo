const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const moment = require('moment');



router.get('/test', (req, res) => {
    res.send('Deu certo.');
})

router.get('/add', (req, res) => {
    res.render('add-usuarios');
})


router.get('/todos-usuarios', (req, res) => {
    Usuario.findAll({     
        where: { ativo: 'true' },
        order: [['createdAt', 'DESC']] 
    })
      .then(usuarios => {
        // Formatar a data para cada usuário
        usuarios.forEach(usuario => {
          usuario.dataValues.createdAt = moment(usuario.createdAt).format('DD/MM/YYYY');
        });
  
        res.render('todos-usuarios', {
          usuarios
        });
    });
});
  

//Adicionar Usuario
router.post('/add', (req, res) => {
    let {nome, email, senha, permissao, ativo='true'} = req.body;

    //Inserir
    Usuario.create({
        nome,
        email,
        senha,
        permissao,
        ativo
    })
    .then(() => {
        // Redirecionar para a página de adicionar usuário com o parâmetro de sucesso
        res.redirect('/usuarios/add?success=true');
      })
      .catch(err => console.log(err));

});

module.exports = router 