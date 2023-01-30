import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./infra/http/routes";
import { notificationRoutes } from "./infra/http/notification-routes";

const app = Fastify()

app.register(cors)
app.register(appRoutes)
app.register(notificationRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running!')
})