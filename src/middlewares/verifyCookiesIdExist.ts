import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyCokiesIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const transactionsId = request.cookies.session_id

  if (!transactionsId) {
    return reply.status(401).send({
      error: 'Usuario não autorizadp',
    })
  }
}
