const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

const diskStorage = new DiskStorage()

class DishRepository {
  async create({
    name,
    category,
    price,
    description,
    ingredients,
    dishFilename,
  }) {
    const image = await diskStorage.saveFile(dishFilename)

    const [dishId] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      image,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dishId,
        name,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    return { id: dishId }
  }

  async delete({ id }) {
    const dish = await knex("dishes").where({ id }).first()

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    await knex("dishes").where({ id }).delete()
  }

  async show({ id }) {
    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients")
      .where({ dishId: id })
      .orderBy("name")

    return { ...dish, ingredients }
  }

  async index({ name }) {
    const dishes = await knex("dishes")
      .whereLike("name", `%${name}%`)
      .orderBy("category")

    return dishes
  }

  async update({
    id,
    name,
    category,
    price,
    description,
    ingredients,
    dishFilename,
  }) {
    const dish = await knex("dishes").where({ id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado")
    }

    if (dishFilename) {
      if (dish.image) {
        await diskStorage.deleteFile(dish.image)
      }

      const image = await diskStorage.saveFile(dishFilename)
      dish.image = image ?? dish.image
    }

    dish.name = name ?? dish.dame
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description

    await knex("dishes").update(dish).where({ id: dish.id })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dishId: id,
        name,
      }
    })
    await knex("ingredients").where({ dishId: id }).delete()

    await knex("ingredients").insert(ingredientsInsert)
  }
}

module.exports = DishRepository
