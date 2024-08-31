import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {ImageDetails, ImageProcessingService} from "../../../domain/services/image-processing.service";
import {FileRequest} from "../../ports/http/dto";
import * as aws from "aws-sdk";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AwsTextractService implements ImageProcessingService {
    private logger: Logger = new Logger(AwsTextractService.name);

    constructor(private configService: ConfigService) {
        const awsKey = configService.getOrThrow('AWS_ACCESS_KEY_ID')
        const awsSecret = configService.getOrThrow('AWS_SECRET_ACCESS_KEY')
        const awsRegion = configService.getOrThrow('AWS_REGION')
        aws.config.update({
            accessKeyId: awsKey,
            secretAccessKey: awsSecret,
            region: awsRegion
        });
    }

    async extractImageDetails(fileImage: FileRequest): Promise<ImageDetails> {
        const rawData = await this.extractRawData(fileImage);
        return Promise.resolve({dateOfBirth: "", expiryDate: "", firstName: "", lastName: ""})
    }

    private async extractRawData(fileImage: FileRequest) {
        try {

            const fileBytes = new Uint8Array(fileImage.buffer.buffer);
            const params = {DocumentPages: [{Bytes: fileBytes}]}

            const textract = new aws.Textract();
            const request = textract.analyzeID(params)
            const data = await request.promise();
            const fields = data.IdentityDocuments[0].IdentityDocumentFields
            fields.forEach((field) => {
                this.logger.debug({
                    fieldKey: field.Type.Text,
                    accuracy: field.Type.Confidence,
                    fieldValue: field.ValueDetection.Text,
                    convertedValue: field.ValueDetection?.NormalizedValue?.Value,
                    fieldValueAccuracy: field.ValueDetection.Confidence
                })

            })


        } catch (err) {
            this.logger.error(`Error processing the image${err.message}`)
            throw new BadRequestException(`Error processing the image Please try a taking different picture`)
        }

    }

}