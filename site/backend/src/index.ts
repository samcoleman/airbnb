import Fastify from 'fastify'
import { RPCHandler } from '@orpc/server/fastify'
import { onError } from '@orpc/server'
import { router } from './routes'
import { CORSPlugin } from '@orpc/server/plugins'

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
})

const handler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin(),
  ],
  interceptors: [
    onError((error: any) => {
      fastify.log.error({ error: error.message, code: error.code }, 'oRPC Error')
    }),
  ],
})

fastify.addContentTypeParser('*', (_request, _payload, done) => {
  done(null, undefined)
})

fastify.all('/rpc/*', async (req, reply) => {
  const { matched } = await handler.handle(req, reply, {
    prefix: '/rpc',
    context: {
      headers: req.headers,
    }
  })

  if (!matched) {
    reply.status(404).send('Not found')
  }
})

fastify.get('/', async (_request, reply) => {
  reply.send({ message: 'Captive Portal API', status: 'ok' })
})

fastify.get('/health', async (_request, reply) => {
  reply.send({ status: 'healthy' })
})

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10)
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`Server running on http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()