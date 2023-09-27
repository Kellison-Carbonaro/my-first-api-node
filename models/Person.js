const mongoose = require('mongoose')
//eu nao consigo usar um require global e so usar nao, sei la tipo mixins

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    age: Number,
    gender: String,
    approved: Boolean,
})

module.exports = Person