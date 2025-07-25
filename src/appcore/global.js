import moment from 'moment';
import MobileDetect from 'mobile-detect';

export default { 
    install(app) { 
        let scrollInterval = null;
        let isDragging = false;
        let scrollLeftStart = 0
        let hasDragged = false;
        let startX = 0;

        app.config.globalProperties.$appInfo =  {
            appName:import.meta.env.VITE_APP_NAME,
            appVersion:import.meta.env.VITE_APP_VERSION,
            appMode:import.meta.env.VITE_APP_ENV,
            baseURL:import.meta.env.VITE_APP_URL,
            portalURL:import.meta.env.VITE_APP_PORTAL_URL,
            ftpURL:import.meta.env.VITE_APP_URL_FTP,
            baseAPI:import.meta.env.VITE_APP_API_URL,
            clientID:import.meta.env.VITE_CLIENT_ID,
            clientRedirect:import.meta.env.VITE_CLIENT_REDIRECT,
            formatDate:'DD-MM-YYYY HH:mm:ss',
            appMD: new MobileDetect(window.navigator.userAgent)
        };
        app.config.globalProperties.$parseValidationErrors = (errors) => {
            const result = {};
            (errors || [] ).forEach(err => { 
                const field = err.loc?.[1];
                if (field) result[field] = err.msg
            });
            return result
        };
        app.config.globalProperties.$bacod = ()=>{ 
            console.log('global bacods');
        };
        app.config.globalProperties.$date_format = (date, format)=> {
            return date ? moment(date).format(format) : '-';
            
        };
        app.config.globalProperties.$scrollLeftOnce = (el, scrollAmount = 100, dir) => {
            var offset = dir === 'left' ? -scrollAmount : scrollAmount;
            el.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }
        app.config.globalProperties.$scrollHold = () => {
            this.scrollInterval = setInterval(() => {
                this.$refs.scrollContainer.scrollBy({
                    left: -this.scrollAmount,
                    behavior: 'smooth'
                });
            }, 250);
        };
        app.config.globalProperties.$startScroll = (el, dir, scrollAmount = 10, delay = 20) => {
            if (scrollInterval) clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                const offset = dir === 'left' ? -scrollAmount : scrollAmount;
                el.scrollBy({
                    left: offset,
                    behavior: 'auto'
                });
            }, delay);
        };
        app.config.globalProperties.$stopScroll = () => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
        };
        app.config.globalProperties.$startDrag = (e, el) => { 
            isDragging = true;
            hasDragged = false;
            startX = e.pageX - el.offsetLeft;
            scrollLeftStart = el.scrollLeft;
        };
        app.config.globalProperties.$onDrag = (e, el) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) {
                hasDragged = true;
            }
            el.scrollLeft = scrollLeftStart - walk;
        };
        app.config.globalProperties.$stopDrag = () => {
            isDragging = false;
        }
        app.config.globalProperties.$handleClick = function(e, categoryId) { 
            if(hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            this.findCategory(categoryId);
        } 
    }
}