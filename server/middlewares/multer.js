import multer from "multer";

//-> saves files to system temp directory
const upload = multer({ storage: multer.diskStorage({}) });

export default upload;
