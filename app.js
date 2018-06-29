const express = require('express')
const { EventEmitter } = require('events')

const clock = new EventEmitter()
setInterval(() => {
  const time = (new Date()).toLocaleString()
  clock.emit('tick', time)
}, 5000)

clock.on('tick', time => console.log('The time is ', time))

const app = express()
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <script type="text/javascript">
          console.log('hello world!')
        </script>
      </head>
    </html>
  `)
})

app.listen(3333, () => {
  console.log('listening on 3333...')
})
