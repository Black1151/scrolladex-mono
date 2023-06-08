import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {
  
  public async register({ request, auth, response }: HttpContextContract) {
    const userData = request.only(['username', 'password'])
    const user = new User()
    user.username = userData.username
    user.password = userData.password
    await user.save()
    await auth.login(user)
    response.send({ message: 'Registered and logged in successfully' })
  }
  
  public async login({ request, auth, response }: HttpContextContract) {
    const user = request.only(['username', 'password'])
    
    try {
      await auth.use('web').attempt(user.username, user.password)
      response.send({ message: 'Logged in successfully' })
    } catch {
      response.unauthorized('Invalid credentials')
    }
  }
  

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.send({ message: 'Logged out successfully' })
  }

  public async showProfile({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (user) {
      response.send(user)
    } else {
      response.unauthorized('Not logged in')
    }
  }

  public async checkSession({ auth, response }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return { authenticated: true }
    } else {
      return response.unauthorized({ authenticated: false})
    }
}

}




