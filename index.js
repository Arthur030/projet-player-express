const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001



app.use(cors(
    {
        "origin": "http://localhost:3002",
        "methods": "POST"
    }
)
)
app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`))

let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'audio-player-db',
    password: 'OxCK)PJ/T[fn9y@c',
    database: 'audio-player-db'
})

app.post("/", (req, res) => {
    
        const author = req.body.author
        const title = req.body.title
        const audio = req.body.audio
        const date = new Date(Date.now())
    
    connection.query("INSERT INTO tracks (auth, title, src, date) VALUES (?, ?, ?, ?)", 
                    [author, title, audio, date],(err, result) => {
        if (err) {
            console.log(err)
        }
            console.log(author, title, audio, date)
        
    })
})

app.get('/', (req, res) => {
    res.send("hello")
    console.log('connection')
    connection.query("SELECT * FROM tracks", (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(res)
    })
})

// connection.connect(function(err) {
//     if (err) throw err
//     console.log('Connected')
//     let sql = "SELECT * FROM tracks"
//     connection.query(sql, function (err, result) {
//         if (err) throw err
//         app.get('/', (req, res) => {
//             res.send(result)
//           })
//         console.log(result)
//     })
//     connection.end()
//     console.log("Disconnected")
// })