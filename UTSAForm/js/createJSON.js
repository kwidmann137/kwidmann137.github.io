var jsonObj = [];

function createJSON(){

	jsonObj = [];

	$('.form input').each(function(){
		var field = this.id;
		var input = $(this).val();
		
		item = {};
		item ["field"] = field;
		item ["input"] = input;

		jsonObj.push(item);
	});
}