import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAddressDto } from "src/common/dtos/user/create-address.dto";
import { UpdateAddressDto } from "src/common/dtos/user/update-address.dto";
import { User } from "src/database/entities/user.entity";
import { UserAddress } from "src/database/entities/user_address.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>
  ) {}
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({ where: { phoneNumber } });
  }
  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
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
  async getAddressById(
    userId: number,
    addressId: number
  ): Promise<UserAddress> {
    const address = await this.userAddressRepository.findOne({
      where: { id: addressId, user: { id: userId }, deletedAt: null },
    });
    if (!address) {
      throw new NotFoundException("Address not found");
    }
    return address;
  }
  async getAddresses(userId: number): Promise<UserAddress[]> {
    return this.userAddressRepository.find({ where: { user: { id: userId } } });
  }
  async createAddress(
    userId: number,
    createAddressDto: CreateAddressDto
  ): Promise<UserAddress> {
    return await this.userAddressRepository.save<UserAddress>({
      address: createAddressDto.address,
      title: createAddressDto.title,
      user: { id: userId },
    } as UserAddress);
  }
  async softDeleteAddress(userId: number, addressId: number): Promise<void> {
    await this.userAddressRepository.softDelete({
      user: { id: userId },
      id: addressId,
    });
  }
  async updateAddress(
    userId: number,
    addressId: number,
    updateAddressDto: UpdateAddressDto
  ): Promise<UserAddress> {
    const newUserAddress = {
      address: updateAddressDto.address,
      title: updateAddressDto.title,
    } as UpdateAddressDto;
    const updatedUserAddress = await this.userAddressRepository
      .createQueryBuilder()
      .update()
      .set(newUserAddress)
      .where("id = :id and userId = :userId", { id: addressId, userId })
      .returning("*")
      .execute();
    return updatedUserAddress.raw[0];
  }
}
