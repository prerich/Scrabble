/*
   name: Jennifer Robles
    email: Jennifer_Robles@student.uml.edi
    date: 12-07-2021 - 12/17/21
    purpose: File checks if the value the user checked is
    an Uppercase Alphabet let using Jquery Validator and 
    using regex expressions. 


*/



$(document).ready(function(){

    $("#blankForm").validate({

        rules: {
            blankValue:{
                ALPHA: true,
            }

            
        }//end of rules

    });

});

jQuery.validator.addMethod("ALPHA", function(value, element){
    return this.optional(element) || /^([A-Z])$/.test( value );
  }, "Invalid")