import jwt, { Secret } from 'jsonwebtoken';

export const getUserFromToken = async (token: string) => {
  let currentUser;
  if (token) {
    try {
      currentUser = await jwt.verify(token, process.env.JWT_SECRET as Secret);
      return currentUser;
    } catch (error) {
      console.error('this is jwt error', error);
    }
  }
};

export const createToken = async (
  details: { id: string; email: string; name?: string; role?: string },
  expiresIn: string
) => {
  return await jwt.sign(details, process.env.JWT_SECRET as Secret, {
    expiresIn: expiresIn || '1h',
  });
};
