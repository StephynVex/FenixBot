const { WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');

const iniciar = async() => { 
        const client = new WAConnection()
        client.logger.level = 'warn'
        client.version = [2, 2143, 3]

        client.on('qr', () => console.log('Escanee el codigo'))

        fs.existsSync('./Samu330.json') && client.loadAuthInfo('./Samu330.json')

        client.on('connecting', () => console.log('Conectando'))

        client.on('open', () => {
        console.log('Conectado exitosamente :D')
await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Samu330.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
        })
        }

iniciar ()
