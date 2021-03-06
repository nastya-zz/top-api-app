import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageDto } from './dto/top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

	async create(dto: TopPageDto): Promise<DocumentType<TopPageModel>> {
		return this.topPageModel.create(dto);
	}

	async deleteById(id: string): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: TopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findById(id: string): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findById(id).exec();
	}

	async findByCategory(dto: FindTopPageDto): Promise<DocumentType<TopPageModel[]> | []> {
		return this.topPageModel.aggregate([
			{
				$match: {
					firstCategory: dto.firstCategory
				}
			},
		]).exec();
	}

	async findByText(text: string) {
		return this.topPageModel.find({
			$text: {
				$search: text,
				$caseSensitive: false
			}
		}).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.find({ alias }).exec();
	}
}
