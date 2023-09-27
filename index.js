const express = require('express')
const mongoose = require('mongoose')
const app = express()

//seria possivel em vez de usar o express.urlencoded ou express.json usar o app?
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)


app.get('/', (req, res) => {
	res.json({ message: 'oi' })
})

const DB_USER = 'kellisonvinicius'
const DB_PASSWORD = encodeURIComponent('D6VDhsuHHgmxMDlq')
mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluester.mbv9o8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log('banco conectado')
		app.listen(3000)
	})
	.catch((err) => console.log(err))

