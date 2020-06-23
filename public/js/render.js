const renderJadwal = (id, homeTeam, awayTeam, matchday, group, waktu, act) =>{
    let dataJadwal = "";
    let tombol = "";
    if(act === "delete"){
      tombol = `<a onclick="deleteMatch('${id}', '${homeTeam}', '${awayTeam}', '${matchday}', '${group}', '${waktu}')" id="saveMatch">Delete From The List</a>`
    }
    else{
      tombol = `<a onclick="saveMatch('${id}', '${homeTeam}', '${awayTeam}', '${matchday}', '${group}', '${waktu}')" id="saveMatch">Save The Date</a>`
    }
    dataJadwal += `
      <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-content white">
            <span class="card-title center">${homeTeam} VS ${awayTeam}</span>
            <p>
            Matchday : ${matchday}<br/>
            Group : ${group}<br/>
            Kick Off : ${waktu}
            </p>
        </div>
        <div class="card-action black">
          ${tombol}
        </div>
      </div>
    </div>`
    return dataJadwal;
}
const renderTeam = data => {
    let dataTeams = "";
    data = data.teams
    data.forEach(team => {
      let urlTeamImage = team.crestUrl
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
      dataTeams +=`
      <div class="col s12 m6 l4">
        <div class="card">
          <div class="card-image">
            <img src="${urlTeamImage}" class="responsive-img" alt="${team.name}">
          </div>
          <div class="card-content black">
              <span class="card-title">${team.name}</span>
              <p><b>Venue</b> : ${team.venue}</p>
              <p><b>Address</b> : ${team.address}</p>
              <p><b>Founded At</b> : ${team.founded}</p>
              <p><b>Phone</b> : ${team.phone}</p>
              <p><b>Email</b> : ${team.email}</p>
              <p><b>Website</b> :<a href="${team.website}" target="_blank">${team.website}</a></p>
          </div>
        </div>
      </div>`;
    })
    return dataTeams;
  }
const renderTabel = data => {
  let dataKlasemen=""
  data = data.standings[0].table
  data.forEach( (tim)=> {
    let urlTeamImage = tim.team.crestUrl
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
    dataKlasemen+= `
     <tr>
      <td>
     <a>
     <p class="hide-on-small-only">
       <img alt="${tim.team.name}" class="responsive-img logoClub" src="${ tim.team.crestUrl || '/images/no-image.png'}">  ${tim.team.name}
      </p>
     </a>
      <a>
       <p class="hide-on-med-and-up">
       <img alt="${tim.team.name}" class="responsive-img logoClub" src="${ tim.team.crestUrl || '/images/no-image.png'}">
      </p>
     </a>
     </td>
     <td>${tim.playedGames}</td>
        <td>${tim.won}</td>
        <td>${tim.draw}</td>
        <td>${tim.lost}</td>
        <td><b>${tim.points}</b></td>
      </tr>
        `;
  });
  let tabelAja= `
    <table class="highlight responsive-table" style="max-height: 100px; overflow-x: auto; overflow-y: auto;">
      <thead>
        <tr>
          <th>CLUB</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>POINTS</th>
        </tr>
      </thead>
      <tbody>
        ${dataKlasemen}
      </tbody>
    </table>`;
  return tabelAja;
}

const tampil = (id, data) => {
  document.getElementById("loading").style.display="none";
  document.getElementById(id).innerHTML=data;
}

const notif = (pesan) => {
  M.toast({html: pesan});
}