import {Controller, Get, Injectable, Logger} from "@nestjs/common";

@Controller('image-extractions')
export class ImageProcessingController {
    private logger: Logger = new Logger(ImageProcessingController.name)
    constructor() {
    }

    @Get('')
    processImage() {

    }

}