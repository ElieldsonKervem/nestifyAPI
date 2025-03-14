import { FastifyInstance } from 'fastify'
import { knex } from '../config/knexConfig.ts'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { verifyCokiesIdExist } from '../middlewares/verifyCookiesIdExist.ts'

export function transactions(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [verifyCokiesIdExist] },
    async (request, reply) => {
      const { session_id } = request.cookies

      const showTransactions = await knex('transactions')
        .where('session_id', session_id)
        .select('*')

      reply.send(showTransactions)
    },
  )

  app.get(
    '/:id',
    { preHandler: [verifyCokiesIdExist] },
    async (request, reply) => {
      const { id } = request.params

      const showTransactionById = await knex('transactions')
        .where('id', id)
        .first()

      reply.send(showTransactionById)
    },
  )

  app.get(
    '/sumary',
    { preHandler: [verifyCokiesIdExist] },
    async (request, reply) => {
      const { session_id } = request.cookies

      const sumary = await knex('transactions')
        .where('session_id', session_id)
        .sum('amount', {
          as: 'amount',
        })
        .first()
      reply.send(sumary)
    },
  )
  // rota que retornar a soma do valores da conta

  app.post('/', async (request, reply) => {
    console.log(request.body)
    const createBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = createBodySchema.parse(request.body)

    let transactionsId = request.cookies.session_id

    if (!transactionsId) {
      transactionsId = randomUUID()
      console.log('user não tem section')
      reply.cookie('session_id', transactionsId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      session_id: transactionsId,
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    return reply.status(201).send()
  })
}
