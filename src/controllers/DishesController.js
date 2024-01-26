const knex = require("../database/knex")
const DishRepository = require("../repositories/DishRepository")
const DishCreateService = require("../services/DishCreateService")

const dishRepository = new DishRepository()
class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body

    const dishFilename = request.file.filename

    const dishCreateService = new DishCreateService(dishRepository)

    await dishCreateService.execute({
      name,
      category,
      price,
      description,
      ingredients,
      dishFilename,
    })

    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.params

    dishRepository.delete({ id })
    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await dishRepository.show({ id })

    return response.json(dish)
  }

  async index(request, response) {
    const { name } = request.query

    const dishes = await dishRepository.index({ name })

    return response.json(dishes)
  }

  async update(request, response) {
    const { name, category, price, description, ingredients } = request.body

    const { id } = request.params

    let dishFilename = null
    
    if (request.file !== undefined){
      dishFilename = request.file.filename
    }

      dishRepository.update({
        id,
        name,
        category,
        price,
        description,
        ingredients,
        dishFilename,
      })

    return response.json()
  }
}

module.exports = DishesController
