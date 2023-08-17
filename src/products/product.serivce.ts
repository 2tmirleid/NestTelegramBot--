import { Injectable } from '@nestjs/common';
import { Products } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async getCatalog() {
    return await this.productRepository.find();
  }

  async getProductById(id) {
    return await this.productRepository.findOneBy({ id });
  }
}
