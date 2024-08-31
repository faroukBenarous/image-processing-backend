import { Module } from '@nestjs/common';
import { ImageProcessingWorkflow } from './image-processing.workflow';
import { AwsTexractModule } from '../infra/adapters/aws-textract/aws-texract.module';
import { OpencvModule } from '../infra/adapters/opencv/opencv.module';
import { GoogleVision } from '../infra/adapters/google-vision/google-vision';

@Module({
  imports: [AwsTexractModule, OpencvModule, GoogleVision],
  providers: [ImageProcessingWorkflow],
  exports: [ImageProcessingWorkflow],
})
export class WorkflowsModule {}
