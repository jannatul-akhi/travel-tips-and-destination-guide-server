import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthServices.createUserIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfsully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);
  const { user, accessToken, refreshToken } = result;

  const isProduction = config.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 3600000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 86400000, // 1 day
  });

  res.cookie('user', JSON.stringify(user), {
    httpOnly: false,
    secure: isProduction,
    maxAge: 3600000,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfsully',
    data: { user, accessToken: accessToken, refreshToken: refreshToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePasswordFromDB(
    req.user,
    passwordData,
  );
  console.log('From auth controller:', result);
  console.log('From auth controller:', passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refereshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refereshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrived successfully',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  changePassword,
  refreshToken,
};
