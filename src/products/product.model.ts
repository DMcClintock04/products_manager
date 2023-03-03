import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    subj: { type: String, required: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },
    teacher: { type: String, required: true },
    year: { type: String, required: true },
});

export interface Product extends mongoose.Document{
   id: string;  
   subj: string;  
   description: string;  
   rate: number;
   teacher: string;
   year: string;
}