import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Departments extends BaseSchema {
  protected tableName = 'departments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('department_name').notNullable().unique()
      table.string('address_line_one').notNullable()
      table.string('address_line_two')
      table.string('town').notNullable()
      table.string('county').notNullable()
      table.string('postcode').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
