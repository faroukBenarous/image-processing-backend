import {Module} from "@nestjs/common";
import {TesseractService} from "./tesseract.service";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [ConfigModule],
    providers: [TesseractService],
    exports: [TesseractService],
})
export class TesseractModule {}
