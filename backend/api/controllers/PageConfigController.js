const PageConfig = require('../mongoose-models/PageConfig');

module.exports = {
    // GET /api/v1/page-configs
    findAll: async (req, res) => {
        try {
            const pages = await PageConfig.find()
                .sort({ updatedAt: -1 })
                .populate('createdBy', 'email'); // Populate thông tin người tạo
            return res.status(200).json(pages);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    // GET /api/v1/page-configs/:slug
    findOne: async (req, res) => {
        try {
            const page = await PageConfig.findOne({ slug: req.params.slug })
                .populate('createdBy', 'email');
            if (!page) return res.status(404).json({ message: 'Không tìm thấy page' });
            return res.status(200).json(page);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    // POST /api/v1/page-configs
    create: async (req, res) => {
        try {
            const { title, slug, config } = req.body;

            if (!title || !slug || !config) {
                return res.status(400).json({ message: 'Thiếu dữ liệu: title, slug hoặc config' });
            }

            const exists = await PageConfig.findOne({ slug });
            if (exists) {
                return res.status(400).json({ message: 'Slug đã tồn tại' });
            }

            const newPage = new PageConfig({
                title,
                slug,
                config,
                createdBy: req.user?._id, // 👈 Giả định middleware auth đã gán req.user
            });

            const saved = await newPage.save();
            return res.status(201).json(saved);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    // PUT /api/v1/page-configs/:slug
    update: async (req, res) => {
        try {
            const updated = await PageConfig.findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            );
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy page để cập nhật' });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    // DELETE /api/v1/page-configs/:slug
    delete: async (req, res) => {
        try {
            const deleted = await PageConfig.findOneAndDelete({ slug: req.params.slug });
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy page để xoá' });
            return res.status(200).json({ message: '✅ Đã xoá thành công' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
