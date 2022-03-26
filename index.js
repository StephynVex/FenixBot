const { WAConnection } = require('@adiwajshing/baileys')

const connectToWA = async() => {
  const conn = new WAConnection
  
  conn.on('qr', () => console.log('Escanee el codigo qr'))
  
  conn.on('connecting', () => console.log('Conectando...'))
  
  conn.on('open', () => console.log('Conectado exitosamente'))
  
  await conn.connect({timeoutMs: 30 * 1000})
  conn.on('chat-update', mek => {
        if (mek.messages && mek.count) {
            const message = mek.messages.all()[0]
            console.log(message)
        } else console.log(mek)
    })
}

connectToWA()
