import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
import { ValidationSchemas } from './validations'


const publicKey = 'BIzcyvjKKdhU3Bb45SaDhF34Vs9G6KCQyLIS1xHXjqO1ifnVmwuiqrDrA5QARFEFm1OH5Mn-SORsi8hwo3BIbm0'
const privateKey = 'CgIr2nLijBG2ftuF9vb8COUM2CCXm979EZV7qrppFg4'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationRoutes(app: FastifyInstance) {
  const validateSchemas = new ValidationSchemas()

  app.get('/push/public-key', () => {
    return {
      publicKey
    }
  })

  app.post('/push/register', (req, reply) => {
    return reply.status(201).send()
  })

  app.post(
    '/push/send',
    { preHandler: validateSchemas.pushSendBody },
    async (req, reply) => {
    const { subscription } = req.body as any
    console.log(subscription)
    WebPush.sendNotification(subscription, 'Hello backend')
  })
}