import {BadRequestException} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {NestInterceptor} from '@nestjs/common/interfaces/features/nest-interceptor.interface';

export const multerOptions = {
    limits: {fileSize: 5000_000},
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png)$/)) {
            return cb(new BadRequestException('Only PNG files are allowed!'), false);
        }
        cb(null, true);
    },
};

// Export a custom file upload interceptor
export const FileUploadInterceptor = (): NestInterceptor =>
    FileInterceptor('file', multerOptions);
