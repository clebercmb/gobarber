import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list user providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'johnduo@example.com',
      name: 'John Duo',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'johntre@example.com',
      name: 'John Tre',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'johnqua@example.com',
      name: 'John Qua',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    // console.log('providers===>', providers);

    expect(providers).toEqual([user1, user2]);
  });
});
