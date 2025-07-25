import moment from 'moment';
import MobileDetect from 'mobile-detect';

export default { 
    install(app) { 
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
            
        } 
    }
}