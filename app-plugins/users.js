'use strict'

const crypto = require('crypto')
const fp = require("fastify-plugin")

module.exports = fp(async function(fastify, opts) {
  const users = fastify.mongo.client.db('books-api').collection('users');

  fastify.decorate("users", {
    registerOne: async ({ username, password, email, }) => {
      const id = crypto.randomUUID();
      const existedUsersCount = await users.countDocuments({ username, password });
      if(existedUsersCount > 0) {
        throw new Error('user already exists');
      }
      const role = await users.countDocuments() === 0 ? 1 : 0;
      const insertResult = await users.insertOne({ id, username, password, email, role, });

      return { id, username, password, email, role, };
    },
    loginOne: async ({ username, password, }) => {
      const user = await users.findOne({ username, password, });
      if (!user) {
        throw new Error('User not found');
      }
      const token = fastify.jwt.sign({ ...user })

      return { ...user, token, };
    },
    updateRole: async ({ id, role, }) => {
      const updateResult = await users.updateOne({ id }, { $set: { role } });

      return users.findOne({ id, });
    },
  })
})