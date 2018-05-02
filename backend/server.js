const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.raw({type: "*/*"}))

let serverState = {
    msgs: []
}

app.post('/sendMsg', (req, res) => {
    console.log(req.body.toString());
    let parsed = JSON.parse(req.body.toString());
    
    serverState.msgs = serverState.msgs.concat(parsed);
    res.send("success")
    
})

app.get('/messages', (req, res) => {
    res.send(JSON.stringify(serverState.msgs))
})

app.listen(4000);