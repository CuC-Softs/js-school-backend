import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import StoreValidator from 'App/Validators/Classroom/StoreValidator'
import UpdateValidator from 'App/Validators/Classroom/UpdateValidator'

export default class ClassroomsController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const classroom = await Classroom.create(data)
    return classroom
  }

  public async show({ params, response }: HttpContextContract) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) {
      return response.notFound('Classroom not found!')
    }
    return classroom
  }

  public async update({ request, params, response }: HttpContextContract) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) {
      return response.badRequest('Classroom not found!')
    }
    const data = await request.validate(UpdateValidator)
    classroom.merge(data)
    await classroom.save()
    return classroom
  }

  public async destroy({ params, response }: HttpContextContract) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) {
      return response.badRequest('Classroom not found!')
    }
    await classroom.delete()
  }
}
