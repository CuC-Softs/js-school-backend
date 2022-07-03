import { column, BaseModel, hasMany, HasMany, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Permission from 'App/Models/Permission'

export default class Role extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'roles'
  public static selfAssignPrimaryKey = false

  @column({
    isPrimary: true,
  })
  public id: number

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

  @hasMany(() => Permission)
  public permissions: HasMany<typeof Permission>
}
