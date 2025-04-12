import multer from "multer";

const uploadProfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./src/upload")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

export default uploadProfile;