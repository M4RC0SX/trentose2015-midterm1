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


// first solution
$(document).ready(function(){
    $(".english").on("click",function(){
            $(".practice").removeClass("hidden");
            Lingo.translationType = 0;
            $(".languageSelection").addClass("hidden");
            Lingo.start($(".sentences"),$(".form-control"),$(".opt-continue"),$(".practice"),$(".final"),$(".languageSelection"),data);
        });
        
    $(".german").on("click",function(){
            $(".practice").removeClass("hidden");
            Lingo.translationType = 1;
            $(".languageSelection").addClass("hidden");
            Lingo.start($(".sentences"),$(".form-control"),$(".opt-continue"),$(".practice"),$(".final"),$(".languageSelection"),data);
    });
    
  
});

var Lingo = {
    data : [],
    current : 0,
    correct : 0,
    practice : {},
    final : {},
    translationType : 0,
    start : function(ul, textField, button, practice,final,languageSelection,data){
        var id = 0;
        Lingo.current = 0;
        Lingo.correct = 0;
        Lingo.practice = practice;
        Lingo.final = final;
        
        data.forEach(function(element){
            var sentence;
            if(Lingo.translationType==0)
                sentence = tmpl.replace("SENTENCE",element.phrase_en).replace("ID",id);
            else 
                sentence = tmpl.replace("SENTENCE",element.phrase_de).replace("ID",id);
            id++;
            $(ul).append(sentence);
        });
        $("#0").addClass("current");
        Lingo.data = data;
        $(button).on("click",function(){
            console.log(Lingo.data[Lingo.current].phrase_de+ " "+ textField.val());
            if(Lingo.translationType==0){
                if(textField.val()==Lingo.data[Lingo.current].phrase_de){
                    Lingo.correct+=1;
                }
            } else {
                if(textField.val()==Lingo.data[Lingo.current].phrase_en){
                    Lingo.correct+=1;
                }
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







