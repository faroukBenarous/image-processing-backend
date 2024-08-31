import {FileRequest} from "../../infra/ports/http/dto";

export interface ImageProcessingService {
  extractImageDetails(fileImage: FileRequest): Promise<ImageDetails>;
}


export interface ImageDetails {
  firstName?: string;
  lastName?: string;
  middleName?: string
  idType?: string
  placeOfBirth?: string;
  dateOfIssue?: string;
  documentNumber?: string
  expiryDate: string;
  dateOfBirth: string;
}