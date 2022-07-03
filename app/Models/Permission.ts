import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
  SnakeCaseNamingStrategy,
} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Role from 'App/Models/Role'

export default class Permission extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'permissions'
  public static selfAssignPrimaryKey = false

  @column({
    isPrimary: true,
  })
  public id: number

  @column({})
  public role_id: number

  @column({})
  public slug: string

  @column({})
  public name: string

  @column({})
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>
}
