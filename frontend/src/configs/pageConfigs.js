export const pageManagementConfig = {
    title: 'Quản lý Trang CMS',
    table: {
        columns: [
            { key: 'title', label: 'Tiêu đề' },
            { key: 'slug', label: 'Slug' },
            { key: 'status', label: 'Trạng thái' },
        ],
        actions: ['edit', 'delete'],
    },
    form: {
        fields: [
            { name: 'title', label: 'Tiêu đề', type: 'text' },
            { name: 'slug', label: 'Slug', type: 'text' },
            {
                name: 'status',
                label: 'Trạng thái',
                type: 'select',
                options: ['draft', 'published'],
            },
        ],
    },
};
