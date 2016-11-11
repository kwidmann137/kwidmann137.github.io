
var map;
var bounds;
var defaultFeaturedIcon;
var selectedFeaturedIcon;
var defaultIcon;
var selectedIcon;
var largeInfoWindow;

function initMap(){
    window.onload = function(){
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 29.494119, lng: -98.705823},
          zoom: 12
        });
        bounds = new google.maps.LatLngBounds();

        //variables for markers
        defaultFeaturedIcon = './images/featuredIcon.png';
        selectedFeaturedIcon = './images/selectedIcon.png';
        defaultIcon = './images/defaultIcon.png';
        selectedIcon = './images/selectedIcon.png';
        largeInfoWindow = new google.maps.InfoWindow();

        //add featured locations
        createFeaturedLocation("Golf Club of Texas, San Antonio, TX");
        createFeaturedLocation("Lone Star Crossfit, San Antonio, TX");
        createFeaturedLocation("Top Golf, San Antonio, TX");
        createFeaturedLocation("K1 Speed, San Antonio, TX");
        createFeaturedLocation("Mission San Jose Church, San Antonio, TX");
        createFeaturedLocation("The Alamo, San Antonio, TX");
        createFeaturedLocation("Government Canyon, San Antonio, TX");
    }
}

function createFeaturedLocation(locationKeyword){
    var request ={
        query: locationKeyword,
        bounds: map.getBounds()
    }
    var allResults = [];

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[i].geometry.location,
                name: results[i].name,
                animation: google.maps.Animation.DROP,
                id: results[i].place_id,
                icon: defaultFeaturedIcon,
            });
            marker.addListener('click', function(){
                populateInfoWindow(this, largeInfoWindow);
            });
            //get yelp info for this result
            yelpSearch("San Antonio", results[i].name, results[i], marker, "featured");
            bounds.extend(results[i].geometry.location)
        }
      }
      map.fitBounds(bounds);
    }
}

function mapSearch(searchKeyword){
    var request ={
        query: searchKeyword,
        bounds: map.getBounds()
    }
    var allResults = [];

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {

            var marker = new google.maps.Marker({
                map: map,
                position: results[i].geometry.location,
                name: results[i].name,
                animation: google.maps.Animation.DROP,
                id: results[i].place_id,
                icon: defaultIcon,
            });
            marker.addListener('click', function(){
                populateInfoWindow(this, largeInfoWindow);
            });
            yelpSearch("San Antonio", results[i].name, results[i], marker, "search");
            bounds.extend(results[i].geometry.location)
        }
      }
      map.fitBounds(bounds);
    }
}

function makeMarkerIcon(markerColor){
    var markerImage = new google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(21,34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

function mapClearMarker(marker){
    marker.setMap(null);
}

function mapSetMarker(marker){
    marker.setMap(map);
    bounds.extend(marker.position);
    map.fitBounds(bounds);
}

function mapAnimateMarker(marker, type){
    //here is where we will change the icon if that list item is clicked
    if(type == "search"){
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setIcon(selectedIcon);
        setTimeout(function(){
            marker.setAnimation(null);
            marker.setIcon(defaultIcon);
        }, 3000);
    }else if(type == "featured"){
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setIcon(selectedFeaturedIcon);
        setTimeout(function(){
            marker.setAnimation(null);
            marker.setIcon(defaultFeaturedIcon);
        }, 3000);
    }
}


function populateInfoWindow(marker, infoWindow){
    if(infoWindow.marker != marker){
        infoWindow.marker = marker;
        infoWindow.setContent('<div>'+marker.name+'</div>');
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function(){
            this.marker = null;
        }, infoWindow);
    }
};

function mapAddCompletedFeaturedLocation(yelpData, result, marker){
    //if names don't match dont and addressed don't match, set yelp to null
    if(yelpData.name != result.name && result.formatted_address.toLowerCase().search(yelpData.location.address[0].toLowerCase()) < 0){
        yelpData = null;
    }
    //add the location to the knockout array
    myVM.addFeaturedLocation(yelpData, result, marker);
}

function mapAddCompletedSearchLocation(yelpData, result, marker){
    //if names don't match dont add to location
    console.log("map add yelp info");
    console.log(yelpData.name);
    console.log(result.name);
    if(yelpData.name != result.name){
        yelpData = null;
    }
    //if they do match add review to location
    //add the location to the knockout array
    myVM.addSearchResult(yelpData, result, marker);
}

//search locations default to blue once clicked
//search locations do not clear when hitting view featured locations