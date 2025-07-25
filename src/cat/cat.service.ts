import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/core/auth/decorators';
import { ValidRoles } from 'src/core/auth/interfaces';

@Injectable()
export class CatService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  // @Auth(ValidRoles.admin)
  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  async findAll() {
    return this.catRepository.find();
  }

  async findOne(id: number) {
    const cat = this.catRepository.findOne({ where: { id: id } });
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catRepository.preload({ id, ...updateCatDto });
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return this.catRepository.save(cat);
  }

  async remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
