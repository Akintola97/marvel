const express = require('express');
const app = express();
const hostName = 'localhost'
const port = 5000;
const axios = require('axios');
const crypto = require("crypto")
var cors = require('cors');
var bodyParser = require('body-parser')


require('dotenv').config()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ts = new Date().getTime();
const publicKey = process.env.PUBLIC_KEY 
const privateKey = process.env.PRIVATE_KEY 


const hash = crypto.createHash('md5').update(ts+privateKey+publicKey).digest('hex')


app.listen(port, hostName, ()=>{
    console.log(`The server is running on ${hostName}${port}`)
})



app.post('/', async (req, res)=>{
//    const response =  axios.get(`https://gateway.marvel.com:443/v1/public/characters/1009664?ts=${ts}&apiKey=${publicKey}&hash=${hash}`)
    const {name} = req.body
   const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
  res.send(response.data)
})


app.post('/data', async (req, res)=>{
    const {id} = req.body
    const info = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?id=${id}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    res.send(info.data)
})