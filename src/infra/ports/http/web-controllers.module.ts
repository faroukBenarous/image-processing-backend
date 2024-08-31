import { Module } from '@nestjs/common';
import { WorkflowsModule } from '../../../application/workflow.module';
import { ImageProcessingController } from './image-processing.controller';

@Module({
  imports: [WorkflowsModule],
  providers: [],
  controllers: [ImageProcessingController],
})
export class WebControllersModule {}
