const connectToMongo = require("./db");

connectToMongo();

const express = require('express');
const cors = require('cors')
const app = express()
const port = 5000

// for request json resolve
app.use(express.json());
// for any side requiest exsept
app.use(cors())

// Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// for login and sing up and get data
app.use("/api/auth", require('./routes/auth'))
// notes
app.use("/api/notes", require("./routes/notes"));
// app.use("/api/notes",require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})