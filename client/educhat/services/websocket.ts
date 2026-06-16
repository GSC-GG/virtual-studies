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
        new WebSocket('ws://localhost:8080/ws'),

      reconnectDelay: 5000,

      debug: str => {
      },

      onConnect: () => {
        this.connected = true


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
  }

  sendMessage(chatId: number, payload: any) {

    if (!this.connected) {
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