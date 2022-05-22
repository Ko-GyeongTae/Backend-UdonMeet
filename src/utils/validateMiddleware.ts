import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

type DTO<T> = new () => T;

export const validateBodyMiddleware = <T extends object>(
  dto: DTO<T>,
  message: string,
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const data = plainToClass(dto, req.body);
    validateOrReject(data, {
      whitelist: true,
      forbidNonWhitelisted: true,
    })
      .then(() => next())
      .catch(() => {
        res.status(400).json({ message }).end();
      });
  };
};

export const validateQueryMiddleware = <T extends object>(
  dto: DTO<T>,
  message: string,
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const data = plainToClass(dto, req.query);

    validateOrReject(data, {
      whitelist: true,
      forbidNonWhitelisted: true,
    })
      .then(() => next())
      .catch(() => {
        res.status(400).json({ message }).end;
      });
  };
};
