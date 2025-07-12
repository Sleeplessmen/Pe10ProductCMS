const Product = require('../mongoose-models/Product');

module.exports = {
    findAll: async (req, res) => {
        const products = await Product.find();
        return res.json(products);
    },
    findOne: async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.notFound({ error: 'Không tìm thấy sản phẩm' });
        }
        return res.json(product);
    },
    create: async (req, res) => {
        const newProduct = await Product.create(req.body);
        return res.status(201).json(newProduct);
    },
    update: async (req, res) => {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(updated);
    },
    delete: async (req, res) => {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Đã xoá sản phẩm' });
    }
};
