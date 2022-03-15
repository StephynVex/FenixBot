
const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const { text, extendedText, contact, listMessage, buttonsMessage, location, image, video, sticker, document, audio } = MessageType
const fs = require('fs')


const ownerNumber = ['595985902159']
const prefix = '.'

const connectToWA = async() => {
	const conn = new WAConnection()
	conn.logger.level = 'warn'
	conn.version = [2, 2143, 3]
	
	conn.on('qr', () => console.log('Escanee el codigo qr'))
	
	fs.existsSync('./auth_info.json') && conn.loadAuthInfo('./auth_info.json')
	conn.on('connecting', () => console.log('Conectando...'))
	
	conn.on('open', () => {
		fs.writeFileSync('./auth_info.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
		console.log('Conectado exitosamente')
	})
	await conn.connect({timeoutMs: 30 * 1000})
	
	conn.on('chat-update', async(mek) => {
		try {
			if (!mek.hasNewMessage) return
			if (!mek.messages) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			
			mek = mek.messages.all()[0]
			if (!mek.message) return
			
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			const type = Object.keys(mek.message)[0]
			const content = JSON.stringify(mek.message)
                        const from = mek.key.remoteJid
                        const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
                        const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
                        const q = args.join(' ')
                        const conn_user = conn.user.jid
                        const botNumber = conn.user.jid.split('@')[0]
                        const isGroup = from.endsWith('@g.us')
                        const sender = mek.key.fromMe ? conn.user.jid : mek.participant
			const senderNumber = sender.split('@')[0]
                        const conts = mek.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
                        const pushname = mek.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'
			
                        const isMe = botNumber.includes(senderNumber)
                        const isOwner = ownerNumber.includes(senderNumber) || isMe
			
			const reply = (teks) => {
				conn.sendMessage(from, teks, text, { quoted: mek })
			}
			
			switch (command) {

case 'hola':
reply('Hola como estas? :D')
break

				default:
					if (body.startsWith('>')) {
						try {
							reply(JSON.stringify(eval(body.slice(1)), null, 2))
						} catch(e) {
							reply(String(e))
						}
					}
			}
			
		} catch (e) {
			const isError = String(e)
			
			if (isError.includes('this.isZero')) return
			if (isError.includes('jid')) return
			
			console.log(isError)
		}
	})
}

connectToWA()

