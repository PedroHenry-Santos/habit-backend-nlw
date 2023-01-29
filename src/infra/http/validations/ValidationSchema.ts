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

  getHabitADayQuery(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const habitADayQuery = z.object({
      date: z.coerce.date()
    })
    habitADayQuery.parse(request.query)
    done()
  }
  toggleDayHabitParams(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const dayHabitParams = z.object({
      id: z.string().uuid()
    })
    dayHabitParams.parse(request.params)
    done()
  }
}