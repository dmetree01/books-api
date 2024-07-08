'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/books', async function () {
    return fastify.books.getAll();
  });

  fastify.get('/books/:id', async function (request) {
    return fastify.books.getOne(request.params);
  });

  fastify.post('/books', {
    onRequest: [fastify.allowAdmin]
  }, async function (request) {
    const { id, title, author, publicationDate, genres } = await fastify.books.addOne(request.body);

    return { id, title, author, publicationDate, genres, };
  });

  fastify.put('/books/:id', {
    onRequest: [fastify.allowAdmin]
  }, async function (request) {
    const { id, title, author, publicationDate, genres } = await fastify.books.updateOne({ 
      ...request.params, 
      ...request.body,
    });

    return { id, title, author, publicationDate, genres, };
  });

  fastify.delete('/books/:id', {
    onRequest: [fastify.allowAdmin]
  }, async function (request) {
    return fastify.books.deleteOne(request.params);
  });
}
