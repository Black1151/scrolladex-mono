import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Employee from 'App/Models/Employee'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public department_name: string

  @column()
  public address_line_one: string

  @column()
  public address_line_two?: string

  @column()
  public town: string

  @column()
  public county: string

  @column()
  public postcode: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @hasMany(() => Employee, {
    foreignKey: 'department_id',
  })
  public employees: HasMany<typeof Employee>
}
