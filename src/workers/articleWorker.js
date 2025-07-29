self.onmessage = function (e) {
    const { articles, page, perPage } = e.data;

    const sorted = [...articles].sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
    const start = (page - 1) * perPage;
    const paginated = sorted.slice(start, start + perPage);


    self.postMessage({
        type: 'result',
        paginated,
        total: sorted.length,
    });
};


