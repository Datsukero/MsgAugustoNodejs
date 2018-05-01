// importando o framework do express
var express = require('express')
var bodyParser = require('body-parser')

//criando aplicação web com Node
var app = express()

//configurando o body-parser
app.use(bodyParser.urlencoded({extended : true}))

app.use('/', express.static(__dirname + "/public"))


//configurando conexao do MongoDB
var mongodb = require('mongodb')
var mongoClient = mongodb.MongoClient
var db

mongoClient.connect('mongodb://127.0.0.1:27017/twitter', (err, database) => {
	
	if(err) return console.log(err)
	
	db = database
	
	app.listen('3000')
	console.log('Mongo rodando!')
})

//configurando rota para set mensagens
app.post('/set_mensagem', (req, res) => {	
	
	//insert
	db.collection('mensagens').save(req.body, (err, result) => {

		if(err) return console.log(err)					
		
		console.log('gravado!')
	})
	
	//select
	db.collection('mensagens').find().toArray((err, result) => {
		
		if(err) return console.log(err)	
		
		res.send(result)	
	})
		
})

app.get('/get_mensagens', (req, res) => {
	//select
	db.collection('mensagens').find().toArray((err, result) => {
		
		if(err) return console.log(err)	
		
		res.send(result)	
	})
})


//ligando o servidor web
app.listen(8080)

//mostrando mensagem na tela do servidor
console.log("Servidor Rodando")