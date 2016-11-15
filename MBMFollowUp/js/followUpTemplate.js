
// This will be associated with each event
// A default for standard events, but could easily be customized
// Standard sections will be Intro (customizable), questions(customizable),
// and event rating(customizable)
// Additional sections could be added, but modification requried to code
// to generate the modals
//HTML elements for questionnaire

var companyInfo = '<div class="row"><div class="col-xs-8 companyInfo"><h3 class="text-center">%CompanyName%</h3><strong>Meeting Time: </strong> %MeetingTime% <br><strong> NAICS Codes</strong> <ul id="naicsUL"></ul></div><img class="col-xs-4 img-responsive followUpCompanyLogo" src="%src%"></img></div>';
var meetingTime = '';
var naicsCodes = '';
var yesBtn = '<button class="btn btn-success btn-md" id="yesBtn">Yes</button>';
var noBtn = '<button class="btn btn-danger btn-md" id="noBtn">No</button>';
var nextMeetingBtn = '<button class="btn btn-primary btn-md" id="nextMeetingBtn">Next Meeting</button>';
var nextQuestionBtn = '<button class="btn btn-success btn-md" id="nextQuestionBtn">Next</button>';
var rateEventBtn = '<button class="btn btn-primary btn-md" id="rateEventBtn">Rate Event</button>';
var saveBtn = '<button class="btn btn-success btn-md" id="saveBtn">Save</button>';
var notSelectedStarImg = '<img src="./images/notSelectedStar.png" class="starImg" id="star%num%" alt=""></img>';
// var selectedStarImg = '<img src="./images/selectedStar.png" class="starImg" id="star%num%" alt=""></img>';
var favoritesNotSelectedImg = '<img src="./images/favoritesNotSelected.png" class="favoritesImg" id="favoritesImg" alt=""></img>';
// var favoritesSelectedImg = '<img src="./images/favoritesSelected.png" class="favoritesImg" id="favoritesImg" alt=""></img>';
var favoritesDiv = '<div class="row"><div class="col-xs-12 favorites text-center">%companyName% <img src="./images/favoritesNotSelected.png" class="favoritesImg" id="favoritesImg%num%" alt=""></img></div></div>';
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

var rootMeeting;
// var meeting1, meeting2, meeting3;
var allMeetings = [];
var rootMeetingQuestion;
var allMeetingQuestions = [];
// var question1, question2, question3, question4, question5, question6;
var rootEventQuestion;
var allEventQuestions = [];

function Meeting(company, time, codes, logo, next){
    this.company = company;
    this.time = time;
    this.codes = codes;
    this.logo = logo;
    this.next = next;
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
                    continue;
                }
                if(destQuestionArray[q].number == destQuestionArray[question].noFollowUp){
                    noQuestion = destQuestionArray[q];
                    destQuestionArray[question].setNo(noQuestion);
                    continue;
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
            clientMeetings[meeting].NAICS,
            clientMeetings[meeting].logo
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
    console.log(rootMeetingQuestion);
    rootEventQuestion = questionSetup(questions.eventFollowUp, allEventQuestions);
    console.log(rootEventQuestion);
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
    var yesButton, noButton;
    var ratingSet = false;
    var currentRating = 0;
    var favoritesSelected = false;
    var answers = [];
    var favorites = [];
    var selectedRadio = null;
    var selectedDropdown = null;
    $("#begin").on('click', function(){
        renderNewMeeting();
        //set on meetings to true;
        onMeetings = true;
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
        //change out top container with first company info
        topContainer.html('');
        questionContainer.html('');
        var formattedInfo = companyInfo.replace('%CompanyName%', currMeeting.company);
        formattedInfo = formattedInfo.replace("%src%", currMeeting.logo)
        formattedInfo = formattedInfo.replace("%MeetingTime%", currMeeting.time);
        topContainer.append(formattedInfo);
        for(code in currMeeting.codes){
            $("#naicsUL").append('<li>' + currMeeting.codes[code] +'</li>');
        }

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
                answers.push([currMeeting.company, currQuestion.question, "yes"]);
            }
            currQuestion = currQuestion.yes;
            renderQuestion();
        })
        noButton.on('click', function(){
            if(onMeetings){
                answers.push([currMeeting.company, currQuestion.question, "no"]);
            }
            currQuestion = currQuestion.no;
            renderQuestion();
        });
    }

    function renderNextMeetingBtn(){
        currMeeting = currMeeting.nextMeeting;
        if(currMeeting == null){
                onMeetings = false;
                onEvent = true;
                //render rateEvent Btn
                console.log(answers);
                console.log(favorites);
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
            if(currQuestion.type == "dropdown"){
                //get currently selected answer
                answers.push([currMeeting.company, currQuestion.question, selectedDropdown]);
                selectedDropdown = null;
            }else if(currQuestion.type == "multiSelectWithOther"){
                //get currently selected answer and other
                if(selectedRadio == "Other"){
                    var text = $("#textArea").val();
                    answers.push([currMeeting.company, currQuestion.question, selectedRadio, text]);
                }else{
                    answers.push([currMeeting.company, currQuestion.question, selectedRadio]);
                    selectedRadio = null;
                }
            }else if(currQuestion.type == "rating"){
                if(onMeetings){
                    answers.push([currMeeting.company, currQuestion.question, currentRating]);
                }
            }
            currQuestion = currQuestion.next;
            renderQuestion();
        });
    }

    function renderRateEventBtn(){
        footer.html('');
        footer.append(rateEventBtn);
        $("#rateEventBtn").on('click', function(){
            renderRateEventTop();
            currQuestion = rootEventQuestion;
            renderQuestion();
        });
    }

    function renderSaveBtn(){
        footer.html('');
        footer.append(saveBtn);
        $("#saveBtn").on('click', function(){
            console.log("save");
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
        console.log("Clearing stars " + start + " through " + 4);
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
        console.log("Current Rating: " + currentRating);
        // ratingSet ? ratingSet = false : ratingSet = true;
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
            var selectedOption = $(this).find("option:selected").text();
            selectedDropdown = selectedOption;
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
});