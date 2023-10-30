const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Discard, User, Elza, Type, BlockTokenList} = require('./model/Model')
const SECRET = '3lz41fmg-bs1-1nf0'
const authenticateJWT = require('./security/SecurityConfig')

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

        if(passwordMatch){
            const token = `Bearer ${jwt.sign({userId: user.id, role: user.role}, SECRET, { expiresIn: 300})}`
            return res.json({auth: true, token})
        }else{
            res.json({auth: false, message: "Wrong Pass!"})
            res.status(401).end()
        }
    }
})

app.post('/logout', authenticateJWT, (req,res) =>{
    BlockTokenList.create({
        token: req.headers.authorization
    }).then(() => {
        res.json({loggout: true, message: "Deslogado com sucesso!"})
        res.end()
    }).catch( erro => console.log(erro))
    
})

app.post('/cadastrarUsuario', (req,res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha
    }).then(() =>{
        console.log('cadastrado com sucesso')
    }).catch( erro => console.log(erro) )
})

app.post('/cadastrarElza', authenticateJWT, (req,res) => {
    if(req.role === 'admin'){
        Elza.create({
            lat: req.body.lat,
            long: req.body.long
        }).then(() =>{
            console.log('cadastrado com sucesso')
        }).catch(erro =>{
            console.log('Erro: ' + erro)
        })
    }else {
        res.json({authorization: false, message: "Não autorizado!"})
        res.status(401)
    }
})

app.post('/cadastrarTipo', authenticateJWT, (req,res) => {
    if(req.role === 'admin'){
        Type.create({
            description: req.body.description  
        }).then(()=>{
            res.json({authorization: true, message: "Tipo cadastrado!"})
        }).catch(erro => {
            console.log('Erro: ' + erro)
        })
    }else{
        res.json({authorization: false, message: "Não autorizado!"})
        res.status(401)
    }
})

app.post('/descarte', authenticateJWT, (req,res) => {
    Discard.create({
        idUser: req.userId,
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