import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest{
  name: string,
  price: number,
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productsExists = await productsRepository.findByName(name);

    if (productsExists) {
      throw new AppError("esse produto já existe");
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;

  }
}

export default CreateProductService
