const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const path = require('path');
const Usuario = require('./models/Usuario')
const Projeto = require('./models/Projeto')
const moment = require('moment');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { error } = require('console');



app.use(session({
  secret: 'minhachavesecreta', 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
    .authenticate()
    .then(( )=> {
        console.log("Conectou ao banco com sucesso.");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

function verificarAutenticacao(req, res, next) {
    if (req.session.authenticate == true) {
        // O usuário está autenticado, continue com a próxima rota
      
        return next();
      
    } else {
        // O usuário não está autenticado, redirecionar para a página de login
        console.log(error)
        res.redirect('/login');
       
    }
}

//routes
app.get('/', verificarAutenticacao, (req, res) => {
    Projeto.findAll({     
        order: [['createdAt', 'DESC']] 
    })
      .then(projetos => {
        // Formatar a data para cada usuário
        projetos.forEach(projeto => {
          projeto.dataValues.createdAt = moment(projeto.createdAt).format('DD/MM/YYYY');
            console.log(projeto)
        });

        res.render('index', {
          projetos
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login', { layout: false });
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  
    try {
      const user = await Usuario.findOne({
        where: {
          email: email,
          senha: senha,
        },
        
      });
  
      if (user) {
        // Credenciais válidas, redirecione para a página principal
  
        console.log('Logado com sucesso');
        req.session.authenticate = true; // Marcar a sessão como autenticada
        req.session.user = user; // Armazenar informações do usuário na sessão
        const nome = req.session.user.nome; // Adicione esta linha
        res.redirect('/'); // Redirecionar para a página principal
      } else {
        // Autenticação falhou
        // Renderizar a página de login novamente com uma mensagem de erro
        console.log('Tente novamente');
        res.render('login', { layout: false, error: 'Credenciais inválidas' });
      }
    } catch (error) {
      // Ocorreu um erro durante a consulta ao banco de dados
      console.log('Erro ao autenticar o usuário:', error);
      res.render('login', { layout: false, error: 'Erro ao autenticar o usuário' });
    }
  });



// Rota para logout
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        req.session.authenticate = false; // Define a sessão como não autenticada
        res.redirect('/login'); // Redireciona para a página de login
    });
});



// Jobs routes
app.use('/usuarios', require('./routes/usuarios'));
app.use('/projetos', require('./routes/projetos'));