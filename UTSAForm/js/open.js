function openFormData(){
    var fileData = $("#userfile").prop("files")[0];
    var formData = new FormData();
    formData.append('userfile', fileData);
    $.ajax({
        url: 'php/upload.php',  //Server script to process data
        type: 'POST',
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false,
        //Ajax events
        // beforeSend: beforeSendHandler,
        success: function(data){
            fillInForm(data);
        },
        error: function(data){
            console.log("ERROR");
            console.log(data);
        }
    });

}

function fillInForm(data){
    
}