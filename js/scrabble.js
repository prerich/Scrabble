/*
   name: Jennifer Robles
    email: Jennifer_Robles@student.uml.edi
    date: 12-07-2021 - 12/17/21
    purpose: Using Jquery Ui I created a game of Scrabble
            has Drop and drag effects. Keeps track of scores,
            letters use, and the distrubtion count of letters.
            This is only a reflection of a one line scrabble board
            with two bonus words tiles.This javascript file has most of the word for my program
            I embemed links in comments for references


*/

//in order to get which letter is chosen by usen i used the src property
//https://stackoverflow.com/questions/19937162/jquery-get-the-image-src
//to find which letter 1-7 was use i used ID
//https://stackoverflow.com/questions/48022228/how-to-find-drop-target-item-with-jquery

var Game ={
    score: 0,
    TilesLeft: 100
} // object keeps score of user overall score
  
var TilesCount;
  
var Word = {
    word: "",
    score: 0, 
    isDefine: false,
    isDouble1: false,
    isDouble2: false
} // Keeps score of each rounds

var Tiles = [' ', ' ', ' ', ' ', ' ', ' ', ' ']; //keeps track of each letter

var IdOrder = [' ', ' ', ' ', ' ', ' ', ' ', ' ']; //pos/id of letter images


//returns a number betweeen 0 - 26 
//need  26 for blank
//https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function randomNumber(){
    return Math.floor(Math.random() * 27);
}

//refrech page and clear game object
function refresh(){
  location.reload();
}



//Updates tiles counts, image count
function SubmitWord(){
    var word = '';
  
    //find length of word
    for(var i = 0; i < 7; i++){
      if(Word.word[i] === ' '){
        console.log(Word.word[i]);
        break;
      }
      //Saves letters for current round
      word += Word.word[i];
    }
  
    //update remaining tiles
    Game.TilesLeft -= word.length;
    $("#remaining").text("Remaining Tiles: " + Game.TilesLeft);

    //update Game score
    Game.score += Word.score;
    $("#gameScore").text("Game Score: " + Game.score);
  
    //change tile amount
    //find each letter from word and decrement
    //from image count object 
    for(var i = 0; i < word.length; i++){
      for(var k = 0; k < 27; k++){
        if(TilesCount.imageCount[k].letter === word[i]){
          TilesCount.imageCount[k].amount--;
        }
      } 
    }
    //functeion call to replace each letter being submited
    replaceTiles();

    //reset word for new round
    clearTilesArr();
    Word.word = " ";
    $("#word").text("Word: " + Word.word);
    Word.score = 0;
    $("#score").text("Score: " + Word.score);

    //new round will force user to start from tile1 again
    disable6tiles();
  
  }

//clear my Tile[] useful for new round
function clearTilesArr(){
    for(var i = 0; i < 7; i++){
        Tiles[i] = ' ';
    }  
}  


//updates score if a letter is in the bonus word tile
//there is currently 2 bonus tile
function updateScore(){
    if(Word.isDouble1 === true){
      Word.score = Word.score * 2;
    }
  
    if(word.isDouble2 === true){
      Word.score = Word.score * 2;
    }
    $("#score").text("Score: " + Word.score);
}


//update the Word object every time a letter is drop on the board
function updateWord(){
    //alph array positions corresponds to jessicas array and my object letter positions
    //https://stackoverflow.com/questions/24597634/how-to-generate-an-array-of-alphabet-in-jquery
    var alph = 'ABCDEFGHIJKLMONPQRSTUVWXYZ_'.split('');
    Word.word = '';
    var score = 0; 
    for(var i = 0; i < 7; i++){
      Word.word += Tiles[i]; //adding the new letter
      for(var j = 0; j < 27; j++){
          //to access jessicas array i need the exact char
          currentC = alph[j];
          if(currentC == Tiles[i]){
             //updates score with corresponding letter value
              score += ScrabbleTiles[currentC].value;
            }
      }
    }
  
    Word.score = score;
    $("#word").text("Word: " + Word.word);

    //checks for double word tiles
    updateScore();
    

}

function replaceTiles(){
    var word = Word.word;
    for(var i = 0; i < 7; i++){
      if(IdOrder[i] === ' ' ){
        continue; //if tile is empty skip
      }
      var rand = randomNumber();
  
      if(TilesCount.imageCount[rand].amount <= 0){
        i--; // checks the imagecount is not 0
      } else if(TilesCount.imageCount[rand].amount > 0){
        var str =TilesCount.imageCount[rand].src;//getting replacements pathfile
        $('#' + IdOrder[i]).remove(); // remove the current letter element

        //checks if a blank tile showed up its position 26
        if(rand == 26)
          enableBlank()

        //creating new img element with neccesary classes
        var img = $('<img id="' + IdOrder[i] +'">');
        img.attr("src", TilesCount.imageCount[rand].src);
        img.addClass("draggable");
        img.appendTo("#tileRack");
      }
      $( ".draggable" ).draggable(); //make new letters dragable
    }
  }


//for every round and init of game only enable the first tile
//https://api.jqueryui.com/droppable/#methods 
//used this link disable the 6
function disable6tiles(){
  for(var i = 2; i<=7; i++){
    $("#tile" + i).droppable("disable");
  }
}


//chooses 7 random letters/images for button use
//and init of game
function randomize7Images(){
  
    for(var i = 1; i <= 7; i++){
      var num = randomNumber();
      if(TilesCount.imageCount[num].amount <= 0){
        i--;//repeat
      }else if(TilesCount.imageCount[num].amount > 0){
          if(TilesCount.imageCount[num].letter == '_')
            enableBlank();//check if blank appeared
  
        //updates/changes the src to new image pathway file
        //corresponds to its letter
        var str =TilesCount.imageCount[num].src;
        $("#letter" + i).attr("src", TilesCount.imageCount[num].src);
       
      }
    }
}

//when blank tiles shows up form will be enable
function enableBlank(){
    $( "#blankForm :input" ).prop( "disabled", false );
  }

function submitBlankValue(){
  //check if value is valid or else exits function
    var validator = $("#blankForm").validate();
    if(!validator.form()){ return; } 

    var val = document.getElementById("blankValue").value
    var id;
  
    //finding which letter position  is blank
    for(var i = 0; i < 7; i++){
      var str = String($("#letter" + i).attr("src"));
      index = str.length - 5;//where the blanks/letters resides
      var letter = str.charAt(index);
      if(letter == "_"){
          //changing src link to choosesn letter value from user 
        var src = str.substring(0, index)+ val + str.substring(index+1, str.length);
        $("#letter" + i).attr("src", src);
        break;
      }
    }

    //updating Image Count of tiles
    var alph = 'ABCDEFGHIJKLMONPQRSTUVWXYZ_'
    var index = alph.indexOf(val);
    TilesCount.imageCount[26].amount--;
    TilesCount.imageCount[index].amount++;
  
}

//used this link to help with the out funciton in drop
//https://stackoverflow.com/questions/35310654/jquery-disable-a-droppable-after-it-has-reached-a-limit-of-3-elements
  //if a letter is dropped out will update score and new word
  function removeLetter(letter, pos, isDouble1, isDouble2){
    var location = pos - 1;
    Tiles[location] = ' ';
    
    if(isDouble1 === true){
      Word.isDouble1 = false;
    } // if bonus tile was taken away

    if(isDouble2 === true){
      Word.isDouble2 = false;
    }// if bobus word 2 was taken away

    updateWord();

    console.log(letter + " was removed");
  }

  function makeDroppableTiles(){
    
    //each tile from board is droppable
    //NOTE: Revise this in future 
    //this code is repetive and can be made into one function
    $("#tile1").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 1, false, false);
      },


      drop: function( event, ui ) {
        letter = ' '; //blank
        //gets letter by looking at the image file name
        //searches for the position where the letter resides
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[0] = letter; //saving letter for debug p
        IdOrder[0] = ui.draggable.prop('id');
        console.log("tile1 " + " letter is " + letter);
        updateWord();
        $("#tile2").droppable("enable");
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });

    //double word tile
    $("#tile2").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 2, true, false);
      },


      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[1] = letter;
        IdOrder[1] = ui.draggable.prop('id');
        console.log("tile2 " + " letter is " + letter);
        Word.isDouble1 = true;
  
        updateWord();
        $("#tile3").droppable("enable");

        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile3").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 3, false, false);
      },

      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[2] = letter;
        IdOrder[2] = ui.draggable.prop('id');
        console.log("tile3 " + " letter is " + letter);
        updateWord();
        $("#tile4").droppable("enable" );
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile4").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 4, false , false);
      },

      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[3] = letter;
        IdOrder[3] = ui.draggable.prop('id');
        console.log("tile4 " + " letter is " + letter);
        updateWord();
        $("#tile5").droppable("enable" );
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
  
    $("#tile5").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 5, false, false);
      },
      drop: function( event, ui ) {
        letter = '-';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[4] = letter;
        IdOrder[4] = ui.draggable.prop('id');
        console.log("tile5 " + " letter is " + letter);
        updateWord();
        $("#tile6").droppable("enable" );
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });


      //bonus word here
    $("#tile6").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 6, false, true);
      },
      drop: function( event, ui ) {
        letter = '-';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[5] = letter;
        IdOrder[5] = ui.draggable.prop('id');
        console.log("tile6 " + " letter is " + letter);
        Word.isDouble2 = true;
        updateWord();
        $("#tile7").droppable("enable" );
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile7").droppable({
      out: function( event, ui ) {
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        removeLetter(letter, 7, false, false);
      },

      drop: function( event, ui ) {
        letter = '-';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[6] = letter;
        IdOrder[6] = ui.draggable.prop('id');
        console.log("tile7 " + " letter is " + letter);
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
  

  }
$( function() {

  //to prevent any unwanted bugs i disable the form 
  //will be enable when blank char shows up
  $( "#blankForm :input" ).prop( "disabled", true );

  //fetching my json file that has letters and blank images pathfile
  //name and counts
  var  xml2 = new XMLHttpRequest();
  xml2.open("GET", "https://prerich.github.io/Scrabble/graphics_data/imageCount.json");
  xml2.onload = function(){
    if(this.status == 200){

      //image count is now an object
      TilesCount = JSON.parse(xml2.responseText);

      //initizialing the 7 random letters
      randomize7Images();

      //buttons for user
      document.getElementById("submit").addEventListener("click", SubmitWord);
      document.getElementById("randomize7").addEventListener("click", randomize7Images);
      document.getElementById("blankSubmit").addEventListener("click", submitBlankValue);
 
      }
  };
    xml2.send();


  //restart or new game button
  document.getElementById("restart").addEventListener("click", refresh);

  //each letter is draggables
  $( ".draggable" ).draggable();

  //all 6 pieces of images of baord is dropapable
  makeDroppableTiles();

  //will disable all tiles so user is forced to 
  //go in order
  disable6tiles();
  
 
 
  } );
