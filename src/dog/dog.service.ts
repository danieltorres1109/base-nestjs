import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogService {
  // Injecting the DogRepository is not necessary in this case, as we are not using it in the service methods.
  constructor(@InjectRepository(Dog) private dogRepository: Repository<Dog>) {}

  async create(createDogDto: CreateDogDto) {
    const dog = this.dogRepository.create(createDogDto);
    await this.dogRepository.save(dog);
    return dog;
  }

  async findAll() {
    return this.dogRepository.find();
  }

  findOne(id: number) {
    return this.dogRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    await this.dogRepository.update(id, updateDogDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
