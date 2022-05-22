import Container, { Service } from 'typedi';
import crypto from 'crypto';
import { JwtDto, SignInDto, SignUpDto } from '../models/dto/user.dto';
import { User } from '../models/entity/user.entity';
import { CustomUserRepository } from '../models/repository/user.repository';
import { createJWT } from '../utils/jwt';

@Service()
export class UserService {
  //private userRepository = customUserRepository;
  constructor(private userRepository: CustomUserRepository) {}

  signIn = async (body: SignInDto): Promise<JwtDto | null> => {
    const { email, password } = body;
    const user = await this.userRepository.findOneExistUserByEmail(email);
    if (!user) {
      return null;
    }

    const hash = crypto.createHash('sha512').update(password).digest('hex');

    if (user.password !== hash) {
      return null;
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtDto = new JwtDto();
    jwtDto.accessToken = createJWT(payload, '5h');
    jwtDto.refreshToken = createJWT({}, '14d', 'HS512');
    return jwtDto;
  };
  signUp = async (body: SignUpDto): Promise<User | null> => {
    const result = await this.userRepository.insertUserWithHashing(body);
    console.log(result);
    if (result) {
      return result;
    } else {
      return null;
    }
  };
  signOut = async () => {
    // const sessionRepository = await getRepository(Session);
    // try {
    //   await sessionRepository.delete(req.cookies.refreshToken);
    // } catch (e) {
    //   res.status(400);
    //   return;
    // }
  };
  withDrawal = async (): Promise<boolean> => {
    return await this.userRepository.softDeleteUserById(
      'f6a2f240-1dce-41c0-b216-fa49b6395079',
    );
  };
}
