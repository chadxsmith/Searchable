 $( document ).ready(function() {
    console.log( "ready!" );



 $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });




 //  $(function() {

 //  	var data = []
 //  	var label_response = []
 //  	// console.log(data)


	// $.ajax({
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	url:"https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow"
	// }).done(function(response){
	// 	console.dir(response)
	// 	for(i = 0; i < response["items"].length; i++){
	// 			data.push({ label: response["items"][i]["title"], category: response["items"][i]["tags"] });

	//     $( "#search" ).catcomplete({
 //      		delay: 0,
 //      		source: data

 //    	});


	// 	}
	// })


$("#searchtype").change(function(){

        var language = $('#searchtype').find(":selected").text();

      	var autosearch = [];
        var questionToAnswer = []
        var clickedTitle;
        var passQuestionIdToAjax;

        // console.log(questionToAnswer)
      
    	$.ajax({
    		type: 'GET',
    		dataType: 'json',
    		url:"https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged="+ language + "&site=stackoverflow"
    	}).done(function(response){
          for(i = 0; i < response["items"].length; i++){
           autosearch.push({ label: response["items"][i]["title"], category: language });
           questionToAnswer.push({ label: response["items"][i]["title"], questionId: response["items"][i]["question_id"] });
      }

    	    $( "#search" ).catcomplete({
          		delay: 0,
          		source: autosearch, 
              select:function(event, ui){
                clickedTitle = ui["item"]["label"]
                // console.log(questionToAnswer[0].label)

                for (q = 0; q < questionToAnswer.length; q++){
                    var questionMatch  = (questionToAnswer[q].label.includes(clickedTitle))
                    if (questionMatch == 1){
                      passQuestionIdToAjax = questionToAnswer[q].questionId
                    }
                }

               $.ajax({
                 type: 'GET',
                 dataType: 'json',
                 url: "https://api.stackexchange.com/2.2/questions/" + passQuestionIdToAjax +"/answers?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6t0WVmuu" 
               }).done(function(response){
                 for(i = 0; i < response["items"].length; i++){
                     $("#answers").append("<li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + response["items"][i]["body"] + "</a></li>");
                 }
               })


                //if "clickedTitle" is included in "questionToAnswer", return matched object's question_id 
              }

        	}); // end of search 


     }); 

});








// $.ajax({
// 	type: 'GET',
// 	dataType: 'json'
// 	url:"https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow"
// }).done(function(response){
// 	for(i = 0; i < response["item"].length; i++){
// 			console.log(response["item"])
// 	}
// })







// This code for select a language, then a question, returning that question's answers 
//  $( document ).ready(function() {


//   $( "#submit-button" ).click(function() {
//   event.preventDefault();
//   language = $('#search-type').val();
//   console.log(language)


// 	$("#answers").empty();
// 	 // language= $('#language-keyword').val();

// 	$.ajax({
// 		type: 'GET',
// 		dataType: 'json',
// 		url: "https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged="+ language + "&site=stackoverflow"

// 	}).done(function(response) {

// 		// NOTE: When ready, introduce autosearch here

// 		$.ajax({
// 			type: 'GET',
// 			dataType: 'json',
// 			url: "https://api.stackexchange.com/2.2/questions/" + response["items"][0]["question_id"]+"/answers?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6t0WVmuu"	
// 		}).done(function(response){
// 			for(i = 0; i < response["items"].length; i++){
// 					$("#answers").append("<li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + response["items"][i]["body"] + "</a></li>");
// 			}
// 		})

// 	})


	
//    });

// });

 });
