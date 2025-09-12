class Dapi2Helper {
    constructor() {
        this.instance = null;
        this.initialized = false;
    }

    async init(config = {}) {
        if (this.initialized) {
            console.log("Dapi2 already initialized");
            return this.instance;
        }

        return new Promise(async (resolve, reject) => {
            try {
                // pastikan script sudah ada
                if (typeof window.dapi2 === "undefined") {
                    console.error("dapi2 script not loaded yet!");
                    reject(new Error("dapi2 not loaded"));
                    return;
                }

                this.instance = new window.dapi2();
                await this.instance.init({
                    APP_REDIRECT_SSO: config.APP_REDIRECT_SSO || import.meta.env.VITE_APP_REDIRECT_SSO,
                    APP_CLIENT_ID: config.APP_CLIENT_ID || import.meta.env.VITE_APP_CLIENT_ID,
                    redirect_sso: config.redirect_sso || import.meta.env.VITE_APP_REDIRECT_SSO,
                });

                this.initialized = true;
                resolve(this.instance);
            } catch (err) {
                reject(err);
            }
        });
    }

    getInstance() {
        if (!this.initialized) {
            throw new Error("Dapi2 not initialized yet! Call init() first.");
        }
        return this.instance;
    }
}

const dapi2Helper = new Dapi2Helper();
export default dapi2Helper;
