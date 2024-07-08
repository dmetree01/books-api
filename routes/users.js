'use strict'

module.exports = async function (fastify) {
  fastify.post('/users/register', async function (request) {
    const { id, username, password, email, role, } = await fastify.users.registerOne(request.body);
    return { id, username, password, email, role, };
  });

  fastify.post('/users/login', async function (request) {
    const { id, username, password, email, role, token, } = await fastify.users.loginOne(request.body)
    return { id, username, password, email, role, token, };
  });

  fastify.get('/users/me', {
      onRequest: [fastify.jwtAuth]
    }, async function (request) {
    return request.user;
  });

  fastify.put('/users/:id/role', {
    onRequest: [fastify.allowAdmin]
  }, async function (request) {
    return await fastify.users.updateRole({ ...request.params, ...request.body, });
  });
}
