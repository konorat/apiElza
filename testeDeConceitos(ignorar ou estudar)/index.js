(async () => {

    const database = require('./db/db')
    const { Discard, User} = require('./model/Model')
    // const { Product, User, Address} = require('./index1')
    // const User = require('./db/User')
    // const Discard = require('./db/Discard')
    // await User.sync({force: true})
    // await Discard.sync({force: true})
    // //await database.sequelize.sync({force: true})

    // const novoUser = await User.create({
    //     name: "teste2",
    //     email: "aa@aa.com",
    //     senha: "aaa"
    // })

    // const novoDescarte = await Discard.create({
    //     tipo: 2,
    //     idUser: novoUser.id
    // })


    // const novoProduto = await Product.create({
    //     title: 'Chair',
    //     user: {
    //       firstName: 'Mick',
    //       lastName: 'Broadstone',
    //       addresses: [{
    //         type: 'home',
    //         line1: '100 Main St.',
    //         city: 'Austin',
    //         state: 'TX',
    //         zip: '78704'
    //       }]
    //     }
    //   }, {
    //     include: [{
    //       association: Product.User,
    //       include: [ User.Addresses ]
    //     }]
    //   });





    const discard = await Discard.findByPk(1)
    const user = await User.findByPk(discard.id)
    console.log(user)



})()