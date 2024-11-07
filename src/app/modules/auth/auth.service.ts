import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payLoad: TUser) => {
  const email = payLoad.email;
  const name = payLoad.name;
  const checkexistingUserNameAndEmail = User.isUserExist(name, email);

  if (!checkexistingUserNameAndEmail) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This name or mail is already in use for this web',
    );
  }

  payLoad.password = payLoad.password || (config.default_password as string);
  const result = await User.create(payLoad);
  return result;
};

const loginUserFromDB = async (payLoad: TUser) => {
  const user = await User.isUserExistByEmail(payLoad?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is already deleted');
  }

  const isPassowrdMatched = await User.isPasswordMatched(
    payLoad?.password,
    user?.password,
  );
  if (!isPassowrdMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
  }

  const jwtPayLoad = { email: user?.email, userRole: user?.role, user: user };
  const accessToken = createToken(
    jwtPayLoad,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayLoad,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { user, accessToken, refreshToken };
};

const changePasswordFromDB = async (
  user: JwtPayload,
  payLoad: { oldPassword: string; newPassword: string },
) => {
  console.log('From auth service:', user);
  console.log('From auth service:', payLoad);
  const userInfo = await User.isUserExistByEmail(user?.email);
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isDeleted = userInfo?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payLoad?.oldPassword,
    userInfo?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password do not matched');
  }
  const newHashedPassword = await bcrypt.hash(
    payLoad?.newPassword,
    Number(config.brypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    { email: user?.email, role: user?.userRole },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  const userInfo = await User.isUserExistByEmail(email);
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isDeleted = userInfo?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  if (
    userInfo?.passwordChangedAt &&
    User?.isJWTIssuedBeforePasswordChange(
      userInfo?.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const jwtPayLoad = {
    email: userInfo?.email,
    userRole: userInfo?.role,
  };
  const accessToken = createToken(
    jwtPayLoad,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthServices = {
  createUserIntoDB,
  loginUserFromDB,
  changePasswordFromDB,
  refreshToken,
};
