const mongoose = require('mongoose');

const PageConfigSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        config: { type: Object, required: true }, // JSON định nghĩa UI
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // 👈 Nếu bạn luôn muốn biết ai tạo
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('PageConfig', PageConfigSchema);
