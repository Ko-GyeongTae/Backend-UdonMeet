import Container, { Inject, Service } from 'typedi';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { SignInDto, SignUpDto } from '../models/dto/user.dto';

@Service()
export class UserController {
  async signIn(req: Request, res: Response): Promise<void> {
    console.log('controller');
    const body: SignInDto = req.body;
    const userService = Container.get(UserService);
    const token = await userService.signIn(body);
    if (token) {
      res
        .status(200)
        .json({
          access_token: token,
        })
        .end();
    } else {
      res.sendStatus(401).end();
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const body: SignUpDto = req.body;
    const userService = Container.get(UserService);
    console.log('SIGNUP');
    try {
      await userService.signUp(body);
    } catch (e) {
      console.log(e);
      res.sendStatus(409).end();
      return;
    }
    res.sendStatus(201).end();
  }
}
