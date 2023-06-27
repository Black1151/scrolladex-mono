import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import User from './User'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public emp_no: string

  @column()
  public job_title: string

  @column()
  public department_id: number

  @hasOne(() => User, {
    foreignKey: 'employee_id',
  })
  public user: HasOne<typeof User>

  @belongsTo(() => Department, {
    foreignKey: 'department_id',
  })
  public department: BelongsTo<typeof Department>

  @column()
  public telephone: string

  @column()
  public email: string

  @column()
  public profile_picture_url: string | null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
