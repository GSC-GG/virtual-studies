import { Client } from '@stomp/stompjs'

export class ChatSocketService {
  private client: Client | null = null
  private connected = false

  connect(
    chatId: number,
    onMessage: (message: any) => void
  ) {
    this.client = new Client({
      webSocketFactory: () =>
        new WebSocket('ws://192.168.0.102:8080/ws'),

      reconnectDelay: 5000,

      debug: str => {
        console.log(str)
      },

      onConnect: () => {
        this.connected = true

        console.log('WebSocket conectado')

        this.client?.subscribe(
          `/topic/chats/${chatId}`,
          msg => {
            onMessage(JSON.parse(msg.body))
          }
        )
      },

      onDisconnect: () => {
        this.connected = false
      },

      onStompError: frame => {
        console.error(frame)
      },
    })

    this.client.activate()
    console.log('active')
  }

  sendMessage(chatId: number, payload: any) {

    if (!this.connected) {
      console.log('STOMP não conectado')
      return
    }

    this.client?.publish({
      destination: `/app/chats/${chatId}/messages`,
      body: JSON.stringify(payload)
    })
  }

  disconnect() {
    this.client?.deactivate()
  }
}