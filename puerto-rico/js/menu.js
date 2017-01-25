jQuery(function(){
    jQuery('#menu-toggle').on('click', function(){
        event.preventDefault();
        jQuery("#sidebar-wrapper").addClass('active');
    });
    jQuery('#menu-close').on('click', function(){
        event.preventDefault();
        jQuery("#sidebar-wrapper").removeClass('active');
    });
});