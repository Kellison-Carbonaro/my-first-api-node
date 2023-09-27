const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {

	const{name, salary, age, gender, approved} = req.body

	if(!name){
		res.status(422).json({error: 'O nome é obrigatorio'})
	}

	const person = {
		name,
		salary,
		age,
		gender,
		approved
	}

	try {
		await Person.create(person)
		res.status(201).json({ message: 'Pessoa Criada com sucesso' })
	} catch (error) {
		res.status(500).json({error: error})
	}
})

router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({_id: id})
    //validacao nao funcionou, cai direto no catch
    if(!person){
      res.status(422).json({message: "Usuario não foi localizado"})
      return
    }
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const{name, salary, age, gender, approved} = req.body

  const person = {
		name,
		salary,
		age,
		gender,
		approved
	}

  try {
    const updatedPerson = await Person.updateOne({_id: id}, person)
    if(updatedPerson.matchedCount === 0){
      res.status(422).json({message: "Usuario não foi localizado"})
      return
    }
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({_id: id})
    //validacao nao funcionou, cai direto no catch
    if(!person){
      res.status(422).json({message: "Usuario não foi localizado"})
      return
    }
    await person.deleteOne({_id: id})
    res.status(200).json({message: "Usuario excluido"})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router