var projects = {
    "project" : [
        // TEMPLATE FOR PROJECTS
        // {
        //     "title" : "",
        //     "dates" : "",
        //     "description" : "",
        //     "src1x" : "",            //for standard or mobile displays
        //     "src2x" : "",            //for high res displays
        //     "alt" : "",
        //     "url" : "",               // URL to github with code
        //     "language" : ""
        // }
        {
            "title" : "Interactive Resume",
            "dates" : "June 2016",
            "description" : "A complete and interactive resume.  Written using javascript.  All information is stored in a JSON to allow records to be easily kept and updated.  Each JSON is processed using a looping function, so the page automatically updates whenever entries are made or altered.",
            "src1x" : "small_images/myResumeScrnSht-1x.png",
            "src2x" : "large_images/myResumeScrnSht-2x.png",
            "alt" : "placeholder",
            "url" : "#",               // URL to github with code
            "language" : "Javascript"
        },
        {
            "title" : "PONG",
            "dates" : "Sept 2015",
            "description" : "A game of pong written in Java.",
            "src1x" : "small_images/PONG-1x.png",
            "src2x" : "large_images/PONG-2x.png",
            "alt" : "placeholder",
            "url" : "#",               // URL to github with code
            "language" : "Java"
        },
        {
            "title" : "Frogger",
            "dates" : "June 2016",
            "description" : "The engine loop and images were provided.  From there I developed the game using HTML Canvas and Javascript.  The primary objective was to experiment with pseudoclassical patterns for objects in JS. Functionality added includes player and enemy rendering, collision detection, counting and rendering of score, coutning and rendering of lives, and game reset.",
            "src1x" : "small_images/FroggerScrnSht-1x.png",
            "src2x" : "large_images/FroggerScrnSht-2x.png",
            "alt" : "placeholder",
            "url" : "https://github.com/kwidmann137/Frogger",               // URL to github with code
            "language" : "Javascript"
        }
    ]
}

/******************************* PROJECTS ************************/
projects.display = function() {
    for(item in projects.project) {
        console.log();
        $(".featured-works").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLthumbnailStart);


        //append project info
        //Image - add in src, srcset and alt info
        var formattedImage = HTMLprojectImage.replace(/%src1x%/g, projects.project[item].src1x);
        var formattedImage = formattedImage.replace("%src2x%", projects.project[item].src2x);
        var formattedImage = formattedImage.replace("%alt%", projects.project[item].alt);

        //Title - Add in title of project, link to source code and buttons
        var formattedTitle = HTMLprojectTitle.replace("%title%", projects.project[item].title);
        var formattedTitle = formattedTitle.replace("%link%", projects.project[item].url);
        var formattedTitle = formattedTitle.replace("%id%", "project"+item);
        var formattedTitle = formattedTitle.replace("%language%", projects.project[item].language);

        //Modal info - add id, title, date and description
        var formattedModal = HTMLprojectModalInfo.replace("%id%", "project"+item);
        var formattedModal = formattedModal.replace("%title%", projects.project[item].title);
        var formattedModal = formattedModal.replace("%date%", projects.project[item].dates);
        var formattedModal = formattedModal.replace("%description%", projects.project[item].description)


        //add div for image
        $(".thumbnail:last").append(formattedImage);

        //add div for project info
        $(".thumbnail:last").append(formattedTitle);

        //add div for modal
        $(".caption:last").append(formattedModal);
    }
}

projects.display();