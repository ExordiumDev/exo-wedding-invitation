// Vuetify setup
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa-svg'
import '@fortawesome/fontawesome-free/css/all.css'


const vuetify = createVuetify({ 
    components, 
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            fa
        }
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#ffffff',
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    danger: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    lightCustom: '#F2F9FF',
                    customFooterLight: '#344450',
                    customFooterDark: '#142129',
                    exr_accent_orange_950: '#431407',
                    exr_accent_orange_900: '#7c2d12',
                    exr_accent_orange_800: '#9a3412',
                    exr_accent_orange_700: '#c2410c',
                    exr_accent_orange_600: '#ea580c',
                    exr_accent_orange_500: '#f97316',
                    exr_accent_orange_400: '#fb923c',
                    exr_accent_orange_300: '#fdba74',
                    exr_accent_orange_200: '#fed7aa',
                    exr_accent_orange_100: '#ffedd5',
                    exr_accent_orange_50: '#fff7ed',
                }
            }
        }
    },
 });

export default vuetify;