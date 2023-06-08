import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
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
  public user_id: number

  @column()
  public department_id: number

  @belongsTo(() => Department, {
    foreignKey: 'department_id',
  })
  public department: BelongsTo<typeof Department>

  @belongsTo(() => User, { 
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

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
