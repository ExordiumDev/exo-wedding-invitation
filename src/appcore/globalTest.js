export default { 
    data() { 
        return { 

        }
    },
    methods: {
        isImage(filePath) {
            const ext = filePath.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
        },
        isPdf(filePath) {
            const ext = filePath.split('.').pop().toLowerCase();
            return ['pdf'].includes(ext);
        },
        pushRoute(route) {
            this.$router.push(route)
        }
    }
}