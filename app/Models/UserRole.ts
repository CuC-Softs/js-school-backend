import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
  SnakeCaseNamingStrategy,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Role from 'App/Models/Role'
import { DateTime } from 'luxon'

export default class UserRole extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'user_roles'
  public static selfAssignPrimaryKey = false

  @column({
    isPrimary: true,
  })
  public id: number

  @column({})
  public user_id: number

  @column({})
  public role_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>
}
