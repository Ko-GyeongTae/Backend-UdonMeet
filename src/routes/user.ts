import { Router } from 'express';
import Container from 'typedi';
import { UserController } from '../controllers/user.controller';
import { SignInDto, SignUpDto } from '../models/dto/user.dto';
import { validateBodyMiddleware } from '../utils/validateMiddleware';

const router = Router();
const userController = Container.get(UserController);
console.log('router');

router.post(
  '/sign-in',
  validateBodyMiddleware(SignInDto, '로그인 형식이 잘못되었습니다.'),
  userController.signIn,
);
router.post(
  '/sign-up',
  validateBodyMiddleware(SignUpDto, '회원가입 형식이 잘못되었습니다.'),
  userController.signUp,
);

export default router;
