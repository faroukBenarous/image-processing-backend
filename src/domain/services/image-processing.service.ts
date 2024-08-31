// import {FileRequest} from "../../infra/ports/http/dto";
import {Express} from "express";
import {FileRequest} from "../../infra/ports/http/dto";

export interface ImageProcessingService {
  extractImageDetails(fileImage: FileRequest): Promise<ImageDetails>;
}


export interface ImageDetails {
  firstName: string;
  lastName: string;
  expiryDate: string;
  dateOfBirth: string;
}