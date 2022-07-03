import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async update(user: User, otherUser: User) {
    await user.load('roles')
    if (user.id === otherUser.id) {
      return true
    }
    if (user.roles.find((role) => role.slug === 'admin')) {
      return true
    }
    return false
  }
  public async delete(user: User, otherUser: User) {
    await user.load('roles')
    if (user.id === otherUser.id) {
      return true
    }
    if (user.roles.find((role) => role.slug === 'admin')) {
      return true
    }
    return false
  }
}
