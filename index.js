const express = require('express')
const mysql = require('mysql2')
const app = express()

// connect database
const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'movies'
    }
}
const knex = require('knex')(options);



//create table
// knex.schema.createTable('cars', (table) => {
//     table.increments('id')
//     table.string('name')
//     table.integer('price')
// }).then(() => console.log('table created'))
//     .catch((err) => console.log(err))
//     .finally(() => {
//         knex.destroy()
//     })



//insert
const data = [
    { name: 'Audi', price: 52642 },
    { name: 'Mercedes', price: 57127 },
    { name: 'Skoda', price: 9000 },
    { name: 'Volvo', price: 29000 },
    { name: 'Bentley', price: 350000 },
    { name: 'Citroen', price: 21000 },
    { name: 'Hummer', price: 41400 },
    { name: 'Volkswagen', price: 21600 },
]
// knex('cars').insert(data).then(() => {
//     console.log('inserted')
// }).catch((err) => console.log(err))
//     .finally(() => {
//         knex.destroy()
//     })



//selecting all
app.get('/', (req, res) => {
    knex('cars').select('*').orderBy('price', 'asc')
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            knex.destroy()
        })
})

//select where
app.get('/where', (req, res) => {
    knex.from('cars').select("name", "price").where('price', '>', '300000')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            knex.destroy()
        })
})


//delete
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
        knex('cars').where('id', id).del()
        .catch((err)=>{
            console.log(err)
        }).finally(()=>{
            console.log('deleted')
        })
})
app.listen(3000, () => console.log('server is runnig'))