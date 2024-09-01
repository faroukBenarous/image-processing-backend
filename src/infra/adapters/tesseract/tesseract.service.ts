import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {ImageDetails, ImageProcessingService} from "../../../domain/services/image-processing.service";
import {FileRequest} from "../../ports/http/dto";
import {ConfigService} from "@nestjs/config";
import {createWorker, DetectResult, RecognizeResult} from "tesseract.js";

@Injectable()
export class TesseractService implements ImageProcessingService {
    private logger: Logger = new Logger(TesseractService.name);

    constructor(private configService: ConfigService) {}

    async extractImageDetails(fileImage: FileRequest): Promise<ImageDetails> {
        try {
            const fileBytes = new Uint8Array(fileImage.buffer.buffer);
            const params = {DocumentPages: [{Bytes: fileBytes}]}
            const worker = await createWorker('eng');
            const rawData = await worker.recognize(fileImage.buffer);
            await worker.terminate();
            return this.mapFields(rawData)

        } catch (err) {
            this.logger.error(`Error processing the image${err.message}`)
            throw new BadRequestException(`Error processing the image Please try a taking different picture`)
        }
    }


    private mapFields(fields: RecognizeResult): ImageDetails {
        const response: ImageDetails = {
            dateOfBirth: "",
            dateOfIssue: "",
            documentNumber: "",
            expiryDate: "",
            firstName: "",
            idType: "",
            lastName: "",
            middleName: "",
            placeOfBirth: ""
        };
        const rawText = fields.data.text;

        const dateOfBirthPattern = /Date of Birth:\s*(\d{2}\/\d{2}\/\d{4})/i;
        const expiryDatePattern = /Expiration Date:\s*(\d{2}\/\d{2}\/\d{4})/i;
        const namePattern = /^([A-Za-z]+)\s([A-Za-z]+)$/m;

        const dateOfBirthMatch = rawText.match(dateOfBirthPattern);
        if (dateOfBirthMatch) {
            response.dateOfBirth = dateOfBirthMatch[1];
        }

        const expiryDateMatch = rawText.match(expiryDatePattern);
        if (expiryDateMatch) {
            response.expiryDate = expiryDateMatch[1];
        }

        const nameMatch = rawText.match(namePattern);
        if (nameMatch) {
            response.firstName = nameMatch[1];
            response.lastName = nameMatch[2];
        }

        return response;
    }


}