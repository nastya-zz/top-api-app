import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { FindProductDto } from './dto/find-product.dto';
import { ProductController } from './product.controller';
import { ProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }

	async create(dto: ProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: ProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return this.productModel.aggregate([
			{
				$match: {
					categories: dto.category
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: dto.limit
			},
			{
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewCount: {
						$size: '$reviews',
					},
					reviewAvg: {
						$avg: '$reviews.rating'
					},
					reviews: {
						$function: {
							body: `function (reviews) {
								return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							}`,
							args: ['$reviews'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as (ProductModel & { review: ReviewModel, reviewCount: number, reviewAvg: number })[];
	}
}
