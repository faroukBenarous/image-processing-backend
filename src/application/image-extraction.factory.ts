import { Injectable } from '@nestjs/common';
import {ImageProcessors} from "../domain/provider";
import {AwsTextractService} from "../infra/adapters/aws-textract/aws-textract.service";
import {ModuleRef} from "@nestjs/core";
import {ImageProcessingService} from "../domain/services/image-processing.service";

@Injectable()
export class ImageExtractionFactory {
  private adapterMapping = {
    [ImageProcessors.AWS_TEXTRACT]: AwsTextractService,
  };

  constructor(private moduleRef: ModuleRef) {}

  getInstance(adapter: ImageProcessors): ImageProcessingService {
    if (!this.adapterMapping[adapter]) {
      return null;
    }

    return this.moduleRef.get(this.adapterMapping[adapter], { strict: false });
  }
}
