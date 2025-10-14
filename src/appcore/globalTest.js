import { useToast } from "vue-toastification"
export default { 
    data() { 
        return { 

        }
    },
    methods: {
        pushRoute(route) {
            this.$router.push(route)
        },
        showSnackbar(show, message, color = 'info', timeout = 3000) {
            try {
                this.snackbar.show = show
                this.snackbar.message = message
                this.snackbar.color = color
                this.snackbar.timeout = timeout
            } catch (e) {
                console.warn('Snackbar failed to show:', e)
            }
        },
        showToast(message, type = 'info', options = {}) {
            try {
                const toast = useToast()
                if (typeof toast[type] === "function") {
                    toast[type](message, options)
                } else {
                    toast.info(message, options)
                }
            } catch (e) {
                console.warn('Toast failed to show:', e)
            }
        }
    }
}