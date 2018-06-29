const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <script type="text/javascript">
          console.log('hello world!')
          function longPollForTime () {
            fetch('/the-time', { headers: { 'Cache-Control': 'no-cache' } })
              .then(response => response.text())
              .then(time => {
                console.log('The time is: ', time)
                longPollForTime()
              })
          }
          longPollForTime()
        </script>
      </head>
    </html>
  `)
})

const { EventEmitter } = require('events')
const clock = new EventEmitter()
setInterval(() => {
  const time = (new Date()).toLocaleString()
  clock.emit('tick', time)
}, 5000)

clock.on('tick', time => console.log('The time is ', time))

app.get('/the-time', (req, res) => {
  clock.once('tick', time => res.send(time))
})

app.listen(3333, () => {
  console.log('listening on 3333...')
})

