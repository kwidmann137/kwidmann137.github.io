
// This will be associated with each event
// A default for standard events, but could easily be customized
// Standard sections will be Intro (customizable), questions(customizable),
// and event rating(customizable)
// Additional sections could be added, but modification requried to code
// to generate the modals
//HTML elements for questionnaire

//old
var companyInfo = '<div class="row"><div class="col-xs-8 companyInfo"><h3 class="text-center">%CompanyName%</h3><strong>Meeting Time: </strong> %MeetingTime% <br><strong> NAICS Codes</strong> <ul id="naicsUL"></ul></div><img class="col-xs-4 img-responsive followUpCompanyLogo" src="%src%"></img></div>';
var meetingTime = '';
var naicsCodes = '';

//current
var yesBtn = '<button class="btn btn-success btn-md" id="yesBtn">Yes</button>';
var noBtn = '<button class="btn btn-danger btn-md" id="noBtn">No</button>';
var nextMeetingBtn = '<button class="btn btn-primary btn-md" id="nextMeetingBtn">Next Meeting</button>';
var nextQuestionBtn = '<button class="btn btn-success btn-md" id="nextQuestionBtn">Next</button>';
var rateEventBtn = '<button class="btn btn-primary btn-md" id="rateEventBtn">Rate Event</button>';
var saveBtn = '<button class="btn btn-success btn-md" id="saveBtn">Save</button>';
var notSelectedStarImg = '<img src="./images/notSelectedStar.png" class="starImg" id="star%num%" alt=""></img>';

var favoritesNotSelectedImg = '<img src="./images/favoritesNotSelected.png" class="favoritesImg" id="favoritesImg" alt=""></img>';
var favoritesDiv = '<div class="row favorites"><div class="col-xs-0 col-sm-1 col-md-2"></div><div class="col-xs-8 col-sm-7 col-md-5 text-center">%companyName%</div><div class="col-xs-0 col-sm-2 col-md-3"> <img src="./images/favoritesNotSelected.png" class="favoritesImg" id="favoritesImg%num%" alt=""></img></div><div class="col-xs-0 col-sm-1 col-md-2"></div></div>';
var questionDiv = '<div class="question">%question%</div>'
var textArea = '<textarea name="paragraph_text" class="form-control" rows="5" id="textArea" disabled></textarea>';
var dropdownForm = '<select class="form-control" id="dropdownForm"></select>';
var dropdownItem = '<option id="dropdown%num%">%value%</option>';
var dropdownItemDefault = '<option>Select one...</option>';
var radioForm = '<div id="radioForm"></div>';
var radioInput = '<div class="radio"><label><input type="radio" name="optionsRadios" value="%value%" id="radio%num%">%value%</label></div>';
var rateEventMessage = '<p class="">Thank you for rating your meetings.  We are almost done.  Please take a moment to tell us about your experience with the event in general.</p>';
var thankYouMessage = '<p id="thankYouMessage">Thank you for taking the time to provide us with this valuable feedback.  We hope to see you at another event soon!</p>';
var favoritesMessage = '<p class="favoritesMessage">We noticed you wanted to continue talking with the following companies.  You can check which ones you want to add to your favorites and we will automatically add them for you so you can connect with them more easily!</p>';

//new
var companyName = '<div class="row"><div class="col-xs-2"></div><div class="col-xs-8 companyInfo text-center"><h3 class="company-name" id="meeting-company-name">%name%</h3><p class="company-city">%city%, %state%</p><button class="btn btn-md btn-primary" type="button" data-toggle="collapse" data-target="#company-profile-div">View Vendor Profile</button></div></div>'
var companyLogo = '<div class="row"><div class="col-xs-9"></div><div class="col-xs-3"><div class="company-logo"><img class="img-responsive" src="%src%"></div></div></div>';
var meetingHeader = '<h2 class="modal-title text-center" id="myModalLabel">Vendor Follow Ups</h2><h4 class="header-sub-title text-center" id="header-sub-title">Meeting %num%  :  %time%</h4>';
var companyProfileDiv = '<div class="row"><div class="collapse col-xs-12" id="company-profile-div"><div class="card company-profile" id="company-profile"><p>Test</p></div></div></div>';
var eventHeader = '<h2 class="modal-title text-center" id="myModalLabel">Event Follow Up</h2>';

var rootMeeting;
var allMeetings = [];
var rootMeetingQuestion;
var allMeetingQuestions = [];
var rootEventQuestion;
var allEventQuestions = [];

function Meeting(company, time, logo, city, state, description){
    this.company = company;
    this.time = time;
    this.logo = logo;
    this.city = city;
    this.state = state;
    this.description = description;
}

Meeting.prototype.setNext = function(nextMeeting){
    this.nextMeeting = nextMeeting;
}

function Question(question, type, options, yesFollowUp, noFollowUp, next, number){
    this.question = question;
    this.type = type;
    this.options = options;
    this.yesFollowUp = yesFollowUp;
    this.noFollowUp = noFollowUp;
    this.next = next;
    this.number = number;
}

Question.prototype.setYes = function(yes){
    this.yes = yes;
}

Question.prototype.setNo = function(no){
    this.no = no;
}
Question.prototype.setNext = function(next){
    this.next = next;
}

function questionSetup (srcQuestionArray, destQuestionArray){
    //create all the questions
    for(question in srcQuestionArray){
        destQuestionArray.push(new Question(
                srcQuestionArray[question].question,
                srcQuestionArray[question].type,
                srcQuestionArray[question].options,
                srcQuestionArray[question].yesFollowUp,
                srcQuestionArray[question].noFollowUp,
                srcQuestionArray[question].next,
                srcQuestionArray[question].number
            ));
    }

    //link all the questions
    for(question in destQuestionArray){
        if(destQuestionArray[question].type === "yesOrNo"){
            var yesQuestion, noQuestion;
            for(q in destQuestionArray){
                if(destQuestionArray[q].number == destQuestionArray[question].yesFollowUp){
                    yesQuestion = destQuestionArray[q];
                    destQuestionArray[question].setYes(yesQuestion);
                }
                if(destQuestionArray[q].number == destQuestionArray[question].noFollowUp){
                    noQuestion = destQuestionArray[q];
                    destQuestionArray[question].setNo(noQuestion);
                }
            }
        }else{
            var nextQuestion;
            for(q in destQuestionArray){
                if(destQuestionArray[q].number == destQuestionArray[question].next){
                    nextQuestion = destQuestionArray[q];
                    destQuestionArray[question].setNext(nextQuestion);
                    break;
                }
            }
        }
    }
    return destQuestionArray[0];
}

function meetingSetup(clientMeetings){

    //create meetings
    for(meeting in clientMeetings){
        allMeetings.push(new Meeting(
            clientMeetings[meeting].company,
            clientMeetings[meeting].time,
            clientMeetings[meeting].logo,
            clientMeetings[meeting].city,
            clientMeetings[meeting].state,
            clientMeetings[meeting].description
        ));
    }

    //order meetings
    for(var i = 0; i < allMeetings.length-1; i++){
        allMeetings[i].setNext(allMeetings[i+1]);
    }

    return allMeetings[0];
    // allMeetings[allMeetings.length-1].setNext(null);
    //set up meetings
    // meeting1 = new Meeting("Test Company 1", "8:00AM", ["11111", "22222", "33333"]);
    // rootMeeting = meeting1;
    // meeting2 = new Meeting("Test Company 2", "9:00AM", ["22222", "33333"]);
    // meeting3 = new Meeting("Test Company 3", "9:30AM", ["44444"]);
    // meeting1.setNext(meeting2);
    // meeting2.setNext(meeting3);
}

$(function(){
    rootMeetingQuestion = questionSetup(questions.meetingFollowUp, allMeetingQuestions);
    rootEventQuestion = questionSetup(questions.eventFollowUp, allEventQuestions);
    rootMeeting = meetingSetup(client.meetings);

    var currQuestion = rootMeetingQuestion;
    var currMeeting = rootMeeting;
    var currEventQuestion = rootEventQuestion;
    var onIntro = true;
    var onMeetings = false;
    var meetingQuestionsComplete = false;
    var onEvent = false;
    var topContainer = $("#topContainer");
    var questionContainer = $("#questionContainer");
    var footer = $("#button-column");
    var header = $(".modal-header");
    var yesButton, noButton;
    var ratingSet = false;
    var currentRating = 0;
    var meetingAnswers = [];
    var eventAnswers = [];
    var favorites = [];
    var selectedFavorites = [];
    var selectedRadio = null;
    var selectedDropdown = null;
    var meetingNum = 0;
    $("#begin").on('click', function(){
        onMeetings = true;
        renderNewMeeting();
    });

    function renderQuestion(){

        if(currQuestion == null){
            //render nextMeeting btn
            if(onMeetings){
                renderNextMeetingBtn();
            }else if(onEvent){
                onEvent = false;
                renderFinalScreen();
                renderSaveBtn();
            }
        }else{
            //change out question container with first question
            questionContainer.html('');
            var formattedQuestion = questionDiv.replace("%question%", currQuestion.question);
            questionContainer.append(formattedQuestion);
                    //add Btns
            // renderYesOrNoBtns();
            if(currQuestion.type == "yesOrNo"){
                renderYesOrNoBtns();
            }else if(currQuestion.type == "rating"){
                renderRating();
                renderNextQuestionBtn();
            }else if(currQuestion.type == "multiSelectWithOther"){
                renderAllMultiSelectWithOtherOptions();
                renderTextField();
                renderNextQuestionBtn();
            }else if(currQuestion.type == "dropdown"){
                renderAllDropdownOptions();
                renderNextQuestionBtn();
            }
        }
    }

    function renderNewMeeting(){
        meetingNum++;
        //change out the header
        header.html('');
        var formattedHeader = meetingHeader.replace("%num%", meetingNum);
        formattedHeader = formattedHeader.replace("%time%", currMeeting.time);
        header.append(formattedHeader);
        //change out top container with first company info
        topContainer.html('');
        questionContainer.html('');
        var formattedLogo = companyLogo.replace("%src", currMeeting.logo);
        topContainer.append(formattedLogo);
        var formattedInfo = companyName.replace('%name%', currMeeting.company);
        formattedInfo = formattedInfo.replace("%city%", currMeeting.city);
        formattedInfo = formattedInfo.replace("%state%", currMeeting.state);
        topContainer.append(formattedInfo);
        topContainer.append(companyProfileDiv);

        currQuestion = rootMeetingQuestion;

        //set first question
        renderQuestion();
    }

    function renderYesOrNoBtns(){
        footer.html('');
         //change out buttons for yes and no (first question should always be yes/no)
        footer.append(noBtn);
        footer.append(yesBtn);
        yesButton = $("#yesBtn");
        noButton = $("#noBtn");

        yesButton.on('click', function(){
            if(currQuestion.question == "Will you meet with this vendor again?"){
                favorites.push(currMeeting.company);
            }
            if(onMeetings){
                meetingAnswers.push([currMeeting.company, currQuestion.question, "yes"]);
            }else if(onEvent){
                eventAnswers.push([currQuestion.question, "yes"])
            }
            console.log("Before : ");
            console.log(currQuestion);
            currQuestion = currQuestion.yes;
            console.log("Ater : ");
            console.log(currQuestion);
            renderQuestion();
        })
        noButton.on('click', function(){
            if(onMeetings){
                meetingAnswers.push([currMeeting.company, currQuestion.question, "no"]);
            }else if(onEvent){
                eventAnswers.push([currQuestion.question, "no"])
            }
            console.log("Before : ");
            console.log(currQuestion);
            currQuestion = currQuestion.no;
            console.log("Ater : ");
            console.log(currQuestion);
            renderQuestion();
        });
    }

    function renderNextMeetingBtn(){
        currMeeting = currMeeting.nextMeeting;
        if(currMeeting == null){
                onMeetings = false;
                onEvent = true;
                //render rateEvent Btn
                renderRateEventBtn();
        }else{
            footer.html('');
            footer.append(nextMeetingBtn);
            $("#nextMeetingBtn").on('click', function(){
                renderNewMeeting();
            });
        }
    }

    function renderNextQuestionBtn(){
        footer.html('');
        footer.append(nextQuestionBtn);
        $("#nextQuestionBtn").on('click', function(){
            var questionAnswered = false;
            if(currQuestion.type == "dropdown"){
                //get currently selected answer
                if(selectedDropdown === null){
                    alert("You must select an item from dropdown to proceed.");
                }else{
                    if(onMeetings){
                        meetingAnswers.push([currMeeting.company, currQuestion.question, selectedDropdown]);
                    }else if(onEvent){
                        eventAnswers.push([currQuestion.question, selectedDropdown]);
                    }
                    selectedDropdown = null;
                    questionAnswered = true;
                }
            }else if(currQuestion.type == "multiSelectWithOther"){
                //get currently selected answer and other
                if(selectedRadio === null){
                    alert("You must choose an option to continue.")
                }
                else if(selectedRadio == "Other"){
                    var text = $("#textArea").val();
                    if(text === null || text == "" ){
                        alert("Please fill in the text box to explain other.");
                    }else{
                        if(onMeetings){
                            meetingAnswers.push([currMeeting.company, currQuestion.question, selectedRadio, text]);
                        }else if(onEvent){
                            eventAnswers.push([currQuestion.question, selectedRadio, text]);
                        }
                        questionAnswered = true;
                    }
                }else{
                    if(onMeetings){
                        meetingAnswers.push([currMeeting.company, currQuestion.question, selectedRadio]);
                    }else if(onEvent){
                        eventAnswers.push([currQuestion.question, selectedRadio]);
                    }
                    selectedRadio = null;
                    questionAnswered = true;
                }
            }else if(currQuestion.type == "rating"){
                if(!ratingSet){
                    // || typeof currentRating == 'undefined'
                    alert("Please select a rating.");
                }else{
                    if(onMeetings){
                        meetingAnswers.push([currMeeting.company, currQuestion.question, currentRating]);
                    }
                    if(onEvent){
                        eventAnswers.push([currQuestion.question, currentRating]);
                    }
                    questionAnswered = true;
                }
            }
            if(questionAnswered){
                currQuestion = currQuestion.next;
                renderQuestion();
            }
        });
    }

    function renderRateEventBtn(){
        footer.html('');
        footer.append(rateEventBtn);
        $("#rateEventBtn").on('click', function(){
            renderRateEventTop();
            currQuestion = rootEventQuestion;
            console.log("just set root Event question");
            console.log(currQuestion);
            renderQuestion();
        });
    }

    function renderSaveBtn(){
        footer.html('');
        footer.append(saveBtn);
        $("#saveBtn").on('click', function(){
            console.log("save");
            console.log(meetingAnswers);
            console.log(eventAnswers);
        });
    }

    function renderRating(){
        ratingSet = false;
        for(var i = 0; i < 5; i++){
            var formattedStar = notSelectedStarImg.replace("%num%", i);
            questionContainer.append(formattedStar);
        }
        for(var i = 0; i<5; i++){
            var currStar = $("#star" + i);
            currStar.hover(updateStarsIn, updateStarsOut);
            currStar.click(setRating);
        }
    }

    function renderRateEventTop(){
        //set header
        header.html('');
        header.append(eventHeader);
        //clear top container
        topContainer.html('');
        questionContainer.html('');
        topContainer.append(rateEventMessage);
    }

    function updateStarsIn(){
        // if(ratingSet == false){
            var index = (this.id).substring((this.id).length-1);
            for(var c = 0; c<=index; c++){
                var currStar = $("#star" + c);
                currStar.attr("src", "./images/selectedStar.png");
            }
        // }
    }

    function updateStarsOut(){
        if(ratingSet == true){
            //get starting point
            var start = Number(currentRating)+1;
        }else{
            var start = 0;
        }
        var index = (this.id).substring((this.id).length-1);
        for(var c = start; c<5; c++){
            var currStar = $("#star" + c);
            currStar.attr("src", "./images/notSelectedStar.png");
        }
    }

    function setRating(){
        if(ratingSet == false){
            ratingSet = true;
        }
        currentRating = (this.id).substring((this.id).length-1);
        var index = (this.id).substring((this.id).length-1);
        for(var c = Number(currentRating)+1; c<5; c++){
            var currStar = $("#star" + c);
            currStar.attr("src", "./images/notSelectedStar.png");
        }
    }

    function renderAllMultiSelectWithOtherOptions(){
        selectedRadio = null;
        questionContainer.append(radioForm);
        for(item in currQuestion.options){
            var formattedInput = radioInput.replace(/%value%/g, currQuestion.options[item]);
            formattedInput = formattedInput.replace("%num%", item);
            $("#radioForm").append(formattedInput);
            $("#radio"+item).click(function(){
                selectedRadio = $(this)[0].defaultValue;
                updateTextArea();
            })
        }
    }

    function updateTextArea(){
        if(selectedRadio == "Other"){
            $("#textArea").prop("disabled", false);
        }else{
            $("#textArea").prop("disabled", true);
        }
    }

    function renderAllDropdownOptions(){
        selectedDropdown = null;
        questionContainer.append(dropdownForm);
        $("#dropdownForm").append(dropdownItemDefault);
        for(item in currQuestion.options){
            var formattedItem = dropdownItem.replace(/%value%/g, currQuestion.options[item]);
            var formattedItem = formattedItem.replace("%num%", item);
            $("#dropdownForm").append(formattedItem);
        }
        $('#dropdownForm').change(function () {
            selectedDropdown = $(this).find("option:selected").text();
        });
    }

    function renderTextField(){
        questionContainer.append(textArea)
    }

    function renderFinalScreen(){
        topContainer.html('');
        questionContainer.html('');
        topContainer.append(thankYouMessage);
        if(favorites.length > 0){
            topContainer.append(favoritesMessage);
            for(i = 0; i<favorites.length; i++){
                var formattedFavorite = favoritesDiv.replace("%num%", i);
                formattedFavorite = formattedFavorite.replace("%companyName%", favorites[i]);
                topContainer.append(formattedFavorite);
                //select the image and add
                $("#favoritesImg" + i).click(function(){
                    if($(this).attr("src") == "./images/favoritesNotSelected.png"){
                        $(this).attr("src", "./images/favoritesSelected.png");
                    }else{
                        $(this).attr("src", "./images/favoritesNotSelected.png");
                    }

                });
            }
        }
    }

    function getSelectedFavorites(){
        $("")
    }
});