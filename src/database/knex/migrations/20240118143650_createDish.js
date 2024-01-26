exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id")
    table.text("image")
    table.text("name")
    table.text("category")
    table.float("price")
    table.text("description")

    table.timestamp("createdAt").default(knex.fn.now())
    table.timestamp("updatedAt").default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("dishes")
