const { WAConnection } = require('@adiwajshing/baileys')
const fs = require('fs')

const start = async() => {
        const client = new WAConnection()
        client.logger.level = 'warn'
        client.version = [2, 2143, 3]
        
        client.on('qr', () => console.log('Escanee el codigo'))
        
        fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
        client.on('connecting', () => console.log('Conectando'))
        
        client.on('open', () => {
                fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
                console.log('Conectado')
        })
        
        await client.connect({timeoutMs: 30 * 1000})
        
        client.on('chat-update', async(m) => {
                return
        })
}

start()
