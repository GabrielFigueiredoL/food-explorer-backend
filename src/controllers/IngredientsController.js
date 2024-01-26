const knex = require("../database/knex")

class IngredientsController {
  async create(request, response) {
    const dish_id = request.dish.id

    const ingredients = await knex("ingredients")
      .where({ dish_id })
      .groupBy("name")

    return response.json(ingredients)
  }
}

module.exports = IngredientsController
