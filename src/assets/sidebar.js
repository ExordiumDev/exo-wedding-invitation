
// mix.js('resources/js/sidebar-apps.js','public/js/jala-sidebar-apps.js');
// mix.version();

const { set } = require("lodash");

class sidebarAppClass {
    constructor() {
        // anonymous function
        (async () => {
            let localthis = this;
            localthis.sidebarData = await [];
            localthis.iframeId = await null; // Initialize iframeId to null
            localthis.sidebarHeader = new Headers();
            localthis.clientID = await null;
            localthis.tokenID = await null;
            localthis.authUser = await {};
            localthis.baseURL = await window.location.origin;
            localthis.currentDomain = await localthis.getDomainFromURL();
            localthis.mainDomain = await localthis.getMainDomain();
            // parentClientID for main.js profile
            localthis.parentClientID = await true;
            localthis.hostname = await (window.location.origin?.match(/:(\d+)\//) ? 'jalaera.com' : localthis.getHostname());

            await window.addEventListener('message', async (event) => {
                const eventData = await localthis.decryptData(event.data);
                const action = await eventData?.action || null;
                const param = await eventData?.param || null;
                // console.log(localthis.decryptData(event.data))
                if (action == "checkParentToken" && window.parent === window) {
                    // For child iframe to check if parent has token
                    const iframeId = await localthis.getIframeID(event.source);
                    if (localthis.sidebarHeader.has('authorization')) {
                        const headersObj = {};
                        for (let [key, value] of localthis.sidebarHeader.entries()) {
                            headersObj[key] = value;
                        }
                        event.source.postMessage(localthis.encryptData({ action: "checkParentTokenResponse", param: {headersObj:headersObj, clientID:localthis.clientID, tokenID:localthis.tokenID, iframeId:iframeId} }),'*');
                    } else {
                        event.source.postMessage(localthis.encryptData({ action: "checkParentTokenResponse", param: {headersObj:null, clientID:localthis.clientID, tokenID:localthis.tokenID, iframeId:iframeId} }),'*');
                    }
                
                } else if (action == "checkParentTokenResponse" && window.parent !== window) {
                    // For parent iframe to get token from parent
                    if (param?.headersObj?.hasOwnProperty('authorization') && param?.headersObj.authorization) {
                        await window.parent.postMessage(localthis.encryptData({action:'reqAuthUser', param:null }),'*');
                    } else {
                        localthis.clientID = await document.querySelector('meta[name="dapi_signin"]')?.content;
                        localthis.tokenID = await localthis.getCookieByName('dapi');
                        try {
                            // Initialize dapi2 first time, after that reload the page, and init again in event iframe getIframeIdResponse iframeUserNavbar
                            const curdapi2 = await new dapi2();
                            if(curdapi2 && param.iframeId == 'iframeUserNavbar') {
                                await curdapi2.init({
                                    APP_REDIRECT_SSO: 1,
                                    APP_CLIENT_ID: localthis.clientID,
                                    redirect_sso: `https://profile.${localthis.hostname}`
                                });
                                localStorage.setItem('initFirst', true);
                                if(window.vueStore){
                                    const v = await curdapi2.getAuth();
                                    await window.vueStore.dispatch(`auth/AUTH_TOKEN`, { ...v, thirdParty: curdapi2 });
                                }
                            }
                        } catch (e) {
                        }
                    }
                } else if (action == "shareToken" && window.parent === window) {
                    // For parent to get token from child iframe
                    if(await !localthis.clientID && param?.clientID) {
                        localthis.clientID = await param?.clientID || null;
                    }
                    if(await !localthis.tokenID && param?.tokenID) {
                        localthis.tokenID = await param?.tokenID || null;
                    }
                    if(await !localthis.sidebarHeader.has('authorization') && param.headersObj){
                        const headersObj = await param?.headersObj || {};
                        localthis.sidebarHeader = await new Headers();
                        for (let key in headersObj) {
                            if (headersObj.hasOwnProperty(key)) {
                                await localthis.sidebarHeader.append(key, headersObj[key]);
                            }
                        }
                    }
                    if(localthis.clientID && localthis.tokenID && localthis.sidebarHeader.has('authorization')){
                        await window.parent.postMessage(localthis.encryptData({action:'reqAuthUser', param:null }),'*');
                    }
                } else if (action == "reqAuthUser" && window.parent === window) {
                    // For child iframe to request auth user from parent
                    const iframeId = await localthis.getIframeID(event.source);
                    if (!localthis.authUser || Object.keys(localthis.authUser).length === 0) {
                        await localthis.getUserData();
                    }
                    const bgColor = await getComputedStyle(document.documentElement)
                        .getPropertyValue('--v-theme-ligthCustom')
                        .trim();
                    event.source.postMessage(localthis.encryptData({ action: "shareAuthUser", param: {authUser:localthis.authUser, bgColor:bgColor, iframeId:iframeId} }),'*');
                } else if (action == "shareAuthUser" && window.parent !== window) {
                    localthis.waitForWindowVar("vueStore", async () => {
                        localthis.authUser = await param?.authUser || {};
                        if(window.vueStore){
                            await window.vueStore.dispatch("auth/AUTH_USER", {data:localthis.authUser, status:true});
                            // await window.parent.postMessage({ action: "removeLoading", param: localthis.iframeId },'*');
                            if(param.iframeId == 'iframeUserNavbar') {
                                localthis.waitForElement("#navbar_profile_name", async (el) => {
                                    const navbarProfileName = await document.querySelector('#navbar_profile_name');
                                    if(navbarProfileName){
                                        const setWidth = await navbarProfileName.offsetWidth + 60 +'px';
                                        await window.parent.postMessage({ action: "setWidthProfileNavbar", param: {width:setWidth} },'*');
                                        if(param?.bgColor){
                                            await navbarProfileName.closest('.wrapper > div').classList.remove('bg-white');
                                            navbarProfileName.closest('.wrapper > div')?.style.setProperty('background-color', `rgb(${param.bgColor})`, 'important');
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else if (action == "logout" && window.parent === window) {
                    // For parent to logout from child iframe
                    localthis.logout();
                } else if (action === "getIframeId" && window.parent === window) {
                    // For child iframe to get its ID
                    const iframeId = await localthis.getIframeID(event.source);
                    const bgColor = await getComputedStyle(document.documentElement)
                        .getPropertyValue('--v-theme-ligthCustom')
                        .trim();
                    event.source.postMessage({ action: "getIframeIdResponse", param: {iframeId:iframeId, bgColor:bgColor} },'*');
                } else if (action == "getIframeIdResponse" && window.parent !== window) {
                    // For child iframe to know its ID
                    const params = await new URLSearchParams(window.location.search);
                    if (window.location.origin.indexOf('portal') > 0 && !params.get("code")) {
                        window.location.href = `https://profile.${localthis.hostname}`;
                    } else {
                        localthis.iframeId = param?.iframeId;
                        if (localthis.iframeId == 'jala_apps_iframe' && window.location.pathname.indexOf('/app/cdn/sidebar') < 0 && !params.get("code")) {
                            window.location.href = `https://profile.${localthis.hostname}/app/cdn/sidebar`; // Redirect to the sidebar page
                        } else if (localthis.iframeId == 'iframeUserModal'){
                            if(window.location.pathname.indexOf('/app/cdn/info/modal') < 0 && !params.get("code")){
                                window.location.href = `https://profile.${localthis.hostname}/app/cdn/info/modal`; // Redirect to the info page)
                            } else if (!params.get("code")) {
                                // window.parent.postMessage({ action: "removeLoading", param: localthis.iframeId },'*');
                            }
                        } else if (localthis.iframeId == 'iframeUserNavbar') {
                            if (window.location.pathname.indexOf('/app/cdn/info/navbar') < 0 && !params.get("code")) {
                                window.location.href = `https://profile.${localthis.hostname}/app/cdn/info/navbar`; // Redirect to the info page
                            } else if (!params.get("code")) {
                                localthis.waitForWindowVar("vueStore", async () => {
                                    localthis.authUser = await param?.authUser || {};
                                    if (localStorage.getItem('initFirst')) {
                                        try {
                                            localthis.clientID = await document.querySelector('meta[name="dapi_signin"]')?.content;
                                            localthis.tokenID = await localthis.getCookieByName('dapi');
                                            // Initialize dapi2 second time after init dapi2 first time in checkParentTokenResponse
                                            const curdapi2 = await new dapi2();
                                            await curdapi2.init({
                                                APP_REDIRECT_SSO: 1,
                                                APP_CLIENT_ID: localthis.clientID,
                                                redirect_sso: `https://profile.${localthis.hostname}`
                                            });
                                            const v = await curdapi2.getAuth();
                                            await window.vueStore.dispatch(`auth/AUTH_TOKEN`, { ...v, thirdParty: curdapi2 });
                                            const userProfile = await window.vueStore.dispatch(`auth/AUTH_GET_USER`);
                                            await window.vueStore.dispatch(`auth/AUTH_USER`, userProfile);
                                            await localStorage.removeItem('initFirst');
                                            // Set width profile
                                            if (window.vueStore.getters['auth/AUTH_USER']?.name) {
                                                localthis.waitForElement("#navbar_profile_name", async (el) => {
                                                    const navbarProfileName = await document.querySelector('#navbar_profile_name');
                                                    if(navbarProfileName){
                                                        const setWidth = await navbarProfileName.offsetWidth + 60 +'px';
                                                        await window.parent.postMessage({ action: "setWidthProfileNavbar", param: {width:setWidth} },'*');
                                                        if(param?.bgColor){
                                                            await navbarProfileName.closest('.wrapper > div').classList.remove('bg-white');
                                                            navbarProfileName.closest('.wrapper > div')?.style.setProperty('background-color', `rgb(${param.bgColor})`, 'important');
                                                        }
                                                    }
                                                });
                                            }
                                        } catch (e) {
                                            localStorage.removeItem('initFirst');
                                        }
                                    } else if (window.vueStore.getters['auth/AUTH_USER']?.name) {
                                        localthis.waitForElement("#navbar_profile_name", async (el) => {
                                            const navbarProfileName = await document.querySelector('#navbar_profile_name');
                                            if(navbarProfileName){
                                                const setWidth = await navbarProfileName.offsetWidth + 60 +'px';
                                                await window.parent.postMessage({ action: "setWidthProfileNavbar", param: {width:setWidth} },'*');
                                                if(param?.bgColor){
                                                    await navbarProfileName.closest('.wrapper > div').classList.remove('bg-white');
                                                    navbarProfileName.closest('.wrapper > div')?.style.setProperty('background-color', `rgb(${param.bgColor})`, 'important');
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        } else if (localthis.iframeId == 'jala_apps_iframe') {
                            const fileExists = await localthis.checkFileExists(`https://jalaniagaelok.web.id/files/cdn/js/jala-sidebar-apps/jala-sidebar-${localthis.hostname}.js?v=${Date.now()}`);
                            if (!fileExists) {
                                await localthis.generateJS();
                            }
                        }
                    }
                } else if (action == "removeLoading" && window.parent === window) {
                    // For parent to remove loading and show iframe
                    setTimeout(() => {
                        const loading = document.querySelector(`#${param}Loading`);
                        if (loading) {
                            loading.remove();
                        }
                        const iframe = document.querySelector(`#${param}`);
                        if (iframe) {
                            iframe.style.display = 'block';
                        }
                    }, 500);
                } else if (action == "clickProfileModal" && window.parent === window) {
                    // For parent to open profile modal
                    const iframeUserNavbar = document.querySelector('#iframeUserNavbar');
                    if (iframeUserNavbar) {
                        const parent = iframeUserNavbar?.parentElement;
                        if (parent) {
                            parent.click();
                        }
                    }
                } else if (action == "setWidthProfileNavbar" && window.parent === window) {
                    // For parent to set width profile navbar
                    const iframeUserNavbar = await document.querySelector('#iframeUserNavbar');
                    if (iframeUserNavbar) {
                        iframeUserNavbar.style.width = await param?.width || '100%';
                        iframeUserNavbar.style.height = await param?.height || '35px';
                    }
                }
            });
        })();
    }

    async getIframeID(iframeSource) {
        var iframeId = await null;
        const iframes = await document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; i++) {
            if (iframes[i].contentWindow === iframeSource) {
                // send back the ID
                iframeId = await iframes[i].id;
                break;
            }
        }
        return iframeId;
    }

    async getDomainFromURL(){
        var url = await window.location.origin;
        var match = url.match(/https?:\/\/(?:www\.)?([^\/]+)/);
        return match ? match[1] : null;
    }

    async getHostname() {
        var url = await window.location.origin;
        var match = await url.match(/https?:\/\/(?:www\.)?([^\/]+)/);
        var currentDomain = await match ? match[1] : null;
        var parts = await currentDomain.split('.');
        var hostname = await parts.slice(1).join('.'); // Join all parts except the first one
        return hostname; // Return the hostname without port
    }

    async getMainDomain() {
        var url = await window.location.origin;
        var match = await url.match(/https?:\/\/(?:www\.)?([^\/]+)/);
        var currentDomain = await match ? match[1] : null;
        var parts = await currentDomain.split('.');
        var hostname = await parts.slice(1).join('.'); // Join all parts except the first one
        var mainDomain = await `${window.location.protocol}//${hostname}`;
        var newmainDomain = await mainDomain.replace(/:\d+$/, '');
        return newmainDomain; // Return the main domain without port
    }

    encryptData(data) {
        let localthis = this;
        const secret = "your-secret-key"; // Replace with your actual secret key
        const encodedData = btoa(localthis.safeStringify(data)); // Encode data to Base64
        let encryptedData = "";
        for (let i = 0; i < encodedData.length; i++) {
            encryptedData += String.fromCharCode(encodedData.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
        }
        return btoa(encryptedData); // Return Base64 encoded encrypted data
    }

    safeStringify(obj) {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return "[Circular]"; // or skip it
            }
            seen.add(value);
          }
          return value;
        });
    }

    async decryptData(encryptedData) {
        const secret = "your-secret-key"; // Replace with your actual secret key
        let decodedData;
        try {
            decodedData = await atob(encryptedData); // Decode Base64
            let decryptedData = "";
            for (let i = 0; i < decodedData.length; i++) {
                decryptedData += String.fromCharCode(decodedData.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
            }
            return JSON.parse(atob(decryptedData)); // Return parsed JSON data
        } catch (error) {
            // decodedData = await encryptedData; // If Base64 decoding fails, use the original string
            // console.error("Invalid Base64 string:", encryptedData);
            // throw new Error("Failed to decode Base64 string");
            return encryptedData; // If Base64 decoding fails, return the original string
        }
    }

    async initAuth(){
        let localthis = this;
        // const curdapi2 = await new dapi2().catch(async(e)=>{});
        // if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
        // await curdapi2.init({APP_REDIRECT_SSO:0,APP_CLIENT_ID:'6',redirect_sso:'https://rbac.dev.jalaniagaelok.web.id:3000/login'});
        // const akses = await curdapi2.getAuth().catch(async(e)=>{
        //     throw e;
        // })
        if (await !localthis.tokenID && !localthis.clientID) {
            localthis.tokenID = await localthis.getCookieByName('dapi');
            localthis.clientID = await document.querySelector('meta[name="dapi_signin"]')?.content;
        }
        
        // if (localthis.tokenID && localthis.clientID) {
        //     await localthis.fetchToken(localthis.tokenID, localthis.clientID).then(async function(data){
        //         if (data?.access_token) {
        //             await localthis.processToken(data);
        //             localthis.parentClientID = true;
        //         }else{
        //             localthis.parentClientID = false;
        //         }
        //     }).catch(async(e)=>{
        //         localthis.parentClientID = false;
        //     });
        // }
        // else 
        try{
            const curdapi2 = await new dapi2()
            if(curdapi2){
                await curdapi2.init({
                    APP_REDIRECT_SSO: 1,
                    APP_CLIENT_ID: localthis.clientID,
                    redirect_sso: localthis.baseURL
                });
                await curdapi2.getAuth().then(async function(data){
                    if (data?.access_token) {
                        await localthis.processToken(data);
                    } else {
                        throw new Error('Invalid token data received');
                    }
                })
            }
        }catch(e){
            // throw e;
        }
        // else if (!localthis.sidebarHeader.has('authorization')) {
        //     const iframeAuthOld = await document.querySelector('iframe#iframeAuth');
        //     await iframeAuthOld?.remove();
        //     const iframeAuth = document.createElement('iframe');
        //     iframeAuth.id = 'iframeAuth';
        //     iframeAuth.src = `https://profile.${localthis.hostname}`;
        //     iframeAuth.style.display = 'none';
        //     setTimeout(async () => {
        //         const wrapperElement = await document.querySelector('.control-sidebar');
        //         wrapperElement?.appendChild(iframeAuth);
        //     }, 2500);
        //     // const errorMessage = 'Cookie "dapi" or meta tag "dapi_signin" not found or invalid';
        //     // console.log(errorMessage);
        //     // throw new Error(errorMessage);
        // }
        
        return localthis.sidebarHeader;
    }

    async getUserData() {
        let localthis = this;
        var url = await `${localthis.mainDomain}/services/account/js/dapi/dapi2.js/api/user`;
        if(localthis.mainDomain.indexOf('jalaera.com') > 0){
            url = await `${localthis.mainDomain}/services/account/js/vendor/dapi/app/dapi2.js/api/user`;
        }
        await fetch(url, {
            method: 'GET', // or 'GET', 'PUT', 'DELETE', etc.
            headers: localthis.sidebarHeader
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(async function(data){
            localthis.authUser = await data?.data || {};
            return localthis.authUser;
        }).catch(error => {
        });
    }

    async getUserData2() {
        let localthis = this;
        await fetch(`${localthis.mainDomain}/services/account/api/user`, {
            method: 'GET', // or 'GET', 'PUT', 'DELETE', etc.
            headers: localthis.sidebarHeader
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(async function(data){
            localthis.authUser = await data?.data || {};
            return localthis.authUser;
        }).catch(error => {
        });
    }

    async fetchToken(tokenId, clientId) {
        let localthis = this;
        const params = await {
            tokenId: tokenId,
            client_id: clientId,
        };

        try {
            const response = await fetch(`${localthis.mainDomain}/services/account/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            // console.error('Error fetching token:', error);
            // throw error;
        }
    }

    getCookieByName(name){
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    };

    removeAllCookies() {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

            // remove for current path
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";

            // try also with domain
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
        }
    }

    async processToken(data){
        let localthis = this;
        const {token_type, access_token} = data
        await localthis.sidebarHeader.delete('authorization');
        await localthis.sidebarHeader.delete('X-Client-Id');
        localthis.sidebarHeader.append('authorization',`${token_type} ${access_token}`);
        localthis.sidebarHeader.append('X-Client-Id',localthis.clientID);
    }

    async checkFileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error("❌ Network error:", error);
            return false;
        }
    }

    async generateJS() {
        let localthis = this;
        if (localthis.sidebarHeader.has('authorization')) {
            const requestData = {};
            await fetch(`${localthis.mainDomain}/services/account/api/apps/getlist`, {
                method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
                headers: localthis.sidebarHeader,
                body: JSON.stringify(requestData) // convert data to JSON if necessary
            }).then(async response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(async function(data){
                const curdata = await data?.data || [];
                const JalaSidebarData = await window.JalaSidebarData || {};
                const existingData = await JalaSidebarData?.getData ? JalaSidebarData.getData() : [];
                const fileExists = await localthis.checkFileExists(`https://jalaniagaelok.web.id/files/cdn/js/jala-sidebar-apps/jala-sidebar-${localthis.hostname}.js?v=${Date.now()}`);
                // console.log("File exists:", fileExists, "Current data length:", curdata.length, "Existing data length:", existingData.length);
                // remove field 'client' and 'chr' from curdata if exist
                await curdata.forEach(item => {
                    if (item.client) {
                        item.client = {
                            redirect: item.client.redirect,
                        };
                    }
                    if (item.chr) {
                        delete item.chr;
                    }
                    if (item.btnaction) {
                        delete item.btnaction;
                    }
                });
                localthis.sidebarData = await curdata;
                if (!fileExists || JSON.stringify(curdata) !== JSON.stringify(existingData)) {
                    localthis.uploadJSFile(curdata);
                }else{
                    // console.log(window.JalaSidebarData?.getData()?.length)
                }
            }).catch(error => {
                // const button_control_sidebar = document.querySelector('[data-widget="control-sidebar"]');
                // button_control_sidebar.style.display = 'none';
                // console.log(error)
            });
        }
    }

    async uploadJSFile(curdata) {
        let localthis = this;
        const jsContent = await `
            class JalaSidebarData {
                constructor(name) {
                    let localthis = this;
                    localthis.name = name;
                    // setTimeout(() => {
                    //     localthis.generateiframeHTML(localthis.getData());
                    // }, 2000);
                }
                getData() {
                    return ${JSON.stringify(curdata)};
                }
                async generateiframeHTML(data) {
                    let localthis = this;
                    const body = await document.querySelector('body');
                    const mainFooter = await document.querySelector('.main-footer');
                    const button_control_sidebar = await document.querySelector('[data-widget="control-sidebar"]');
                    const controlSidebar = await document.querySelector('.control-sidebar');
                    const sidebarContent = await document.createElement('div');
                    
                    if (controlSidebar) {
                        controlSidebar.innerHTML = '';
                    
                        if (body.classList.contains('layout-navbar-fixed') && !controlSidebar.classList.contains('position-fixed')) {
                            controlSidebar.className += ' position-fixed';
                            await controlSidebar.classList.remove('h-100');
                            if (!controlSidebar.classList.contains('h-100')) {
                                controlSidebar.className += ' h-100';
                            }
                            await controlSidebar.classList.remove('mt-4');
                            if (!controlSidebar.classList.contains('mt-4')) {
                                controlSidebar.className += ' mt-4';
                            }
                            await controlSidebar.classList.remove('pt-4');
                            if (!controlSidebar.classList.contains('pt-4')) {
                                controlSidebar.className += ' pt-4';
                            }
                        }else{
                            const navbarHeight = document.querySelector('.main-header').offsetHeight;
                            controlSidebar.style.paddingTop = \`\${navbarHeight}px\`;

                            window.addEventListener('scroll', () => {
                                if (window.scrollY === 0) {
                                    // At the top, navbar visible — add padding
                                    controlSidebar.style.paddingTop = \`\${navbarHeight}px\`;
                                } else {
                                    // Scrolled down — remove padding
                                    controlSidebar.style.paddingTop = '0';
                                }
                            });
                        }
                    }

                    const curdata = await data;
                    const categories = await Array.from(
                        new Set(curdata.map(item => JSON.stringify(item.category)))
                    ).map(jsonStr => JSON.parse(jsonStr));
                    var currentURL = await window.location.href.replace(/^https?:\\/\\//, '');
                    var sidebarAppsTop = '';
                    var sidebarAppsBottom = '';
                    categories?.forEach(element1 => {
                        sidebarAppsBottom = '';
                        sidebarAppsTop+='<div class="mb-3">'+
                            '<div class="ml-4 text-xxs text-capitalize text-bold my-1" style="color:black;">'+(element1?.name ?? 'Apps')+'</div>';
                        curdata?.filter(item => item.category?.id==element1?.id||item.category==element1)?.forEach(element2 => {
                            var baseURL = element2.client?.redirect?.split(",")[0]?.replace(/^https?:\\/\\//, '');
                            if(localthis.containsURL(element2.client?.redirect?.split(",")[0])){
                                sidebarAppsTop+='<a onmouseover="this.style.background=\\'#e9ecef\\'" onmouseout="this.style.background=\\''+(currentURL==baseURL||currentURL==baseURL+'/'?'#e9ecef':'transparent')+'\\'" class="d-flex px-3 py-2 text-decoration-none" style="color:black;'+(baseURL.indexOf(currentURL.split("/")[0]) !== -1?'background:#e9ecef;':'')+'" href="'+(localthis.containsURL(element2.client?.redirect?.split(",")[0])?element2.client?.redirect?.split(",")[0]:'javascript:void(0);')+'" target="_parent"><img src="'+(element2.icon?.icon_url?'http://jalaniagaelok.web.id/files/cdn/images/'+element2.icon?.icon_url:'https://jalaniagaelok.web.id/files/cdn/avatar/empty-photo.png')+'" onerror="this.onerror=null;this.src="\\'https://jalaniagaelok.web.id/files/cdn/avatar/empty-photo.png"\\';" alt="User Avatar" width="30" height="30" loading="lazy"><div class="ml-2 text-xxs d-flex align-items-center">'+element2.name+'</div></a>';
                            }else{
                                sidebarAppsBottom+='<a onmouseover="this.style.background=\\'#e9ecef\\'" onmouseout="this.style.background=\\''+(currentURL==baseURL||currentURL==baseURL+'/'?'#e9ecef':'transparent')+'\\'" class="d-flex px-3 py-2 text-decoration-none" style="color:black;'+(baseURL.indexOf(currentURL.split("/")[0]) !== -1?'background:#e9ecef;':'')+'" href="'+(localthis.containsURL(element2.client?.redirect?.split(",")[0])?element2.client?.redirect?.split(",")[0]:'javascript:void(0);')+'" target="_parent"><img src="'+(element2.icon?.icon_url?'http://jalaniagaelok.web.id/files/cdn/images/'+element2.icon?.icon_url:'https://jalaniagaelok.web.id/files/cdn/avatar/empty-photo.png')+'" onerror="this.onerror=null;this.src="\\'https://jalaniagaelok.web.id/files/cdn/avatar/empty-photo.png"\\';" alt="User Avatar" width="30" height="30" loading="lazy"><div class="ml-2 text-xxs d-flex align-items-center">'+element2.name+'</div></a>';
                            }
                        });
                        sidebarAppsTop+=sidebarAppsBottom;
                        sidebarAppsTop+='</div>'; 
                    });

                    const html = \`
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Jala Sidebar Apps</title>
                                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css">
                                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
                                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/overlayscrollbars/css/OverlayScrollbars.min.css">
                                <style>
                                body {
                                    background-color: #E7F3F9 !important;
                                }
                                .app-link {
                                    color: black;
                                    background: transparent;
                                }
                                .app-link:hover {
                                    background: #e9ecef !important;
                                }
                                .text-xxs {
                                    font-size: 0.75rem;
                                }
                                </style>
                            </head>
                            <body class="hold-transition sidebar-mini" style="padding-top:15px; padding-bottom:\${mainFooter?.offsetHeight ?? 0}px;">
                                \${sidebarAppsTop}
                                <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
                                <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
                            </body>
                        </html>
                    \`;

                    if (window.jQuery || typeof jQuery !== 'undefined' || typeof $ !== 'undefined') {
                        if (typeof $.fn.IFrame === 'function') {
                            console.log('✅ jQuery and IFrame plugin are loaded');

                            const jala_apps_iframe = document.createElement("div");
                            jala_apps_iframe.id = "jala_apps_iframe";

                            sidebarContent.appendChild(jala_apps_iframe);
                            if (controlSidebar) {
                                controlSidebar.appendChild(sidebarContent);
                            } else {
                                document.body.appendChild(sidebarContent);
                            }
                            
                            const blob = new Blob([html], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);

                            // 2. Initialize IFrame
                            $('#jala_apps_iframe').IFrame({
                                autoIframeMode: true,
                                loadingScreen: true,
                                autoItemActivation: true,
                                useNavbarItems: false
                            });

                            // 3. Open tab using the Blob URL
                            $('#jala_apps_iframe').data('lte.IFrame').openTab({
                                url: url,
                                title: 'Custom HTML'
                            });

                        } else {
                            await console.log('⚠️ jQuery loaded, but .IFrame() plugin is missing');
                        }
                    } else {
                        // if loading has finished, create iframe
                        if (document.readyState === 'complete' || document.readyState === 'interactive') {
                            if (controlSidebar) {
                                const jala_apps_iframe = document.createElement('iframe');
                                jala_apps_iframe.id = "jala_apps_iframe";
                                jala_apps_iframe.style.width = "100%";
                                jala_apps_iframe.style.height = "100vh";
                                jala_apps_iframe.style.border = "none";
                                jala_apps_iframe.contentWindow.document.open();
                                jala_apps_iframe.contentWindow.document.write(html);
                                jala_apps_iframe.contentWindow.document.close();
                                sidebarContent.appendChild(jala_apps_iframe);
                                controlSidebar.appendChild(sidebarContent);
                            } else {
                                const params = await new URLSearchParams(window.location.search);
                                const style = await document.createElement("style");
                                style.textContent = await \`
                                    body {
                                        background-color: #E7F3F9 !important;
                                        padding-top: 15px;
                                        padding-bottom:\${params.get("mainFooterHeight")}px;
                                    }
                                    .app-link {
                                        color: black;
                                        background: transparent;
                                    }
                                    .app-link:hover {
                                        background: #e9ecef !important;
                                    }
                                    .text-xxs {
                                        font-size: 0.75rem;
                                    }
                                \`;
                                await document.head.appendChild(style);
                                document.body.innerHTML = sidebarAppsTop;
                            }
                        }
                    }
                    if (button_control_sidebar) {
                        button_control_sidebar.style.display = 'block';
                    }
                    // Position
                    localthis.setHeightSidebar(controlSidebar,sidebarContent);
                    // Events
                    window.addEventListener('resize', () => {
                        localthis.setHeightSidebar(controlSidebar,sidebarContent);
                    });
                    window.addEventListener('scroll', () => {
                        localthis.setHeightSidebar(controlSidebar,sidebarContent);
                    });
                }

                getVisibleHeight(element) {
                    if(element) {
                        const rect = element.getBoundingClientRect(); // Get the element's position relative to the viewport
                        const windowHeight = window.innerHeight; // Height of the viewport
                        // Calculate the visible portion of the element
                        const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
                        return visibleHeight;
                    }else{
                        return 0; // If the element is not found, return 0
                    }
                }

                async setHeightSidebar(controlSidebar,sidebarContent){
                    let localthis = this;
                    var height = await document.documentElement.clientHeight-document.querySelector('.main-header')?.offsetHeight-localthis.getVisibleHeight(document.querySelector('.main-footer'))-20;
                    sidebarContent.style.height = height+"px";
                }

                containsURL(str) {
                    const urlPattern = /https?:\\/\\/[^\\s/$.?#].[^\\s]*/i; // Regular expression to match http or https
                    return urlPattern.test(str); // Returns true if a URL is found
                }
            }

            // export default JalaSidebarData;
            window.JalaSidebarData = JalaSidebarData;
        `;

        const jsFile = await new File([jsContent], `jala-sidebar-${localthis.hostname}.js`, {
            type: "application/javascript",
        });

        const formData = await new FormData();
        formData.append("file", jsFile);

        fetch(`https://api.${localthis.hostname}/sidebar/upload`, {
            method: "POST",
            headers: localthis.sidebarHeader,
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            // hard reload remove cache
            window.location.reload(true);
            // console.log("Upload successful:", result);
        })
        .catch(error => {
            // console.error("Error uploading:", error);
        });
    }

    async generateiframeUserHTML(){
        let localthis = this;
        if(window.parent === window) {
            const mainHeader = await document.querySelector('.main-header');
            const button_control_sidebar = await document.querySelector('[data-widget="control-sidebar"]');
            const parentUl = await button_control_sidebar?.closest('ul');
            const imguser1 = await document.querySelector('.main-header ul .nav-item .nav-link .img-circle');
            const navUser = await `
                <a data-toggle="dropdown" href="#" class="nav-link d-flex align-items-center p-0">
                    <div class="text-xs p-2 d-none" style="min-width:80px;" id="iframeUserNavbarLoading">Loading . . .</div>
                    <iframe id="iframeUserNavbar" scrolling="no" style="width: 0px; height: 35px; border: medium;" src="https://profile.${localthis.hostname}/app/cdn/info/navbar" width="30" height="30"></iframe>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div class="text-xs p-2 d-none" id="iframeUserModalLoading">Loading . . .</div>
                    <iframe id="iframeUserModal" scrolling="no" style="border: medium; height:160px" src="https://profile.${localthis.hostname}/app/cdn/info/modal"></iframe>
                </div>`;

            if(!imguser1) {
                if(parentUl) {
                    const elementLi = document.createElement('li');
                    elementLi.className = 'nav-item dropdown mx-lg-1 w-100 d-none d-md-flex';
                    elementLi.innerHTML = navUser;
                    // console.log('element : ', parentUl);
                    await parentUl.appendChild(elementLi);

                    const notifIcon = document.querySelector('.main-header ul .nav-item .nav-link .fa-bell');
                    const notifIconParent = notifIcon?.closest('a');
                    if (notifIconParent?.textContent?.length > 0) {
                        await notifIconParent.classList.remove('d-flex');
                        notifIconParent.classList.add('d-flex');
                    }
                } else if(mainHeader?.getElementsByTagName("header")) {
                    const navUser = await `<a data-toggle="dropdown" href="#" class="nav-link d-flex align-items-center p-0">
                        <div class="text-xs p-2 d-none" style="min-width:80px;" id="iframeUserNavbarLoading">Loading . . .</div>
                        <iframe id="iframeUserNavbar" scrolling="no" style="width: 0px; height: 35px; border: medium;" src="https://profile.${localthis.hostname}/app/cdn/info/navbar" width="30" height="30"></iframe>
                    </a>`;
                    await mainHeader?.getElementsByTagName("header")[0]?.getElementsByTagName("div")[0]?.insertAdjacentHTML('beforeend', navUser);
                }
            }else if(imguser1) {
                const parentImguser = await imguser1.closest('a');
                await parentImguser.classList.remove('d-flex');
                parentImguser.classList += ' d-flex align-items-center p-0';
                parentImguser.innerHTML = `<div class="text-xs p-2 d-none" style="min-width:80px;" id="iframeUserNavbarLoading">Loading . . .</div><iframe id="iframeUserNavbar" scrolling="no" style="width: 0px; height: 35px; border: medium;" src="https://profile.${localthis.hostname}/app/cdn/info/navbar" width="30" height="30"></iframe>`;
                const dropdownUser = await parentImguser?.nextElementSibling;
                if(dropdownUser){
                    // const iframeUserModal = await document.createElement('iframe');
                    // iframeUserModal.id = 'iframeUserModal';
                    // iframeUserModal.style.border = "none";
                    // // iframeUserModal.style.display = "none";
                    // iframeUserModal.setAttribute('scrolling', 'no');
                    // iframeUserModal.src = `https://profile.${localthis.hostname}/app/cdn/info`;
                    // dropdownUser.classList.add('animate__animated animate__slideInDown animate__faster');
                    dropdownUser.innerHTML = `<div class="text-xs p-2 d-none" id="iframeUserModalLoading">Loading . . .</div> <iframe id="iframeUserModal" scrolling="no" style="border: medium; height:160px" src="https://profile.${localthis.hostname}/app/cdn/info/modal"></iframe>`;
                    dropdownUser.className += ' p-0';
                }
            }
        }
    }

    async clickProfileModal(){
        let localthis = this;
        window.parent.postMessage(localthis.encryptData({action:'clickProfileModal'}), '*');
    }

    async generateiframeHTML(){
        let localthis = this;
        const body = await document.querySelector('body');
        const controlSidebar = await document.querySelector('.control-sidebar');
        const sidebarContent = await document.createElement('div');
        const mainFooter = await document.querySelector('.main-footer');
        
        if (controlSidebar) {
            controlSidebar.innerHTML = '';
        
            if (body.classList.contains('layout-navbar-fixed') && !controlSidebar.classList.contains('position-fixed')) {
                controlSidebar.className += ' position-fixed';
                await controlSidebar.classList.remove('h-100');
                if (!controlSidebar.classList.contains('h-100')) {
                    controlSidebar.className += ' h-100';
                }
                await controlSidebar.classList.remove('mt-4');
                if (!controlSidebar.classList.contains('mt-4')) {
                    controlSidebar.className += ' mt-4';
                }
                await controlSidebar.classList.remove('pt-4');
                if (!controlSidebar.classList.contains('pt-4')) {
                    controlSidebar.className += ' pt-4';
                }
            }else{
                const navbarHeight = document.querySelector('.main-header').offsetHeight;
                controlSidebar.style.paddingTop = `${navbarHeight}px`;

                window.addEventListener('scroll', () => {
                    if (window.scrollY === 0) {
                        // At the top, navbar visible — add padding
                        controlSidebar.style.paddingTop = `${navbarHeight}px`;
                    } else {
                        // Scrolled down — remove padding
                        controlSidebar.style.paddingTop = '0';
                    }
                });
            }

            const jala_apps_iframe = document.createElement('iframe');
            jala_apps_iframe.id = "jala_apps_iframe";
            jala_apps_iframe.style.width = "100%";
            jala_apps_iframe.style.height = "100vh";
            jala_apps_iframe.style.border = "none";
            jala_apps_iframe.src = `https://profile.${localthis.hostname}/app/cdn/sidebar?mainFooterHeight=${mainFooter?.offsetHeight || 0}`;
            sidebarContent.appendChild(jala_apps_iframe);
            controlSidebar.appendChild(sidebarContent);

            // Position
            localthis.setHeightSidebar(controlSidebar,sidebarContent);
            // Events
            window.addEventListener('resize', () => {
                localthis.setHeightSidebar(controlSidebar,sidebarContent);
            });
            window.addEventListener('scroll', () => {
                localthis.setHeightSidebar(controlSidebar,sidebarContent);
            });
        }
    }

    getVisibleHeight(element) {
        if(element) {
            const rect = element.getBoundingClientRect(); // Get the element's position relative to the viewport
            const windowHeight = window.innerHeight; // Height of the viewport
            // Calculate the visible portion of the element
            const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
            return visibleHeight;
        }else{
            return 0; // If the element is not found, return 0
        }
    }

    async setHeightSidebar(controlSidebar,sidebarContent){
        let localthis = this;
        var height = await document.documentElement.clientHeight-document.querySelector('.main-header')?.offsetHeight-localthis.getVisibleHeight(document.querySelector('.main-footer'))-20;
        sidebarContent.style.height = height+"px";
    }

    async logout() {
        let localthis = this;
        if(window.parent && window.parent !== window) {
            window.parent.postMessage(localthis.encryptData({action:'logout'}), '*');
        }else{
            // confirm first
            if (!confirm('Are you sure you want to logout?')) {
                return; // Exit if the user cancels
            }else {
                fetch(`${localthis.mainDomain}/services/account/api/user/logout`, {
                    method: 'POST',
                    headers: localthis.sidebarHeader,
                }).then(async response => {
                    if (response.ok) {
                        // Clear cookies
                        await localthis.removeAllCookies();
                        // Redirect to login page or perform any other action
                        // window.location.href = `${localthis.mainDomain}/services/account/login`;
                        window.location.reload(true); // Reload the page to reflect the logout
                    } else {
                        throw new Error(`Logout failed with status: ${response.status}`);
                    }
                }).catch(async error => {
                    // console.error('Logout error:', error);
                    // Clear cookies
                    await localthis.removeAllCookies();
                    // Redirect to login page or perform any other action
                    // window.location.href = `${localthis.mainDomain}/services/account/login`;
                    window.location.reload(true); // Reload the page to reflect the logout
                });
            }
        }
    }

    waitForElement(selector, callback) {
        function check() {
            const el = document.querySelector(selector);
            if (el) return callback(el);
            requestAnimationFrame(check);
        }
        check();
    }

    waitForWindowVar(varName, callback) {
        function check() {
            if (window[varName] !== undefined) {
                return callback(window[varName]);
            }
            requestAnimationFrame(check);
        }
        check();
    }   
    
    async initSidebarApp() {
        let localthis = this;
        if(window.parent && window.parent !== window) {
            await window.parent.postMessage(localthis.encryptData({action:'checkParentToken', param:null}), '*');
            await window.parent.postMessage(localthis.encryptData({action:'getIframeId', param:null}), '*');
            await localStorage.removeItem('initFirst');
            // console.log('This is iframe.');
        }else{
            localthis.waitForElement(".main-header", async (el) => {
                const elLoaded = await document.querySelector(".main-header");
                if (elLoaded) {
                    const style = await document.createElement("style");
                    style.textContent = await `
                        .navbar-light .navbar-nav .nav-link:focus {
                            outline: none !important;
                            border: none !important;
                        }
                        .control-sidebar, .control-sidebar:before {
                            transition: transform .3s ease-in-out, width .3s ease-in-out, right .3s ease-in-out !important;
                        }
                        .control-sidebar {
                            transition: transform 0.3s ease-in-out !important;
                        }
                    `;
                    await document.head.appendChild(style);
                    // Wait for JalaSidebarData to be available
                    localthis.generateiframeUserHTML();
                    localthis.generateiframeHTML();
                    // Initialize authentication and fetch user data
                    await localthis.initAuth();
                    localthis.getUserData();
                }
            });
            // localthis.generateJS();
            // console.log('This is not an iframe, initializing sidebar app directly.');
        }
    }
}

window.sidebarAppClass = new sidebarAppClass();
// Wait for 2 seconds before importing the JalaSidebarData module
window.onload = async function () {
    await localStorage.setItem('AdminLTE:IFrame:Options',JSON.stringify({autoIframeMode:false,autoItemActive:false}))
    window.sidebarAppClass.initSidebarApp();
    setTimeout(async () => {
        const params = await new URLSearchParams(window.location.search);
        if(window.parent === window && !params.get("code")) {
            const appElement = await document.querySelector('#app');
            // console.log("App Element:", appElement.childNodes);
            if(appElement){
                if (appElement.childNodes.length < 1) {
                    // console.log("Element is empty");
                    await window.sidebarAppClass.removeAllCookies();
                    window.location.reload(true); // Reload the page to reflect the logout
                }
            }
        } else if(window.parent === window && params.get("code")){
            const wrapper = await document.querySelector('.wrapper');
            if(wrapper){
                if (wrapper.childNodes.length < 1) {
                    console.log("Element is empty");
                    await window.sidebarAppClass.removeAllCookies();
                    window.location.reload(true); // Reload the page to reflect the logout
                }
            }
        }
    }, 4000);
}