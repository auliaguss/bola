document.addEventListener("DOMContentLoaded", () => {
    const loadNav = () => {
        const xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange= function() {
            if(this.readyState==4){
                if(this.status!=200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML=xhttp.responseText;
                });
                
                document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                      // Tutup sidenav
                      const sidenav = document.querySelector(".sidenav");
                      M.Sidenav.getInstance(sidenav).close();
             
                      // Muat konten halaman yang dipanggil
                      page = event.target.getAttribute("href").substr(1);
                      loadPage(page);
                    });
                  });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    const loadPage = (page) => {
        const xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
            if(this.readyState==4){
                const content=document.querySelector("#body-content");
                const home=document.querySelector("#home");
                if(this.status==200){
                    if(page === "home"){
                        content.innerHTML="";
                        home.innerHTML=xhttp.responseText;
                    }
                    else{
                        home.innerHTML="";
                        content.innerHTML=xhttp.responseText;
                    }
                    switch(page) {
                        case "klasemen":
                            getTabel();
                            break;
                        case "teams":
                            getTeams();
                          break;
                        case "matches":
                            getJadwal();
                           break;
                        case "saved":
                            getSavedData();
                           break;
                        default:
                          // code block
                    }
                } else if(this.status==404){
                    content.innerHTML=`<p>Halaman Tidak Ditemukan</p>`;
                }else{
                    content.innerHTML=`<p>Ooops! O.o Halaman Tidak Diakses</p>`;
                }
                $(content).ready(() =>{
                    $('.collapsible').collapsible();
                  })
            }
        };
        xhttp.open("GET", "pages/"+page+".html", true);
        xhttp.send();
    };

    const elems=document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();    
    let hlm=window.location.hash.substr(1);
    if(hlm === "") hlm="home";
    loadPage(hlm);
});