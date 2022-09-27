import { Server } from 'socket.io'
import {defineNuxtModule} from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('listen', server => {
      const io = new Server(server)

      nuxt.hook('close', () => io.close())

      io.on('connection', () => {
        console.log("CONNECTION")
      })
    })
  }
})