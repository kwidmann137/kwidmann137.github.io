var questions = {
    // Template for questions
    // {
    //     "question" : "",
    //     "number" : ,
    //     "type" : "",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
    //     "options" : [  //Only use for multiselect
    //         "",
    //     ],
    //     "yesFollowUp" : ,  //where to go if answer yes
    //     "noFollowUp" : ,  // where to go if answer no
    //     "next" : ,
    // }
    "meetingFollowUp" : [
        {
            "question" : "Do you want to follow up with this vendor?",
            "number" : 1,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null, //Only use for multiselect
            "yesFollowUp" : 3,  //where to go if answer yes
            "noFollowUp" : 2,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "Why not?",
            "number" : 2,
            "type" : "multiSelectWithOther",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" :[
                "No Show",
                "Not procurement ready",
                "Lack necessary certifications",
                "Other"
            ],
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "Please rate the vendor.",
            "number" : 3,
            "type" : "rating",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : 4,
        },
        {
            "question" : "Do you have a current opportunity for this vendor?",
            "number" : 4,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : 5,  //where to go if answer yes
            "noFollowUp" : 6,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "What is the value?",
            "number" : 5,
            "type" : "dropdown",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : [
                "<10,000",
                "10,000-50,000",
                "50,000+"
            ],
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : 6,
        },
        {
            "question" : "Will you meet with this vendor again?",
            "number" : 6,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : null,
        }
    ],
    "eventFollowUp" : [
        {
            "question" : "Were your expectations met?",
            "number" : 1,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : 2,  //where to go if answer yes
            "noFollowUp" : 2,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "Was the online business matchmaking site user-friendly?",
            "number" : 2,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : 3,  //where to go if answer yes
            "noFollowUp" : 3,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "Was the event well organized",
            "number" : 3,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : 4,  //where to go if answer yes
            "noFollowUp" : 4,  // where to go if answer no
            "next" : null,
        },
        {
            "question" : "How would you rate the overall event?",
            "number" : 4,
            "type" : "rating",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : 5,
        },
        {
            "question" : "Would you participate in a similar event in the future?",
            "number" : 5,
            "type" : "yesOrNo",  //Can be yesOrNo, multiSelectWithOther, rating, dropdown
            "options" : null,
            "yesFollowUp" : null,  //where to go if answer yes
            "noFollowUp" : null,  // where to go if answer no
            "next" : null,
        },
    ]
}