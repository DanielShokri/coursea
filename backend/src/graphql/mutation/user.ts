import { hash, compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { genId, prisma } from '../../modules/db';
import { createToken } from '../../Utils/getUserFromToken';

export const userResolvers = {
  async registerUser(_: any, args: any) {
    const { name, email, password, role } = args;
    const id = genId();
    //   check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      throw new GraphQLError('User already exists', {
        extensions: { code: 'USER_ALREADY_EXISTS' },
      });
    //  hash password
    const hashedPassword = await hash(password, 10);

    // sign token
    const details = { id, email, name, role };
    const token = await createToken(details, '1h');

    //   create user
    await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        id,
        password: hashedPassword,
        token,
        role,
      },
    });
    return token;
  },
  loginUser: async (_: any, args: any) => {
    const { email, password } = args;

    //   check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new GraphQLError('Email or password are wrong!', {
        extensions: { code: 'USER_NOT_EXISTS' },
      });

    //   check if password is correct
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      throw new GraphQLError('Incorrect password', {
        extensions: { code: 'INCORRECT_PASSWORD' },
      });

    //   sign token
    const details = { id: user.id, email, name: user.name, role: user.role };
    const token = await createToken(details, '1h');
    user.token = token;
    return token;
  },
};
