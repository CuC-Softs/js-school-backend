import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string.optional({}, [
      rules.minLength(8),
    ]),
    content: schema.string.optional({}, [
      rules.minLength(12),
    ])
  })
  public messages: CustomMessages = {
    'title.required': 'O título é obrigatório',
    'title.minLength': 'O título deve ter no mínimo 8 caracteres',
    'content.required': 'O conteúdo é obrigatório',
    'content.minLength': 'O conteúdo deve ter no mínimo 12 caracteres',
  }
}
