const fastify = require('fastify')({ logger: true });

// Sample data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Routes

// Welcome route
fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Fastify API!' };
});

// Get all users
fastify.get('/users', async (request, reply) => {
  return users;
});

// Get a single user by ID
fastify.get('/users/:id', async (request, reply) => {
  const user = users.find(u => u.id === parseInt(request.params.id));
  if (user) {
    return user;
  } else {
    reply.code(404).send({ error: 'User not found' });
  }
});

// Add a new user
fastify.post('/users', async (request, reply) => {
  const newUser = { id: users.length + 1, name: request.body.name };
  users.push(newUser);
  reply.code(201).send(newUser);
});

// Update a user
fastify.put('/users/:id', async (request, reply) => {
  const user = users.find(u => u.id === parseInt(request.params.id));
  if (user) {
    user.name = request.body.name;
    return user;
  } else {
    reply.code(404).send({ error: 'User not found' });
  }
});

// Delete a user
fastify.delete('/users/:id', async (request, reply) => {
  const userIndex = users.findIndex(u => u.id === parseInt(request.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    reply.code(204).send();
  } else {
    reply.code(404).send({ error: 'User not found' });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
