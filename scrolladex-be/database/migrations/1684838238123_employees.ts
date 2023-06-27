import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('emp_no').notNullable().unique()
      table.string('job_title').notNullable()
      table.integer('department_id').unsigned().references('id').inTable('departments').onDelete("CASCADE")
      table.string('telephone').notNullable()
      table.string('email').notNullable().unique()
      table.string('profile_picture_url').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
