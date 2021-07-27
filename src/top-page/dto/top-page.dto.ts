import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { HhData, TopLevelCategory, TopPageAdvatage } from '../top-page.model';

export class TopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@Type(() => HhData)
	hh?: HhData;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvatage)
	advantages: TopPageAdvatage[];

	@IsString()
	seoText: string;

	@IsString()
	textTitle: string;

	@IsArray()
	tags: string[];
}