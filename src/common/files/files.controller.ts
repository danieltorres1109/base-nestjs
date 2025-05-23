import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request } from 'express';
import { join, extname } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { FilesService } from './files.service';

// Generador de nombres únicos
const filenameFactory = (
  _req: Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  const base = file.originalname
    .replace(/\s+/g, '_')
    .replace(extname(file.originalname), '');
  const fileExt = extname(file.originalname);
  cb(null, `${base}-${Date.now()}${fileExt}`);
};

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly config: ConfigService,
  ) {}

  /**
   * 📥 Descarga: GET /files/:folder/:filename
   */
  @Get(':folder/:filename')
  download(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const path = this.filesService.resolvePath(folder, filename);
    res.sendFile(path);
  }

  /**
   * 📤 Subida genérica: POST /files/:folder
   */
  @Post('upload/:folder')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, _file, cb) => {
          const folder = req.params.folder;
          const full = join(process.cwd(), 'static', folder);
          if (!fs.existsSync(full)) {
            fs.mkdirSync(full, { recursive: true });
          }
          cb(null, full);
        },
        filename: filenameFactory,
      }),
      limits: {
        fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
      },
    }),
  )
  upload(
    @Param('folder') folder: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Archivo inválido o demasiado grande');
    }

    // Construye la URL usando HOST_API de .env (fallback a localhost)
    const host = this.config.get<string>('HOST_API') || 'http://localhost:3000';
    const url = `${host}/files/${folder}/${file.filename}`;
    return { url };
  }
}
