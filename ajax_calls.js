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
                      
                    }
                }

               $.ajax({
                 type: 'GET',
                 dataType: 'json',
                 url: "https://api.stackexchange.com/2.2/questions/" + passQuestionIdToAjax +"/answers?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6t0WVmuu" 
               }).done(function(response){
                  // console.log(response)
                  if(response["items"].length === 0){
                      $("#noanswer").append("<li>Sorry, no answers for that question</li>");
                  } 

                  else{

                      for(i = 0; i < response["items"].length; i++){
                          // if(!(/<pre>/).test(response["items"][i].body)){
                          //   continue;
                          // }
                          // console.log("Has pre", response.items[i].body);
                          // var matcher = response.items[i].body.match(/<pre>[^<\/pre>]*<\/pre>/);
                          // console.dir(matcher);
                          var el = document.createElement("div");
                          el.innerHTML = response.items[i].body;
                          for(var x = 0; x < el.childNodes.length; x++){
                            if(el.childNodes[x].localName === "pre"){
                              console.dir(el.childNodes[x].innerHTML);
                               var test = $("#answers").append("<div id='square'><li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + el.childNodes[x].innerHTML + "</a></li></div>").css('display', 'inline');

                            }
                          }
                          // var matcher = response["items"][i]["body"].match("/<pre>.*<\/pre>/");
                          // console.log("foo", matcher);
                          // var test = $("#answers").append("<div id='square'><li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + matcher + "</a></li></div>").css('display', 'inline');


               
                          // for (x = 0; x < everything.length; x++) {
                          //         // var pass = everything["items"][x].includes("pre")
                          //         // console.log(everything)
                          // }
                              // for (x = 0; x < code.length; x++){
                              //      // var apple = code[x].includes("pre")
                              //      console.log(code)
                              //  //      if (code[x].includes("pre")){ 
                              //  //      // console.log(code[x])

                              //  // }

                              // }

                              // var test = $("#answers").append("<div id='square'><li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + response["items"][i]["body"] + "</a></li></div>").css('display', 'inline');
                          
                          }


                          //Second attempt/ Reasoning: Display each individual "pre"
                          // var testAgain = $(test).find("pre")
                          // // console.log(testAgain)
                          // for (t = 0; t < testAgain.length; t++){
                          // console.log(testAgain)
                          // $("#testanswers").append("<div id='square'><li>" + testAgain[t].innerHTML + "</li><div>").css('display', 'inline') 
                          // }
                      
           



                          //First attempt/ Reasoning: Could not figure out how to get the "pre" objects only 
                          // var test = $("#answers").append("<div id='square'><li><a href='http://www.stackoverflow.com/a/" + response["items"][i]["answer_id"] + "'>" + (response["items"][i]["body"]).find("pre").prevObject[2].innerHTML + "</a></li></div>").css('display', 'inline');       
                          // var again = $(response["items"][i]["body"]).find("pre").prevObject
                          // console.log(again.find("pre").prevObject)
     

                          
              
      
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
    $( "#square" ).empty(); 
    $( "#answers" ).empty();
    $( "#noanswer" ).empty();  
    $( "#testanswers" ).empty();   
    searchQuestionAndAnswer()
  });
    

  $("#searchtype").change(function(){
      $( "#square" ).empty();  
      $( "#answers" ).empty(); 
      $( "#noanswer" ).empty();      
      $( "#testanswers" ).empty();       
      searchQuestionAndAnswer()
   });


 });
