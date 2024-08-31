import {BadRequestException} from "@nestjs/common";

export const multerOptions = {
    limits: {fileSize: 5 * 1024 * 1024}, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png)$/)) {
            return cb(new BadRequestException('Only PNG files are allowed!'), false);
        }
        cb(null, true);
    },
};
