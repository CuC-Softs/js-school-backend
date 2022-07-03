import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    class: schema.string({}, [rules.required()]),
    teacherId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.required': 'O nome da sala de aula precisa ser informado!',
    'class.required': 'A classe precisa ser informada!',
    'teacherId.required': 'A sala de aula precisa ter um professor!',
    'teacher.exists': 'O professor da sala de aula não existe!',
  }
}
