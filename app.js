const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Discard, User, Elza} = require('./model/Model')
const { Type } = require('./model/Model')
const SECRET = '3lz41fmg-bs1-1nf0'
const verifyJWT = require('./security/SecurityConfig')

app.use(express.json())
app.use(express.urlencoded())

app.post('/login', async (req,res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email }})
    if(!user){
        res.json({auth: false, message: "User not found!"})
        res.status(401).end()
    }else{
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        //const id = `${user.id}`

        if(passwordMatch){
            const token = jwt.sign({userId: user.id}, SECRET, { expiresIn: 300})
            return res.json({auth: true, token})
        }else{
            res.json({auth: false, message: "Wrong Pass!"})
            res.status(401).end()
        }
    }
})

app.post('/logout', (req,res) =>{
    res.end()
})

app.post('/cadastrarUsuario', async (req,res) => {
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

app.post('/descarte', verifyJWT, (req,res) => {
    let user = req.userId
    Discard.create({
        idUser: user,
        idElza: req.body.idElza,
        idType: req.body.idType
    }).then(() =>{
        res.json({message: "cadastrado com sucesso"})
    }).catch(erro =>{
        console.log('Erro: ' + erro)
        es.json({message: "erro"})
    })
})
















app.listen(3001, () => {
    console.log('servidor rodando')
})