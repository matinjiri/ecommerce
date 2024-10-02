import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({ where: { phoneNumber } });
  }
  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async verifyUser(userId: number): Promise<void> {
    await this.userRepository.update(userId, { isVerified: true });
  }
  async getProfile(userId: number): Promise<any> {
    // todo: set profile data
    return await this.getUserById(userId);
  }
}
