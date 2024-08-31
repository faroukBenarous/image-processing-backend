import {Injectable, Logger} from '@nestjs/common';
import {ImageDetails, ImageProcessingService} from '../domain/services/image-processing.service';
import {ImageProcessors} from '../domain/provider';
import {ImageExtractionFactory} from "./image-extraction.factory";
import {ConfigService} from "@nestjs/config";
import {Express} from "express";
import {FileRequest} from "../infra/ports/http/dto";
// import {FileRequest} from "../infra/ports/http/dto";

@Injectable()
export class ImageProcessingWorkflow {
  private logger: Logger = new Logger(ImageProcessingWorkflow.name);
  private imageExtractor: ImageProcessingService;

    constructor(private imageExtractionFactory: ImageExtractionFactory, private configService: ConfigService) {
        const provider = configService.getOrThrow<ImageProcessors>('PROVIDER')
        this.imageExtractor = imageExtractionFactory.getInstance(provider)
    }

    public async extractDetailsFromPassport(fileImage: FileRequest): Promise<ImageDetails> {
        this.logger.log(`Extracting details from passport using ${this.imageExtractor.constructor.name}`)
        const response = await this.imageExtractor.extractImageDetails(fileImage)
        return response
    }

}
