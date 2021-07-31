import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';


class TopPageAdvatageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

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
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvatageDto)
	advantages: TopPageAdvatageDto[];

	@IsString()
	seoText: string;

	@IsString()
	textTitle: string;

	@IsArray()
	tags: string[];
}