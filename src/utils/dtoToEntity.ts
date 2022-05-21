import crypto from 'crypto';

export const dtoToEntityTransformer = <T extends object, U extends object>(
  dto: T,
  entity: U,
): U => {
  if (dto['password']) {
    dto['password'] = crypto
      .createHash('sha512')
      .update(dto['password'])
      .digest('hex');
  }
  Object.keys(dto).forEach((field) => {
    entity[field] = dto[field];
  });
  return entity;
};
