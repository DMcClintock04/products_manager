import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [MongooseModule.forFeature()],
    controllers: [ProductsController],
   providers: [ProductsService],
})
export class ProductsModule{}