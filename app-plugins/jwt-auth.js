'use strict'

const fp = require("fastify-plugin")

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("@fastify/jwt"), {
    secret: fastify.config['JWT_KEY'],
  })

  fastify.decorate("jwtAuth", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.decorate("allowAdmin", async function(request, reply) {
    try {
      await request.jwtVerify();
      if(request.user.role === 0) {
        reply.statusCode = 403;
        reply.send({ error: 'authorization error' });
      }
    } catch (err) {
      reply.send(err)
    }
  })
})