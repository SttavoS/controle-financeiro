import { Request, Response } from 'express';
import MakeAuthenticationService from '../services/MakeAuthenticationService';
import UsersView from '../views/UsersView';

export default class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authentication = new MakeAuthenticationService();

    const payload = authentication.execute({ email, password });

    return response.status(200).json({
      user: UsersView.render((await payload).user),
      token: (await payload).token,
    });
  }
}
