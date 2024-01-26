class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ name, category, price, description, ingredients, dishFilename }) {

    const dishCreated = await this.dishRepository.create({
      name,
      category,
      price,
      description,
      ingredients,
      dishFilename
    })
    return dishCreated
  }
}

module.exports = DishCreateService
