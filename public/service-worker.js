importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox){
  workbox.precaching.precacheAndRoute([
    {url : '/index.html', revision : '1'},
    {url : "/nav.html", revision : '1'},
    {url : "manifest.json", revision : '1'},
    {url : "pages/home.html", revision : '1'},
    {url : "pages/klasemen.html", revision : '1'},
    {url : "pages/matches.html", revision : '1'},
    {url : "pages/teams.html", revision : '1'},
    {url : "pages/saved.html", revision : '1'},
    {url : "css/materialize.min.css", revision : '1'},
    {url : "css/index.css", revision : '1'},
    {url : "js/materialize.min.js", revision : '1'},
    {url : "js/api.js", revision : '1'},
    {url : "js/idb.js", revision : '1'},
    {url : "js/nav.js", revision : '1'},
    {url : "js/notif.js", revision : '1'},
    {url : "js/index.JS", revision : '1'},
    {url : "js/database.js", revision : '1'},
    {url : "js/render.js", revision : '1'},
    {url : "js/push.js", revision : '1'},
    {url : "img/bola.png", revision : '1'},
    {url : 'fonts/Playlist Script.otf', revision : '1'},
    {url : 'fonts/Balsam.ttf', revision : '1'},
  ]);
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'pgsFLife'
      })
  );
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
      workbox.strategies.staleWhileRevalidate()
  );
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'imgFLife',
      plugins:[
        new workbox.cacheableResponse.Plugin({
          statuses : [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 3*24*60*60
        })
      ]
    })
  )



}
else{
  console.log("Workbox failed to load")
}


self.addEventListener('push', (event) =>{
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'img/bola.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});