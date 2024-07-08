'use strict'

const fp = require('fastify-plugin')
const crypto = require('crypto')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/env'), {
    dotenv: true,
    schema: {
      type: 'object',
      required: [ 
        'JWT_KEY',
        'MONGODB_URL',
      ],
      properties: {
        JWT_KEY: {
          type: 'string',
          default: crypto.randomBytes(20).toString('hex'),
        },
        MONGODB_URL: {
          type: 'string',
          default: 'mongodb://localhost:27017',
        },
      }
    }
  })
})
