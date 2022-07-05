import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class PostPolicy extends BasePolicy {
	public async update(user: User, post: Post) {
    if(user.id === post.userId){
      return true
    }

    return false
  }
	public async delete(user: User, post: Post) {
    if(user.id === post.userId){
      return true
    }

    return false
  }
}
