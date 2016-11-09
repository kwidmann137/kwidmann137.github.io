var viewModel = function(){
    var self = this;
    self.searchKeyword = ko.observable("");
    self.listHidden = ko.observable(true);

    self.listLocations = ko.observableArray([]);
    self.featuredLocations = ko.observableArray([]);

    self.listEmpty = ko.observable(false);

    self.toggleList = function(){
        self.listHidden() ? self.listHidden(false) : self.listHidden(true);
    }

    self.search = function(){
        self.listLocations().forEach(function(v, i){
            mapClearMarker(v.marker());
        })
        self.listLocations.removeAll();
        mapSearch(self.searchKeyword());
    }

    self.addSearchResult = function(result, marker){
        var photoURL = typeof result.photos !== 'undefined'
            ? result.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150})
            : ''; //alternative a "nophoto.jpg"
        var resultObj = new location(result.formatted_address, result.geometry, result.name, photoURL, result.place_id, result.rating, result.types, marker, "search");
        self.listLocations.push(resultObj);
    }

    var location = function(address, location, name, photoURL, id, rating, types, marker, type){
        this.address = ko.observable(address);
        this.location = ko.observable(location);
        this.name = ko.observable(name);
        this.photoURL = ko.observable(photoURL);
        this.id = ko.observable(id);
        this.rating = ko.observable(rating);
        this.types = ko.observableArray(types);
        this.marker = ko.observable(marker);
        this.match = ko.observable(true);
        this.type = ko.observable(type);
    }

    self.addFeaturedLocation = function(result, marker){
        var photoURL = typeof result.photos !== 'undefined'
            ? result.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150})
            : ''; //alternative a "nophoto.jpg"
        var resultObj = new location(result.formatted_address, result.geometry, result.name, photoURL, result.place_id, result.rating, result.types, marker, "featured");
        self.featuredLocations.push(resultObj);
        self.listLocations.push(resultObj);
    }

    self.filterList = function(){
        self.listLocations().forEach(function(loc, i){
            //set match to false for entire list and only set true for those who match
            loc.match(false);
            //if any portion of name matches keep
            if(loc.name().toLowerCase().search(self.searchKeyword().toLowerCase()) >= 0){
                console.log("name matched");
                loc.match(true);
            }
            //if any category matches, keep
            if(loc.types().forEach(function(type, i){
                if(type.toLowerCase().search(self.searchKeyword().toLowerCase()) >= 0){
                    this.match(true);
                }
            }, loc)){
                //empty body since callback function handles setting to true
            }
            //if address matches keep
            if(loc.address().toLowerCase().search(self.searchKeyword().toLowerCase()) >= 0){
                loc.match(true);
            }
            //if nothing matches, remove from map
            if(loc.match() == false){
                mapClearMarker(loc.marker());
            }else{
                mapSetMarker(loc.marker());
            }
        })
        self.noResults();
    }

    self.restoreFeatured = function(){
        self.listLocations().forEach(function(v, i){
            mapClearMarker(v.marker());
        })
        self.listLocations.removeAll();
        self.listLocations(self.featuredLocations().slice(0));
        self.listLocations().forEach(function(v, i){
            //ensure match is true so loc shows on list
            v.match(true);
            mapSetMarker(v.marker());
        })
    }

    self.animateMarker = function(){
        mapAnimateMarker(this.marker(), this.type());
    }

    self.noResults = function(){
        self.listEmpty(true);
        self.listLocations().forEach(function(loc, i){
            if(loc.match() == true){
                self.listEmpty(false);
            }
        });
    }
}
var myVM = new viewModel();
ko.applyBindings(myVM);