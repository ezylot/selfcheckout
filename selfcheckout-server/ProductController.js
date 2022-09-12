const Product = require("./model/product");
const express =  require("express");
const path =  require("path");
const multer = require('multer');

class ProductController {

    constructor(apiPath = "") {
        this.apiPath = apiPath;
        this.imageStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "../data/images");
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
            },
        });

        this.uploadImg = multer({storage: this.imageStorage});
    }

    /**
     * @param app {Express}
     */
    apply(app) {
        app.use('/uploads', express.static(path.join(__dirname, '../data/images')));

        app.get((this.apiPath + '/products'), this.getAll);
        app.get((this.apiPath + '/products/:id'), this.get);
        app.patch((this.apiPath + '/products/:id'), this.update);
        app.patch((this.apiPath + '/products/image/:id'), this.updateImage);
        app.post((this.apiPath + '/products'), this.save);
        app.delete((this.apiPath + '/products/:id'), this.delete);
    }

    async getAll(req, res) {
        try {
            const entity = await Product.find({});
            res.status(200).send(entity);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async save(req, res) {
        console.log("test", new Date());
        const entity = new Product(req.body);
        try {
            await entity.save();
            res.status(201).send(entity);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async get(req, res) {
        try {
            const entity = await Product.findById(req.params.id);
            if (!entity) {
                return res.status(404);
            }
            res.status(200).send(entity);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req, res) {
        try {
            const entity = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!entity) {
                return res.status(404).send();
            }
            res.status(200).send(entity);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async delete(req, res) {
        try {
            const entity = await Product.findById(req.params.id);
            if (!entity) {
                return res.status(404).send();
            }
            await Product.findByIdAndDelete(req.params.id)
            return res.status(204).send()
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateImage(req, res) {
        this.uploadImg.single('image')(req, res);
        const entity = await Product.findById(req.params.id);
        entity.imageLink = "";
        await Product.update(entity);
        res.redirect("/");
    }
}

module.exports = {
    ProductController
};
