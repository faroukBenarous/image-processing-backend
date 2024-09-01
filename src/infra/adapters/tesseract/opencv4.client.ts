// import {Injectable} from "@nestjs/common";
//
// const opencv4nodejs = require('opencv4nodejs');
//
// @Injectable()
// export class Opencv4Client {
//
//     public async preProcessImage(): Promise<void> {
//         // Load the image from a file or buffer
//         const imagePath = './passport.png'; // Replace with your image path or buffer
//         const originalImage = opencv4nodejs.imread(imagePath);
//
//         // Convert to grayscale
//         const grayImage = originalImage.bgrToGray();
//
//         // Apply Gaussian blur to reduce noise
//         const blurredImage = grayImage.gaussianBlur(new opencv4nodejs.Size(5, 5), 0);
//
//         // Apply thresholding (binarization)
//         const thresholdImage = blurredImage.threshold(120, 255, opencv4nodejs.THRESH_BINARY);
//
//         // Optional: Resize image to make the text more clear for Tesseract
//         const resizedImage = thresholdImage.resize(800, 600); // Adjust size based on your needs
//
//         // Save the preprocessed image (optional, for debugging
//         //cv.imwrite('./preprocessed.png', resizedImage);
//
//     }
// }