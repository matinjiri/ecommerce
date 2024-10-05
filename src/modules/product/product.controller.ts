import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { Product } from "src/database/entities/product.entity";
import { RoleGuard } from "../auth/guards/role.guard";
import { Roles } from "src/common/decorators/user/roles.decorator";
import { JwtAccessTokenGuard } from "../auth/guards/jwt-access.guard";

@ApiTags("product")
@ApiBearerAuth("Authorization")
@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}
  @Roles("admin")
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Post()
  async saveProduct() {
    return await this.productService.saveProduct({} as Product);
  }
  @Get(":productId")
  async getProduct(@Param("productId") productId: number) {
    return await this.productService.getProductById(productId);
  }
  @Get()
  async getProducts(@Query("take") take: number, @Query("skip") skip: number) {
    return await this.productService.getProducts(take, skip);
  }
  @Roles("user")
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Patch(":productId")
  async updateAddress(@Param("productId") productId: number) {
    return await this.productService.updateProduct(productId, {
      name: "Tablet",
    } as Product);
  }
  @Roles("admin")
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Delete(":productId")
  async deleteAddress(@Param("productId") productId: number) {
    return await this.productService.softDeleteProduct(productId);
  }
}
