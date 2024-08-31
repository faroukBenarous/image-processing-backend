import {
    Body,
    Controller,
    Get,
    Inject,
    Logger,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {FileRequest, ImageDetailsResponse, SampleDto} from './dto';
import {ImageProcessingWorkflow} from '../../../application/image-processing.workflow';
import {FileValidationInterceptor} from "./interceptors/file.interceptor";
import {multerOptions} from "./interceptors/file.interceptor.config";

@Controller('image-processor')
export class ImageProcessingController {
    private logger: Logger = new Logger(ImageProcessingController.name);

    constructor(private readonly imageProcessingWorkflow: ImageProcessingWorkflow) {}

    @UseInterceptors(new FileValidationInterceptor(multerOptions))
    @Get('/passport')
    processPassport(
        @Body() body: SampleDto,
        @UploadedFile() file: FileRequest,
    ): Promise<ImageDetailsResponse> {
        this.logger.log(`processImage file name ${body.name}`);
        const response = this.imageProcessingWorkflow.extractDetailsFromPassport(file)
        return response
    }
}
