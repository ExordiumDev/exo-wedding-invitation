import * as pdfjsLib from 'pdfjs-dist'
import { getDocument, GlobalWorkerOptions, VerbosityLevel } from 'pdfjs-dist'

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString()

/**
 * @param {File} file 
 * @returns {Promise<string[]>} 
 */
export async function getPdfImages(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      try {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        let images = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const scale = 2; // skala gambar
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          //  canvas ke gambar
          images.push(canvas.toDataURL("image/png"));
        }

        resolve(images);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
  });
}

export async function convertPdfToImages(pdfUrl) {
  const images = [];
  const loadingTask = getDocument({
    url: pdfUrl,
    verbosity: VerbosityLevel.ERRORS  // hanya tampilkan ERROR saja
  });

  const pdf = await loadingTask.promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width  = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL('image/png'));
  }

  return images;
}

// test new func 

export async function convertPdfToImagesFromBlob(pdfBlob) {
  try {
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);
    const loadingTask = getDocument({
      data: pdfData,
      verbosity: VerbosityLevel.ERRORS
    });

    const pdf = await loadingTask.promise;
    const images = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;
      images.push(canvas.toDataURL('image/png'));
      console.log(' canvas ', canvas);
    }
    return images; 
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    return []
  }
}


export async function loadPdfInstance(blobUrl) {
  const loadingTask = getDocument({
    url: blobUrl,
    verbosity: VerbosityLevel.ERRORS
  });

  const pdf = await loadingTask.promise;
  return pdf;
}

export async function renderPdfPageToImage(pdf, pageNumber, scale = 2) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;

  return canvas.toDataURL('image/png');
}