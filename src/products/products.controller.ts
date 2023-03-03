import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){

    }

    @Post()
    async addProduct(
    @Body('subj') prodSubj: string, 
    @Body('description') prodDesc: string,
    @Body('rate') prodRate: number,
    @Body('teacher') prodTeacher: string,
    @Body('year') prodYear: string,
    ) {
        const generatedId = await this.productsService.insertProduct(prodSubj, prodDesc, prodRate, prodTeacher, prodYear);
        return {id: generatedId};
    }
    
    @Get()
    async getAllProducts(){
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string,){
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct (
    @Param('id') prodId: string, 
    @Body('subj') productSubj: string, 
    @Body('description') productDescription: string,
    @Body('rate') productRate: number,
    @Body('teacher') productTeacher: string,
    @Body('year') productYear: string,){
       await this.productsService.updateProduct(prodId, productSubj, productDescription, productRate, productTeacher, productYear);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string,){
        await this.productsService.deleteProduct(prodId)
        return null;
    }
}