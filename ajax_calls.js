$( document ).ready(function() {
    console.log( "ready!" );

function searchQuestionAndAnswer(){

        var language = $('#searchtype').find(":selected").text();
        var autosearch = [];
        var questionToAnswer = []
        var clickedTitle;
        var passQuestionIdToAjax;
      
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

                for (q = 0; q < questionToAnswer.length; q++){
                    var questionMatch  = (questionToAnswer[q].label.includes(clickedTitle))
                    if (questionMatch == 1){
                      passQuestionIdToAjax = questionToAnswer[q].questionId
                      console.log(passQuestionIdToAjax)
                    }
                }

               $.ajax({
                 type: 'GET',
                 dataType: 'json',
                 url: "https://api.stackexchange.com/2.2/questions/" + passQuestionIdToAjax +"/answers?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6t0WVmuu" 
               }).done(function(response){
                 for(i = 0; i < response["items"].length; i++){

                          $("#answers").append("<li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + response["items"][i]["body"] + "</a></li>");
                          $("#answers").append("<li>I got an answer</li>");

                          if ($("#answers").is(':empty')) {
                            $("#answers").append("<li>No answer found</li>");
                            console.log("no answers")    
                          }        
                 }
                
               })
              }

          }); // end of search 

     });   
}


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


 $("#search").click(function(){
    $(this).val(""); 
    $( "#answers" ).empty(); 
    searchQuestionAndAnswer()
  });


    

  $("#searchtype").change(function(){
      $( "#answers" ).empty();        
       searchQuestionAndAnswer()
   });


 });
