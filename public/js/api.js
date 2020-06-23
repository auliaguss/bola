const base_url = "https://api.football-data.org/v2/";
const apiKey = "293274bdf01047dfac42cbcc04d05ac2";
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
const json = response =>{
  return response.json();
}
const error = error => {
  console.log("Error : " + error);
}
const fetchApi = url => {    
  return fetch(url, {
    headers: {
      'X-Auth-Token': apiKey
    }
  });
};
const getTeams = () => {
  if("caches" in window){
    caches.match(`${base_url}competitions/2019/teams`).then((response) => {
      if (response) {
        response.json()
        .then(renderTeam)
        .then( data =>{
          tampil("listTeam", data);
        }
      )}
    })
  }
  fetchApi(`${base_url}competitions/2019/teams`)
    .then(status)
    .then(json)
    .then(renderTeam)
    .then((data) => {
      tampil("listTeam", data);
    })
    .catch(error);
}
const getTabel = () => {
  getKlasemen("2021", "tabelIng");
  getKlasemen("2002", "tabelJer");
  getKlasemen("2014", "tabelSpa");
}
const getKlasemen = (tahun, idTab) =>{
  let url = `${base_url}competitions/${tahun}/standings`;
  if("caches" in window){
    caches.match(url).then((response) => {
      if (response) {
        response.json()
        .then(renderTabel)
        .then( data =>{
          document.getElementById(idTab).innerHTML=data;
        }
      )}
    })
  }
  fetchApi(url)
    .then(status)
    .then(json)
    .then(renderTabel)
    .then((data) => {
      document.getElementById(idTab).innerHTML=data;
    })
    .catch(error);
}
const getJadwal = () => {
  let url =`${base_url}competitions/2019/matches?status=SCHEDULED`;
  if("caches" in window){
    caches.match(url).then((response) => {
      if (response) {
        response.json()
        .then(data =>{
          let semua = "";
          data.matches.slice(0, 9).forEach(jadwal => {
            let waktu= new Date(jadwal.utcDate).toLocaleString("en-id", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
            semua += renderJadwal(jadwal.id, jadwal.homeTeam.name, jadwal.awayTeam.name, jadwal.matchday, jadwal.group, waktu, "save");
          })
          return semua;
        })
        .then( data =>{
          tampil("listMatches",data);
        }
      )}
    })
  }
  fetchApi(url)
  .then(status)
  .then(json)
  .then(dataJadwal)
  .then(data =>{
    tampil("listMatches",data);
  })
  .catch(error);
}

const dataJadwal = (data) =>{
    let listMatches = "";
    data.matches.slice(0, 9).forEach(jadwal => {
      let waktu= new Date(jadwal.utcDate).toLocaleString("en-id", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
      listMatches += renderJadwal(jadwal.id, jadwal.homeTeam.name, jadwal.awayTeam.name, jadwal.matchday, jadwal.group, waktu, "save");
    })
    return listMatches;
}

const getSavedData = () => {
  let jadwalSave="";
  showSaved()
    .then(hasil => {
      hasil.forEach(data =>{
        jadwalSave += renderJadwal(data.id, data.homeTeam, data.awayTeam, data.matchday, data.group, data.waktu, "delete");
      })
      if(hasil.length == 0) jadwalSave += '<h4 class="center-align">You do not have any saved matches</h4>';
      tampil("savedMatches", jadwalSave)
      console.log(hasil)
    })
    .catch(err => console.log(err))
}