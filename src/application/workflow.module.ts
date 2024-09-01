import { Module } from '@nestjs/common';
import { ImageProcessingWorkflow } from './image-processing.workflow';
import { AwsTexractModule } from '../infra/adapters/aws-textract/aws-texract.module';
import {ImageExtractionFactory} from "./image-extraction.factory";
import {ConfigModule} from "@nestjs/config";
import {TesseractModule} from "../infra/adapters/tesseract/tesseract.module";

@Module({
  imports: [ConfigModule ,AwsTexractModule, TesseractModule],
  providers: [ImageExtractionFactory, ImageProcessingWorkflow],
  exports: [ImageProcessingWorkflow],
})
export class WorkflowsModule {}
