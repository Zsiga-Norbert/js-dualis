import express from "express"
import entryRoutes from "./routes/entryRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

const app = express()
const port = 4567;

app.use(express.json())

app.use(cors())
app.use("/api", entryRoutes)
app.use("/api", userRoutes)

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})