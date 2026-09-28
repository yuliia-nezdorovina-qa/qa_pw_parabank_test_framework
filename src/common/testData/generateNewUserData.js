import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export function generateNewUserData() {
  const uniquePart = randomUUID().replace(/-/g, '').slice(0, 12);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();

  const user = {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.string.numeric(10), // 10 цифр, без розширень
    ssn: faker.string.numeric(9),
    username: `user_${uniquePart.slice(0, 10)}`,
    password,
    confirmPassword: password,
  };

  return user;
}
