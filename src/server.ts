import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactions } from './routes/transactionsRouter.ts'

const app = fastify()
app.register(cookie)
app.register(transactions, {
  prefix: 'trasactions',
})
app
  .listen({
    port: 3131,
  })
  .then(() => {
    console.log('app rodando')
  })
