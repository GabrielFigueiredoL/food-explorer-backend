require("express-async-errors")
const cors = require("cors")

const AppError = require('./utils/AppError')
const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")
const uploadConfig = require("./configs/upload")

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3333

app.use(routes)

database()
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))