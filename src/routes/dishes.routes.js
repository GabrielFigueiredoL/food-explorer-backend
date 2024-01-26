const { Router } = require("express")
const uploadConfig = require("../configs/upload")
const multer = require("multer")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router()
const DishesController = require("../controllers/DishesController")

const dishesController = new DishesController()
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/",verifyUserAuthorization("admin"), upload.single("dishImage"), dishesController.create)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.delete("/:id",verifyUserAuthorization("admin"), dishesController.delete)
dishesRoutes.patch("/:id",verifyUserAuthorization("admin"), upload.single("dishImage"), dishesController.update)

module.exports = dishesRoutes
