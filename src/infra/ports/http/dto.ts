import {Express} from "express";

export class SampleDto {
  name: string;
}

export type FileRequest = Express.Multer.File

export interface ImageDetailsResponse {
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