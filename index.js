const { WAConnection } = require('@adiwajshing/baileys')
const fs = require('fs')

const auth = './session.json'

const start = async() => {
        const client = new WAConnection()
        client.logger.level = 'warn'
        client.version = [2, 2143, 3]
        
        client.on('qr', () => console.log('Escanee el codigo'))
        
        fs.existsSync(auth) && client.loadAuthInfo(auth)
        client.on('connecting', () => console.log('Conectando'))
        
        client.on('open', () => {
                fs.writeFileSync(auth, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
                console.log('Conectado')
        })
        
        await client.connect({timeoutMs: 30 * 1000})
}

start()
