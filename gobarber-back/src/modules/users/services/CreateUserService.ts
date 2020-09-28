import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

// All business rules must be in the app,
// not in the data base
// The server never connects to the response
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      email,
    });

    if (checkUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    const createUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = usersRepository.save(createUser);
    return user;
  }
}

export default CreateUserService;
