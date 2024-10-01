const express = require("express")
const cors = require("cors")
const port = 3000

const app = express()
const userEndpoint = require("./routes/users")
const absensiEndpoint = require("./routes/absensi")

const sequelize = require("./db.config")
sequelize.sync().then(() => console.log("database ready!"))

app.use(cors())
app.use(express.json())

app.use("/users", userEndpoint)
app.use("/absensi", absensiEndpoint)

app.listen(port, () => console.log(`server running on port ${port}`))
