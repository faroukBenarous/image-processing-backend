import { Module } from '@nestjs/common';
import { ImageProcessingWorkflow } from './image-processing.workflow';
import { AwsTexractModule } from '../infra/adapters/aws-textract/aws-texract.module';
import {ImageExtractionFactory} from "./image-extraction.factory";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule ,AwsTexractModule],
  providers: [ImageExtractionFactory, ImageProcessingWorkflow],
  exports: [ImageProcessingWorkflow],
})
export class WorkflowsModule {}
