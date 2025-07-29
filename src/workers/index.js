export const workerArticle = new Worker(
    new URL('./articleWorker.js', import.meta.url)
);