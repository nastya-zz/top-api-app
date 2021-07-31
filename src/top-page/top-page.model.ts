import { Index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvatage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base { }
@Index({ title: 'text', seoText: 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ uniq: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvatage] })
	advantages: TopPageAdvatage[];

	@prop()
	seoText: string;

	@prop()
	textTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
