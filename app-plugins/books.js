'use strict'

const crypto = require('crypto')
const fp = require("fastify-plugin")

module.exports = fp(async function(fastify, opts) {
  const books = fastify.mongo.client.db('books-api').collection('books');

  fastify.decorate("books", {
    getAll: () => books.find({}).toArray(),
    getOne: async ({ id }) => { 
      const book = await books.findOne({ id, });
        if(!book) {
            throw new Error('Book not found');
        }
        return book;
    },
    addOne: async ({ title, author, publicationDate, genres }) => {
        const id = crypto.randomUUID();

        const insertResult = await books.insertOne({ id, title, author, publicationDate, genres, });

        return { id, title, author, publicationDate, genres, };
    },
    updateOne: async ({ id, title, author, publicationDate, genres }) => {
      const updateResult = await books.updateOne(
        { id }, { $set: { id, title, author, publicationDate, genres, } }
      );

      return { id, title, author, publicationDate, genres, };
    },
    deleteOne: ({ id }) => books.deleteOne({ id }),
  })
})