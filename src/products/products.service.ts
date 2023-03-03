import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"; 
import { Product } from "./product.model";

@Injectable()
export class ProductsService{

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct(subj: string, desc: string, rate: number, teacher: string, year: string){
        const newProduct = new this.productModel({
            subj: subj, 
            description: desc, 
            rate: rate,
            teacher: teacher, 
            year: year});
        const result = await newProduct.save();
        return result.id as string;
    } 

    async getProducts(){ 
        const products = await this.productModel.find().exec();
        return products.map((prod)=> ({id: prod.id, subj: prod.subj, description: prod.description, rate: prod.rate, teacher: prod.teacher, year: prod.year}));
    } 

    async getSingleProduct(productId: string){
        const product = await this.findProduct(productId);
        return {id: product.id, subj: product.subj,  description: product.description, rate: product.rate, teacher: product.teacher, year: product.year};
    }

    async updateProduct(productId: string, subj: string, desc: string, rate: number, teacher: string, year: string){
       const updateProduct = await this.findProduct(productId);
        if (subj) {
            updateProduct.subj = subj;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (rate) {
            updateProduct.rate = rate;
        }
        if (teacher) {
            updateProduct.teacher = teacher;
        }
        if (year) {
            updateProduct.year = year;
        }
        updateProduct.save();
    }


    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({_id: prodId}).exec(); 
    }


    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
         product = await this.productModel.findById(id).exec();
        }catch(error){
            throw new NotFoundException('Could not find product');
        }
        if(!product){
            throw new NotFoundException('Could not find product');
        }
        return product; 
    }

    
}