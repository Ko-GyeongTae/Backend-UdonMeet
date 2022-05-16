import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/public/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  testing = async () => {
    const data = await this.userRepository.find();
    // const data = await this.userRepository.query('SELECT * FROM user');
    console.log(data);
    const _data = await this.userRepository.update(
      { name: '홍길동' },
      { name: '홍석천' },
    );
    return _data;
  };
}
