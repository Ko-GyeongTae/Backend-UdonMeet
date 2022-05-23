import Container, { Inject, Service } from 'typedi';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { SignInDto, SignUpDto } from '../models/dto/user.dto';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  signIn = async (req: Request, res: Response): Promise<void> => {
    console.log('controller');
    const body: SignInDto = req.body;

    const tokenObj = await this.userService.signIn(body);
    if (!tokenObj) {
      res.sendStatus(401).end();
      return;
    }
    const { accessToken, refreshToken } = tokenObj;

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 3,
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
      })
      .end();
  };

  signUp = async (req: Request, res: Response): Promise<void> => {
    const body: SignUpDto = req.body;

    if (await this.userService.signUp(body)) {
      res.sendStatus(201).end();
    } else {
      res.sendStatus(409).end();
    }
  };

  signOut = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies['refreshToken'];
    await this.userService.signOut(refreshToken);
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .end();
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies['refreshToken'];
    const result = await this.userService.refresh(refreshToken);

    if (!result) {
      res.sendStatus(401).end();
    } else {
      const { accessToken, refreshToken } = result;
      res
        .status(200)
        .cookie('accessToken', accessToken, {
          maxAge: 1000 * 60 * 60 * 3,
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
        })
        .end();
    }
  };

  withDrawl = async (req: Request, res: Response): Promise<void> => {
    const payload = req.user;
    if (await this.userService.withDrawal(payload)) {
      res.sendStatus(200).end();
    } else {
      res.sendStatus(400).end();
    }
  };
}
