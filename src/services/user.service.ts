import Container, { Service } from 'typedi';
import { customUserRepository } from '../loaders/container';
import { SignInDto, SignUpDto } from '../models/dto/user.dto';
import { CustomUserRepository } from '../models/repository/user.repository';

@Service()
export class UserService {
  private userRepository = customUserRepository;

  async signIn(body: SignInDto) {
    const { email, password } = body;
    return await this.userRepository.findOneExistUserByEmail(email);
  }
  async signUp(body: SignUpDto) {
    if (!(await this.userRepository.findOneExistUserByEmail(body.email))) {
      return new Error('Email is already Exist');
    }
    const res = await this.userRepository.insertUserWithHashing(body);
    console.log(res);
    return res;
  }
  async signOut() {
    return 'hello';
  }
  async withDrawal() {
    return 'hello';
  }
}
