import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({}, []),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({}, [
      rules.minLength(8),
      rules.confirmed('password_confirmation'),
    ]),
  })
  public messages: CustomMessages = {
    'email.email': 'O email não é válido',
    'email.unique': 'O email já está sendo utilizado',
    'password.minLength': 'A senha deve ter no mínimo 8 caracteres',
    'password.confirmed': 'As senhas não conferem',
  }
}
