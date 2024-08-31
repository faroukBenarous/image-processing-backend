import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './dto';
import { ImageProcessingWorkflow } from '../../../application/image-processing.workflow';

@Controller('image-processor')
export class ImageProcessingController {
  private logger: Logger = new Logger(ImageProcessingController.name);

  constructor(@Inject() imageProcessingWorkflow: ImageProcessingWorkflow) {}

  @UseInterceptors(FileInterceptor('file'))
  @Get('/passport')
  processPassport(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log(`processImage file name ${body.name}`);
    return file.buffer.toString();
  }
}
