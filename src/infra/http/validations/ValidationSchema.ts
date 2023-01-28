import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { z } from 'zod'

export class ValidationSchemas {
  createHabitBody(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    createHabitBody.parse(request.body)
    done()
  }
}