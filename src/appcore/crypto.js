import JSEncrypt from "jsencrypt";

export function encPass(val) {
    const publicKey = import.meta.env.VITE_APP_RSA_PUBLIC.replace(/\\n/g, '\n');
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(val);
}
