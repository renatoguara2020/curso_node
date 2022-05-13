const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/User');
const Address = require('./models/Address');

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users)
      res.render('home', { users: users })
    })
    .catch((err) => console.log(err))
})

app.get('/users/create', function (req, res) {
  res.render('adduser')
})

app.post('/users/create', (req, res)=> {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter
  const email = req.body.email
  const idade = req.body.idade

  if (newsletter === 'on') {
    newsletter = true
  }else{

    newsletter = false;
  }

  User.create({ name, occupation, newsletter, email,idade })

  res.redirect('/')
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('userViews', { user })
    })
    .catch((err) => console.log(err))
})

app.get('/users/delete/:id',async (req, res) => {
const id = req.params.id;

 await User.destroy({where: {id: id}})

 res.redirect('/');

});

app.get('/users/edit/:id', async (req, res) => {
  const id = req.params.id;
  
   const user = await User.findOne({raw:true, where: {id: id}})
  
   res.render('editUser', {user});
  
  });
  

  app.post('/users/update', async(req, res)=> {

const id = req.body.id;
const name = req.body.name;
const occupation = req.body.occupation;
let newsletter = req.body.newsletter;
const email = req.body.email;
const idade = req.body.idade;

if(newsletter === 'on'){

  newsletter = true;
}else{

  newsletter = false;
}

const userData = {
id,
name,
occupation,
email,
idade,

}


await User.update(userData, {where: { id: id }})

res.redirect('/');
  });

// Criar tabelas e rodar o app
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))