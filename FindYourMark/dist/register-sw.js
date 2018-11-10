//This is the service worker with the Cache-first network

//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
    console.log('[Find Your Mark] active service worker found, no need to register')
} else {

    //Register the ServiceWorker
    navigator.serviceWorker.register('/FindYourMark/sw.js', {
        scope: './'
    }).then(function (reg) {
        console.log('Service worker has been registered for scope:' + reg.scope);
    }).catch(function(error) {
        console.log("Error registering service worker.");
        console.log(error);
    });
}