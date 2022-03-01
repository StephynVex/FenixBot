# StephynBot

## Instalación por termux

<p>Primero actualizar el pkg</p>

```bash
> pkg update
> pkg upgrade
```

<p>Luego instalar algunas extenciones con el pkg</p>

```bash
> pkg i nodejs
> pkg i git
> pkg i mc
> pkg i vim
```

<p>Ahora descargar el git del bot</p>

```bash
> git clone https://github.com/StephynVex/StephynBot1
```

<p>Ingresar a la carpeta del bot</p>

```bash
> cd StephynBot1
```

<p>Ahora instalar algunas librerias</p>

```bash
> npm i
> npm i pm2 -g
```

<p>Para prender el bot</p>

```bash
> npm start
```

<p>Extras</p>

```bash
> pm2 monit //Para ver los console log
> pm2 kill //Para apagar el bot
```
