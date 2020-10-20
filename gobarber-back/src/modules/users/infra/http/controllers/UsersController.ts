// Controllers must have at most 5 methods: index, show, create, update and delete
// Controllers are responsible to receive requests, forward those requests to other files and give the response back

import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
