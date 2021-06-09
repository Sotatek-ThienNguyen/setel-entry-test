import { dataLogin } from '../dataLogin.fixture';

export const getUserId = (username) => {
  const user = dataLogin.filter(data => data.username === username);

  return user && user[0]?.id;
}

export const checkExistUsername = (username) => {
  let correctUsername = false;
  dataLogin.forEach(data => {
    if (data.username === username) {
      correctUsername = true
    }
  });

  return correctUsername;
}