import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageDto } from './dto/top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService) { }

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: TopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);

		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}

		return page;
	}

	@Get()
	async getAll() {
		const pages: TopPageModel[] = await this.topPageService.findAll();
		return pages;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.deleteById(id);

		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}

		return page;
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		const page = await this.topPageService.updateById(id, dto);

		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}

		return page;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto);
	}

	@HttpCode(200)
	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}

	@HttpCode(200)
	@Get('findByAlias/:alias')
	async findByAlias(@Param('alias') alias: string) {
		return this.topPageService.findByAlias(alias);
	}

}
