import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(8),
      rules.confirmed('password_confirmation'),
    ]),
  })
  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'email.required': 'O email é obrigatório',
    'email.email': 'O email não é válido',
    'email.unique': 'O email já está sendo utilizado',
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha deve ter no mínimo 8 caracteres',
    'password.confirmed': 'As senhas não conferem',
  }
}
