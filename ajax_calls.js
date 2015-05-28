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

  console.log("i've been clicked")
  // language = $('#language_val').val();
  var language = $('#searchtype').find(":selected").text();

  console.log(language)

  // $(function() {

      	var data = [];
      	var label_response;
      	var tag_response ;
      
    	$.ajax({
    		type: 'GET',
    		dataType: 'json',
    		url:"https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged="+ language + "&site=stackoverflow"
    	}).done(function(response){
    		
    		for(i = 0; i < response["items"].length; i++){

    				label_response = ({ label: response["items"][i]["title"]});
    				tag_response = ({ categories: response["items"][i]["tags"]});
    	
    				for (l = 0; l < 1; l++){
    						for (t = 0; t < tag_response["categories"].length; t++){	
    							data.push({label: label_response["label"],
    								         category:tag_response["categories"][t]})
    			         }
                   console.dir(data)
    		      }
    		    }
    	    $( "#search" ).catcomplete({
          		delay: 0,
          		source: data
        	}); // end of search 
    		// })

      //place second ajax call for answer here 
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
