const publicKey = "BPHOcOsOzgLuxOkUXxqRFoePcU7-uVlPFdQ9jlo6UR6Dsgr3qZsSE5KbLGyrnwvJYpqBasvIvuLtB7jIU4kjRME";
const privateKey = "BuZNow5vFyLzQ40xooXrPsUUKSQFpXlLLB4OXbq4D-U";

const izinNotif = () =>{
    if("Notification" in window){
        Notification.requestPermission()
        .then(hasil =>{
            if(hasil === "denied"){
                notif("If you do not allow notification, some feature may not working");
                return;
            }
            else if(hasil === "default"){
                notif("If you do not allow notification, some feature may not working");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then((registration) =>{
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicKey)
                }).then((subscribe) => {
                    let p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))));
                    let auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))));
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', p256dh);
                    console.log('Berhasil melakukan subscribe dengan auth key: ', auth);
                }).catch((e) => {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }

        })
    }else{
        notif("Your browser does not support notification, some feature may not working");
    }
}