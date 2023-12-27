import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { create } from 'domain';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {};


    async createUser(createUserDto: CreateUserDTO):Promise<UserEntity> {
        const saltOrRounds = 10;

        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHash
        })

    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    } 
}
