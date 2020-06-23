let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPHOcOsOzgLuxOkUXxqRFoePcU7-uVlPFdQ9jlo6UR6Dsgr3qZsSE5KbLGyrnwvJYpqBasvIvuLtB7jIU4kjRME",
   "privateKey": "BuZNow5vFyLzQ40xooXrPsUUKSQFpXlLLB4OXbq4D-U"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eUwW_k12JhM:APA91bFKdu91CnZyfEoqqtFizhUADnBwSD44Ifq2afubW45fjWlp1nzRF0WQvmWO7REOQP7cnAEa_TJyieyDL_6yd6QgmUWGnHxISgu6Y4iJB9mu_AzR76bQDGLLA2lfOHQOjlG0LcEF",
   "keys": {
       "p256dh": "BP1O29t6bKXr/QPE3ygfQnLqsxQxL4FsRsHLYfy1uOM4aAxSAfaLtd4BzxElL+Rjk+tv1IGjUVieKuk17DAQgn4=",
       "auth": "DlNE+k/bd0Dwr2kn6g+yfQ=="
   }
};
let payload = 'Horray! Our PWA can receive any push notification now!';
 
const options = {
   gcmAPIKey: '936213608897',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);