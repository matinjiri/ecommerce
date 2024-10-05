import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  async saveProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
  async getProductById(productId: number): Promise<Product> {
    const foundProduct = await this.productRepository.findOne({
      where: { id: productId, deletedAt: null },
    });
    if (!foundProduct) throw new NotFoundException("Product not found");
    return foundProduct;
  }
  async getProducts(take: number, skip: number): Promise<any> {
    const [products, total] = await this.productRepository.findAndCount({
      where: { deletedAt: null },
      take,
      skip,
    });
    return {
      products,
      total,
    };
  }
  async updateProduct(productId: number, product: Product): Promise<any> {
    const updatedProduct = await this.productRepository
      .createQueryBuilder()
      .update()
      .set(product)
      .where("id = :id", { id: productId })
      .returning("*")
      .execute();
    return updatedProduct.raw[0];
  }
  async softDeleteProduct(productId: number): Promise<any> {
    await this.productRepository.softDelete({ id: productId });
  }
}
