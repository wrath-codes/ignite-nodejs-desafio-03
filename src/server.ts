import { app } from './app'

app
  .listen({
    port: 6969,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`👾 Server is listening on port 6969!`)
  })
