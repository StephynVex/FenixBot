const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
const prefix = '.'

const iniciar = async(mek) => { 
        const client = new WAConnection(mek)
        client.logger.level = 'warn'
        client.version = [2, 2143, 3]
        
        client.on('qr', (mek) => console.log('Escanee el qr'))
        
        fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
        
        client.on('connecting', (mek) => console.log('Conectando'))
        
        client.on('open', (mek) => console.log('Conectado exitosamente :D'))
        
        await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
        
        client.on('chat-update', async (mek) => {
                try {	  
                        if (!mek.hasNewMessage) return
                        if (!mek.messages) return
                        if (mek.key && mek.key.remoteJid == 'status@broadcast') return
                        
                        mek = mek.messages.all()[0]
                        if (!mek.message) return
                        global.blocked
                        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                        const from = mek.key.remoteJid
                        const type = Object.keys(mek.message)[0]        
                        const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
                        const typeQuoted = Object.keys(quoted)[0]
                        const content = JSON.stringify('mek'.message)
                        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
                        const body = mek.message.conversation || mek.message[type].caption || mek.message[type].text || ""
                        chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
                        budy = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
                        
                        if (prefix != "") {
                                if (!body.startsWith(prefix)) {
                                        cmd = false
                                        comm = ""
                                } else {
                                        cmd = true
                                        comm = body.slice(1).trim().split(" ").shift().toLowerCase()
                                }
                        } else {
                                cmd = false
                                comm = body.trim().split(" ").shift().toLowerCase()
                        }
                        
                        const command = comm
                        
                        const arg = chats.slice(command.length + 2, chats.length)
                        const args = budy.trim().split(/ +/).slice(1)
                        const isCmd = budy.startsWith(prefix)
                        const q = args.join(' ')
                        const soyYo = client.user.jid
                        const botNumber = client.user.jid.split("595985902159@s.whatsapp.net")[0]
                        const ownerNumber = ['595985902159@s.whatsapp.net']
                        const isGroup = from.endsWith('@g.us')
                        const sender = mek.key.fromMe ? client.user.jid : isGroup ? mek.participant : mek.key.remoteJid
                        const senderNumber = sender.split("@")[0]
                        const isMe = senderNumber == botNumber
                        const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
                        const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
                        
                        switch (command) {

case 'bot':
client.sendMessage(from, 'Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo😚', text, {quoted : 'mek'})
break

                        }
                        
                } catch (e) {
                        console.log(e)
                }
        })      
}

iniciar()
