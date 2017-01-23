function save(){
    createJSON();
    // console.log(jsonObj);
    // var jsonString = JSON.stringify(jsonObj);
    // console.log(jsonString);
    $.ajax({
        type: 'POST',
        url: 'php/save.php',
        data: {'myData':JSON.stringify(jsonObj)},
        cache: false,
        success: function(data){
            // console.log(data);
            window.location = 'php/downloadData.php';
        },
        error: function(){
            alert("Failed to save file");
        }
    });
}