let tx;
let store;
let dbPromise = idb.open("dbMaenBal", 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains("jadwalTanding")) {
        upgradeDb.createObjectStore("jadwalTanding");
        // isObjectStore.createIndex("matches", "matches", {unique: false});
    }
    console.log("INI INIDEXXED DB");
})

const saveMatch = (id, home, away, match, group, waktu) =>{
    dbPromise.then((db) => {
        tx = db.transaction('jadwalTanding', 'readwrite');
        store = tx.objectStore('jadwalTanding');
        let item = {id:id, homeTeam:home, awayTeam: away, matchday: match, group: group, waktu:waktu};
        console.log(id, home, away, match, group, waktu);
        store.put(item, id);
        return tx.complete;
    }).then(() => {
        notif("Clicked match has been saved!");
    }).catch((e) => {
        notif("Clicked match can not been saved!");
    })
}
const deleteMatch = (id) => {
    dbPromise
    .then(db => {
        tx = db.transaction('jadwalTanding', 'readwrite')
        store = tx.objectStore('jadwalTanding')
        store.delete(id)
        return tx.complete
    })
    .then(() => {
        notif("Clicked match has been deleted");
        getSavedData()
    })
}
const showSaved = () => {
    return new Promise((resolve, reject) => {
        dbPromise
            .then((db) => {
                tx=db.transaction("jadwalTanding", "readonly");
                store = tx.objectStore("jadwalTanding");
                resolve(store.getAll());
            })
            .catch((gagal) => {
                reject(gagal);
            });
    })
}
