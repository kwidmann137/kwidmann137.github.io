$(function(){
    $('#menu-toggle').on('click', function(){
        $("#sidebar-wrapper").addClass('active');
    });
    $('#menu-close').on('click', function(){
        $("#sidebar-wrapper").removeClass('active');
    });
});