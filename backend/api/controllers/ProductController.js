const Product = require('../mongoose-models/Product');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../config/constants');
const Joi = require('joi');

module.exports = {
    /**
     * @swagger
     * api/v1/products:
     *   get:
     *     summary: Lấy danh sách sản phẩm (có tìm kiếm và phân trang)
     *     tags:
     *       - Products
     *     parameters:
     *       - name: search
     *         in: query
     *         required: false
     *         description: Từ khoá tìm kiếm theo tên sản phẩm
     *         schema:
     *           type: string
     *       - name: page
     *         in: query
     *         required: false
     *         description: Số trang (bắt đầu từ 1)
     *         schema:
     *           type: integer
     *           default: 1
     *       - name: limit
     *         in: query
     *         required: false
     *         description: Số sản phẩm mỗi trang
     *         schema:
     *           type: integer
     *           default: 10
     *     responses:
     *       200:
     *         description: Lấy danh sách sản phẩm thành công
     *       400:
     *         description: Tham số truy vấn không hợp lệ
     *       500:
     *         description: Lỗi server
     */
    findAll: async (req, res) => {
        try {
            const schema = Joi.object({
                search: Joi.string().allow('', null),
                page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
                limit: Joi.number().integer().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT)
            });

            const { error, value } = schema.validate(req.query);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Tham số truy vấn không hợp lệ',
                    error: error.details.map((e) => e.message).join(', ')
                });
            }

            const { search, page, limit } = value;
            const query = search ? { name: { $regex: search, $options: 'i' } } : {};

            const [products, total] = await Promise.all([
                Product.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit),
                Product.countDocuments(query)
            ]);

            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách sản phẩm thành công',
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                },
                data: products
            });
        } catch (err) {
            sails.log.error('Lỗi trong ProductController.findAll:', err);
            return res.status(500).json({
                success: false,
                message: 'Đã xảy ra lỗi trong khi lấy danh sách sản phẩm',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/products/{id}:
     *   get:
     *     summary: Lấy chi tiết sản phẩm theo ID
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID của sản phẩm
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lấy sản phẩm thành công
     *       400:
     *         description: ID không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    findOne: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'ID không hợp lệ',
                    error: error.details.map((e) => e.message).join(', ')
                });
            }

            const product = await Product.findById(value.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm',
                    error: `ID ${value.id} không tồn tại`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Lấy sản phẩm thành công',
                data: product
            });
        } catch (err) {
            sails.log.error('Lỗi trong ProductController.findOne:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy sản phẩm',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/products:
     *   post:
     *     summary: Tạo sản phẩm mới
     *     tags:
     *       - Products
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - price
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: Tạo sản phẩm thành công
     *       400:
     *         description: Dữ liệu gửi lên không hợp lệ
     *       500:
     *         description: Lỗi khi tạo sản phẩm
     */
    create: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().min(0).required(),
                description: Joi.string().allow('', null)
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Dữ liệu gửi lên không hợp lệ',
                    error: error.details.map((e) => e.message).join(', ')
                });
            }

            const newProduct = await Product.create(value);
            return res.status(201).json({
                success: true,
                message: 'Tạo sản phẩm thành công',
                data: newProduct
            });
        } catch (err) {
            sails.log.error('Lỗi trong ProductController.create:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo sản phẩm',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/products/{id}:
     *   put:
     *     summary: Cập nhật thông tin sản phẩm
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID của sản phẩm cần cập nhật
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Cập nhật thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    update: async (req, res) => {
        try {
            const paramSchema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const bodySchema = Joi.object({
                name: Joi.string(),
                price: Joi.number().min(0),
                description: Joi.string().allow('', null)
            }).min(1); // Cần ít nhất 1 trường để cập nhật

            const { error: paramError, value: param } = paramSchema.validate(req.params);
            if (paramError) {
                return res.status(400).json({
                    success: false,
                    message: 'ID không hợp lệ',
                    error: paramError.details.map((e) => e.message).join(', ')
                });
            }

            const { error: bodyError, value: body } = bodySchema.validate(req.body);
            if (bodyError) {
                return res.status(400).json({
                    success: false,
                    message: 'Dữ liệu cập nhật không hợp lệ',
                    error: bodyError.details.map((e) => e.message).join(', ')
                });
            }

            const updated = await Product.findByIdAndUpdate(param.id, body, { new: true });
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm để cập nhật',
                    error: `ID ${param.id} không tồn tại`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Cập nhật sản phẩm thành công',
                data: updated
            });
        } catch (err) {
            sails.log.error('Lỗi trong ProductController.update:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật sản phẩm',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/products/{id}:
     *   delete:
     *     summary: Xoá sản phẩm theo ID
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID sản phẩm cần xoá
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Xoá thành công
     *       400:
     *         description: ID không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    delete: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'ID không hợp lệ',
                    error: error.details.map((e) => e.message).join(', ')
                });
            }

            const deleted = await Product.findByIdAndDelete(value.id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm để xoá',
                    error: `ID ${value.id} không tồn tại`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Xoá sản phẩm thành công',
                data: deleted
            });
        } catch (err) {
            sails.log.error('Lỗi trong ProductController.delete:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi xoá sản phẩm',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    }
};
