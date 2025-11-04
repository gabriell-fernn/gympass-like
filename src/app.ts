import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Here you can integrate with a monitoring tool like Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
