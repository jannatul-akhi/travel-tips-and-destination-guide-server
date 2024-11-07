import express from 'express';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import zodValidationMiddleware from '../../middlewares/zodValidationMiddleware';

const router = express.Router();

router.post(
  '/signup',
  zodValidationMiddleware(UserValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post(
  '/signin',
  zodValidationMiddleware(AuthValidation.createAuthValidation),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  zodValidationMiddleware(AuthValidation.changePasswordValidationAchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  zodValidationMiddleware(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
