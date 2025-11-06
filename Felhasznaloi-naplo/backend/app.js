import express from "express"
import entryRoutes from "./routes/entryRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const port = 3000;

app.use(express.json())
app.use("/api", entryRoutes)
app.use("/api", userRoutes)

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})