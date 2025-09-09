// function convertPdfToImagesUsingWorker(blob, fileId) {
//     return new Promise((resolve, reject) => {
//         const onMessage = (e) => {
//             if (e.data.fileId !== fileId) return;
//             pdfConvertWorker.removeEventListener('message', onMessage);
//             if (e.data.error) return reject(new Error(e.data.error));
//             resolve(e.data.images);
//         };

//         pdfConvertWorker.addEventListener('message', onMessage);
//         pdfConvertWorker.postMessage({ blobData: blob, fileId });
//     });
// }

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
    }
}