import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
@Injectable()
export class FilesService {

	async saveFiles(files: Express.Multer.File[]): Promise<FileElementResponse[]> {
		const datefolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${datefolder}`;
		await ensureDir(uploadFolder);

		const res: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({ url: `${datefolder}/${file.originalname}`, name: file.originalname });
		}

		return res;
	}
}
