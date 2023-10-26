const express = require('express')
const app = express()
const {Discard, User, Elza} = require('./model/Model')
const { Type } = require('./model/Model')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/cadastrarUsuario', (req,res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha
    }).then(() =>{
        console.log('cadastrado com sucesso')
    }).catch(erro =>{
        console.log('Erro: ' + erro)
    })
})

app.post('/cadastrarElza', (req,res) => {
    Elza.create({
        lat: req.body.lat,
        long: req.body.long
    }).then(() =>{
        console.log('cadastrado com sucesso')
    }).catch(erro =>{
        console.log('Erro: ' + erro)
    })
})

app.post('/cadastrarTipo', (req,res) => {
    Type.create({
        description: req.body.description  
    }).then(()=>{
        console.log('cadastrado com sucesso')
    }).catch(erro => {
        console.log('Erro: ' + erro)
    })
})

app.post('/descarte', (req,res) => {
    Discard.create({
        idUser: req.body.idUser,
        idElza: req.body.idElza,
        idType: req.body.idType
    }).then(() =>{
        console.log('cadastrado com sucesso')
    }).catch(erro =>{
        console.log('Erro: ' + erro)
    })
})
















app.listen(3001, () => {
    console.log('servidor rodando')
})