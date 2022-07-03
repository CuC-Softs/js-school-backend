import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    let { page = 1, limit = 10 } = request.qs()
    if (limit > 100) {
      limit = 100
    }
    const users = await User.query().paginate(page, limit)
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    return response.created(user)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    return user
  }

  public async update({ params, response, request }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.badRequest('User not found')
    }
    const data = await request.validate(UpdateValidator)
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.badRequest('User not found')
    }
    await user.delete()
  }
}
