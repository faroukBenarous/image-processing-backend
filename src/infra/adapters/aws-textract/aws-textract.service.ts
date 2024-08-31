import {Injectable, Logger} from "@nestjs/common";
import {ImageDetails, ImageProcessingService} from "../../../domain/services/image-processing.service";
import {AnalyzeIDCommand, TextractClient} from "@aws-sdk/client-textract";
import {Express} from "express";
import {FileRequest} from "../../ports/http/dto";

@Injectable()
export class AwsTextractService implements ImageProcessingService {
    private logger: Logger = new Logger(AwsTextractService.name);

    async extractImageDetails(fileImage: FileRequest): Promise<ImageDetails> {
        return Promise.resolve( {dateOfBirth: "", expiryDate: "", firstName: "", lastName: ""})
    }

    private async main() {
        const textractClient = new TextractClient();

        const analyseIdDocument = new AnalyzeIDCommand({DocumentPages: [{Bytes: Uint8Array.from([])}]});

        // Textract returns a list of blocks. A block can be a line, a page, word, etc.
        // Each block also contains geometry of the detected text.
        // For more information on the Block type, see https://docs.aws.amazon.com/textract/latest/dg/API_Block.html.
        const response = await textractClient.send(analyseIdDocument);


        this.logger.log({response})
        // // For the purpose of this example, we are only interested in words.
        // const extractedWords = Blocks.filter((b) => b.BlockType === "WORD").map(
        //     (b) => b.Text,
        // );
        //
        // return extractedWords.join(" ");
    }

}