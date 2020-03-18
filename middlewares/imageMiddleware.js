const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, next) => {
        const allowed = [
            'image/jpg',
            'image/jpeg',
            'image/png'
        ]
        if (allowed.includes(file.mimetype)) {
            next(null, true)
        } else {
            next({ messege: 'Arquivo não suportado' }, false)
        }
    }
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next()
        return
    }
    let fileExtension = req.file.mimetype.split('/')[1]
    let fileName = `${uuid.v4()}.${fileExtension}`
    req.body.photo = fileName

    let photo = await jimp.read(req.file.buffer)
    await photo.resize(300, 300)
    await photo.write(`./public/media/${fileName}`)
    next()
}