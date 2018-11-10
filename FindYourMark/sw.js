//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    '/FindYourMark/dist/vendor.css',
    '/FindYourMark/dist/site.css',
    '/FindYourMark/dist/vendor.js',
    '/FindYourMark/dist/main.js',
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function (evt) {
    console.log('[Find Your Mark] The service worker is being installed.');
    evt.waitUntil(precache().then(function () {
        console.log('[Find Your Mark] Skip waiting on install');
        return self.skipWaiting();
    }));
});


//allow sw to control of current page
self.addEventListener('activate', function (event) {
    console.log('[Find Your Mark] Claiming clients for current page');
    return self.clients.claim();
});

self.addEventListener('beforeinstallprompt', function(evt) {
    evt.preventDefault();
    evt.prompt();
    evt.userChoice.then(function(result) {
        if (result.outcome === 'accepted') {
            console.log("Add to home screen accepted");
        } else {
            console.log("Add to home screen dismissed");
        }
    });
});

self.addEventListener('fetch', function (evt) {
    console.log('[Find Your Mark] The service worker is serving the asset. ' + evt.request.url);
    if (evt.request.url.indexOf('https://kwidmann137.github.io') == 0) {
        evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    } else {
        console.log("Non local resource match.");
        fetch(evt.request).then(function (response) { console.log(response); });
    }
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}

function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    //this is where we call the server to get the newest version of the 
    //file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request) {
    //this is the fallback if it is not in the cache to go to the server and get it
    return fetch(request).then(function (response) { return response });
}
