import { Client } from '@stomp/stompjs'

export class ChatSocketService {
  private client: Client | null = null
  private connected = false

  connect(
    chatId: number,
    onMessage: (message: any) => void,
    token: string
  ) {
    this.client = new Client({
      webSocketFactory: () =>
        new WebSocket('ws://localhost:8080/ws'),

      connectHeaders: {
        Authorization: `Bearer ${token}`
      },

      reconnectDelay: 5000,

      debug: str => {
        console.log(str)
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

  sendMessage(chatId: number, payload: any, auth: string) {

    if (!this.connected) {
      return
    }

    console.log(auth)

    this.client?.publish({
      destination: `/app/chats/${chatId}/messages`,
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
  }

  disconnect() {
    this.client?.deactivate()
  }
}