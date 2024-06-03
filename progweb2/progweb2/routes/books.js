const express = require('express')
const fs = require('fs')
const router = express.Router()

const getBooks = () => {
  const data = fs.readFileSync('./data/books.json')
  return JSON.parse(data)
}

const saveBooks = (books) => {
  fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2))
}

router.get('/', (req, res) => {
  const books = getBooks()
  res.json(books.books)
})

router.put('/buy', (req, res) => {
  const { titulo } = req.body
  const books = getBooks()

  const book = books.books.find(b => b.titulo === titulo)
  if (book && book.numero_de_exemplares > 0) {
    book.numero_de_exemplares -= 1
    saveBooks(books)
    res.status(200).send('Livro comprado com sucesso.')
  } else {
    res.status(400).send('Livro não disponível.')
  }
})

router.post('/add', (req, res) => {
  const { titulo, autor, genero, numero_de_exemplares, imagem } = req.body
  const books = getBooks()

  const newBook = {
    titulo,
    autor,
    genero,
    numero_de_exemplares,
    imagem
  }

  books.books.push(newBook)
  saveBooks(books)
  res.status(201).send('Livro adicionado com sucesso.')
})

router.delete('/delete', (req, res) => {
  const { titulo } = req.body
  let books = getBooks()

  const initialLength = books.books.length
  books.books = books.books.filter(book => book.titulo !== titulo)

  if (books.books.length < initialLength) {
    saveBooks(books)
    res.status(200).send('Livro deletado com sucesso.')
  } else {
    res.status(404).send('Livro não encontrado.')
  }
})

module.exports = router
