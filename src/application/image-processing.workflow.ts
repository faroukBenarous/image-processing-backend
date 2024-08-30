import {Injectable} from "@nestjs/common";
import {ImageProcessingService} from "../domain/services/image-processing.service";
import {ImageProcessors} from "../domain/provider";


@Injectable()
export class ImageProcessingWorkflow {
    private imageProcessors: Map<string, ImageProcessingService>;
    constructor() {
        this.imageProcessors = new Map<ImageProcessors, ImageProcessingService>();
    }

}