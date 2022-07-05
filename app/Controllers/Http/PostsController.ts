import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Post/StoreValidator'
import UpdateValidator from 'App/Validators/Post/UpdateValidator';

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const MAX_LIMIT_PAGE: number = 100;
    const DEFAULT_LIMIT_PAGE = 10;
    const DEFAULT_PAGE: number = 1;


    let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PAGE } = request.qs()

    if (limit > MAX_LIMIT_PAGE) {
      limit = 100
    }

    const posts = await Post.query().paginate(page, limit)
    return posts

  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)

    return response.created(post)
  }

  public async show({ params, response }: HttpContextContract) {
    const post = Post.find(params.id)

    if(!post) {
      return response.notFound('Post not found')
    }

    return post
  }

  public async update({ params, response, request, bouncer}: HttpContextContract) {
    const post = await Post.find(params.id)

    if (!post) {
      return response.badRequest('Post not found')
    }

    await bouncer.with('PostPolicy').authorize('update', post)

    const data = await request.validate(UpdateValidator)
    post.merge(data)
    await post.save()

    return post
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const post = await Post.find(params.id)

    if (!post) {
      return response.badRequest('Post not found')
    }

    await bouncer.with('PostPolicy').authorize('delete', post)
    await post.delete()
  }
}
