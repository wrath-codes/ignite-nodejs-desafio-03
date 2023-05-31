import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

export const app = fastify()

// Register fastify-jwt
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Register cookies
app.register(fastifyCookie)

// Register error handler
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error!', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to Sentry/Datadog/NewRelic/etc
  }

  return reply.status(500).send({ message: 'Internal Server Error!' })
})
