import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {ImageDetails, ImageProcessingService} from "../../../domain/services/image-processing.service";
import {FileRequest} from "../../ports/http/dto";
import * as aws from "aws-sdk";
import {ConfigService} from "@nestjs/config";
import {IdentityDocumentFieldList} from "aws-sdk/clients/textract";
import {fieldMapping} from "./utils"

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
        try {
            const fileBytes = new Uint8Array(fileImage.buffer.buffer);
            const params = {DocumentPages: [{Bytes: fileBytes}]}

            const textractClient = new aws.Textract();
            const request = textractClient.analyzeID(params)
            const data = await request.promise();
            const fields = data.IdentityDocuments[0].IdentityDocumentFields

            return this.mapFields(fields)

        } catch (err) {
            this.logger.error(`Error processing the image${err.message}`)
            throw new BadRequestException(`Error processing the image Please try a taking different picture`)
        }
    }


    private mapFields(fields: IdentityDocumentFieldList): ImageDetails {
        const response: ImageDetails = {dateOfBirth: "", expiryDate: "", firstName: "", lastName: ""}

        fields.forEach((x) => {
            const field = {
                fieldKey: x.Type.Text,
                accuracy: x.Type.Confidence,
                fieldValue: x.ValueDetection.Text,
                convertedValue: x.ValueDetection?.NormalizedValue?.Value,
                fieldValueAccuracy: x.ValueDetection.Confidence
            }
            // TODO: filter fields with low accuracy
            this.logger.debug({field})
            if (fieldMapping[field.fieldKey]) {
                const mappedKey = fieldMapping[field.fieldKey];
                response[mappedKey] = field.convertedValue || field.fieldValue;
            }
        })
        return response
    }

}