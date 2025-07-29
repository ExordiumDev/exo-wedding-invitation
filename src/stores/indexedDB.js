// indexedDB.js (utility functions)

// export async function openDatabase(storeName) {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open('dbmaster');

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const currVersion = db.version;
//       db.close();

//       const correctRequest = indexedDB.open('dbmaster', currVersion);
//       correctRequest.onupgradeneeded = (event) => {
//         const db = event.target.result;
//         if (!db.objectStoreNames.contains(storeName)) {
//           db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
//         }
//       };

//       correctRequest.onsuccess = (e) => {
//         resolve(e.target.result);
//       };

//       correctRequest.onerror = (e) => {
//         reject(e.target.error);
//       };
//     };

//     request.onerror = (e) => {
//       reject(e.target.error);
//     };
//   });
// }

export async function openDatabase(storeName) {
  return new Promise((resolve, reject) => {
    const checkRequest = indexedDB.open('dbmaster');

    checkRequest.onsuccess = (event) => {
      const oldDb = event.target.result;
      const currVersion = oldDb.version;
      const storeExists = oldDb.objectStoreNames.contains(storeName);
      oldDb.close();

      if (storeExists) {
        const request = indexedDB.open('dbmaster', currVersion);
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
      } else {
        const request = indexedDB.open('dbmaster', currVersion + 1);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
      }
    };

    checkRequest.onerror = (e) => reject(e.target.error);
  });
}

export function addItems(storeName, items) {
  console.log('adding item to indexedDB bacod ajg')
  return new Promise((resolve, reject) => {
    return openDatabase(storeName).then((db) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      let promises = items.map(item => {
        return new Promise((resolve, reject) => {
          const request = store.put(item);

          request.onsuccess = () => {
            resolve(request.result);
          };

          request.onerror = (event) => {
            reject(event.target.error);
          };
        });
      });

      Promise.all(promises)
        .then(results => {
          resolve(results);
        })
        .catch(error => {
          reject(error);
        });

      transaction.oncomplete = () => {
        db.close();
      };
    });
  });
}

export function getItems(storeName) {
  return new Promise((resolve, reject) => {
    return openDatabase(storeName).then((db) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        // console.log(request.result)
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  });
}

export async function resetDatabaseDaily(storeName) {
  const today = new Date().toISOString().split('T')[0]; // format: '2025-06-30'
  const lastRefresh = localStorage.getItem('DB_REFRESH_DATE');

  if (lastRefresh !== today) {
    const db = await openDatabase(storeName);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        localStorage.setItem('DB_REFRESH_DATE', today);
        resolve(true);
        db.close();
      };

      clearRequest.onerror = (event) => {
        reject(event.target.error);
        db.close();
      };
    });
  } else {
    // No reset needed
    return Promise.resolve(false);
  }
}


// tes