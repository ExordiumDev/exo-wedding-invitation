import { $axPdf } from '../stores/api';
import {resetDatabaseDaily, openDatabase, getItems, addItems} from '../stores/indexedDB';
import { convertPdfToImages, convertPdfToImagesFromBlob } from '../plugins/pdfHelper';

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
        async globalLoadPdf(filePath, item, storeName) {
            if (!filePath) return;

            const isPdf = filePath.toLowerCase().includes('.pdf');
            const isImage = this.isImage(filePath); // pake method local komponen
            const fileId = filePath.split('/').pop();

            if (isPdf) {
                await resetDatabaseDaily(storeName);
                const existingCache = await getItems(storeName);
                const cached = existingCache.find(item => item.id === fileId);

                if (cached && cached.images?.length) {
                    this.allFilesImage[fileId] = cached.images;
                    return 
                }

                try {
                    const urlObj = new URL(filePath);
                    const filename = urlObj.pathname.split('/').pop();
                    const resp = await $axPdf.get(`/${filename}`);
                    const blob = resp.data;
                    const blobUrl = URL.createObjectURL(blob);

                    const images = await convertPdfToImages(blobUrl);
                    console.log('PDF converted to images:', images);
                    this.allFilesImage[fileId] = images;

                    const itemId = item?.files?.[0]?.file_path.split('/').pop() || fileId;

                    await addItems(storeName, [{
                        id: itemId,
                        path: filePath.split('/').pop(),
                        images,
                        savedAt: new Date().toISOString()
                    }]);

                    URL.revokeObjectURL(blobUrl);
                    
                } catch (e) {
                    console.error('PDF preview error', e);
                }
            } else if (isImage) {
                this.allFilesImage[fileId] = [filePath];

            }
        },
    }
}