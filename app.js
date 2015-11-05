/* your code should go in this file */

/* 
 * The data is available in the array *data*
 * Each element of the array has the following structure:
 *  {
 *    phrase_en : "I'm a man",        // sentence in english
 *    phrase_de : "Ich bin ein Mann"  // sentence in german
 *  }
 */ 

var tmpl = ' <li id="ID">' +
           '  <h3>SENTENCE</h3>' +
           ' </li> ';

$(document).ready(function(){
    Lingo.start($(".sentences"),$(".form-control"),$(".opt-continue"),$(".practice"),$(".final"),data);
  
});

var Lingo = {
    data : [],
    current : 0,
    correct : 0,
    practice : {},
    final : {},
    start : function(ul, textField, button, practice,final,data){
        var id = 0;
        Lingo.current = 0;
        Lingo.correct = 0;
        Lingo.practice = practice;
        Lingo.final = final;
        data.forEach(function(element){
            var sentence = tmpl.replace("SENTENCE",element.phrase_en).replace("ID",id);
            id++;
            $(ul).append(sentence);
        });
        $("#0").addClass("current");
        Lingo.data = data;
        $(button).on("click",function(){
            console.log(Lingo.data[Lingo.current].phrase_de+ " "+ textField.val());
            if(textField.val()==Lingo.data[Lingo.current].phrase_de){
                Lingo.correct+=1;
            }
            $("#"+Lingo.current).removeClass("current");
            Lingo.current++;
            if(Lingo.current>=Lingo.data.length){
                Lingo.endGame();
            } else {
                $("#"+Lingo.current).addClass("current");
            }
        });
    },
    endGame : function (){
        $(Lingo.practice).addClass("hidden");
        var templateHTML = $(Lingo.final).html();
        $(Lingo.final).html(templateHTML.replace("CORRECT",Lingo.correct).replace("TOT",Lingo.current));
        $(Lingo.final).removeClass("hidden");
        
    }
}







