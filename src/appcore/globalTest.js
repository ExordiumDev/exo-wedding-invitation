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
        },
        showSnackbar(state, message, color, timeout) {
            this.$store.commit('SET_SB_TO', timeout || 2000);
            this.$store.commit('SET_SB_TEXT', message);
            this.$store.commit('SET_SB_COLOR', color);
            this.$store.commit('SET_SB_SHOW', state);
        }
    }
}