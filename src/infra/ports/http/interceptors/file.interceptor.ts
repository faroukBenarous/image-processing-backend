import {BadRequestException, CallHandler, ExecutionContext, Injectable, Type} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {NestInterceptor} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import {Observable} from "rxjs";

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
    constructor(private readonly options: MulterOptions) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        const fileInterceptor = new (FileInterceptor('file', this.options))();
        return fileInterceptor.intercept(context, next);
    }
}