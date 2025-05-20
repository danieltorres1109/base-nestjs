import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  resolvePath(folder: string, filename: string): string {
    const filePath = join(process.cwd(), 'static', folder, filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`No existe ${filename} en /static/${folder}`);
    }
    return filePath;
  }
}
