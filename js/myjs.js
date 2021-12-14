var Game ={
    score: 0,
    TilesLeft: 100
  }
  
  
var Word = {
    word: "",
    score: 0, 
    isDefine: "false",
    isDouble1: "false",
    isDouble2: "false"
}

var Tiles = [' ', ' ', ' ', ' ', ' ', ' ', ' '];

var IdOrder = [' ', ' ', ' ', ' ', ' ', ' ', ' '];


function randomNumber(){
    return Math.floor(Math.random() * 27);
  
}
  
function refresh(){
  location.reload();
}


function SubmitWord(){
    var word = '';
  
    //find length of word
    for(var i = 0; i < 7; i++){
      if(Word.word[i] === ' '){
        console.log(Word.word[i]);
        break;
      }
      word += Word.word[i];
    }
  
    //update remaining tiles
    Game.TilesLeft -= word.length;
    $("#remaining").text("Remaining Tiles: " + Game.TilesLeft);
    //update Game score
    Game.score += Word.score;
    $("#gameScore").text("Game Score: " + Game.score);
  
   //console.log("Word is " + word + " lengeth is " + word.length);
    //change tile amount
    for(var i = 0; i < word.length; i++){
      for(var k = 0; k < 27; k++){
        if(TilesCount.imageCount[k].letter === word[i]){
          TilesCount.imageCount[k].amount--;
        }
      } 
    }
  
    replaceTiles();
    //reset word:
    clearTilesArr();
    Word.word = " ";
    $("#word").text("Word: " + Word.word);
    Word.score = 0;
    $("#score").text("Score: " + Word.score);
  
  }

function clearTilesArr(){
    for(var i = 0; i < 7; i++){
        Tiles[i] = ' ';
    }  
}  

function updateScore(){
    if(Word.isDouble1 === "true"){
      Word.score = Word.score * 2;
    }
  
    if(word.isDouble2 === "true"){
      Word.score = Word.score * 2;
    }
    $("#score").text("Score: " + Word.score);
}


function updateWord(){
 //https://stackoverflow.com/questions/24597634/how-to-generate-an-array-of-alphabet-in-jquery
    var alph = 'ABCDEFGHIJKLMONPQRSTUVWXYZ_'.split('');
    Word.word = '';
    var score = 0; 
    for(var i = 0; i < 7; i++){
      Word.word += Tiles[i];
      for(var j = 0; j < 27; j++){
          currentC = alph[j];
          if(currentC == Tiles[i]){
              score += ScrabbleTiles[currentC].value;
            
            }
      }
    }
  
    Word.score = score;
    //console.log(Word.score);
    $("#word").text("Word: " + Word.word);
    updateScore();
    

}

function replaceTiles(){
    var word = Word.word;
    for(var i = 0; i < 7; i++){
      if(IdOrder[i] === ' ' ){
        continue;
      }
      var rand = randomNumber();
  
      if(TilesCount.imageCount[rand].amount <= 0){
        i--;
      } else if(TilesCount.imageCount[rand].amount > 0){
        var str =TilesCount.imageCount[rand].src;
        $('#' + IdOrder[i]).remove();
        var img = $('<img id="' + IdOrder[i] +'">');
        img.attr("src", TilesCount.imageCount[rand].src);
        img.addClass("draggable");
        img.appendTo("#tileRack");
        console.log(img);
       // $('#' + IdOrder[i]).after("#tileRack");
       // $('#' + IdOrder[i]).attr("src", TilesCount.imageCount[rand].src);
      }
      $( ".draggable" ).draggable();
    }
  }



function randomize7Images(){
  
    for(var i = 1; i <= 7; i++){
      var num = randomNumber();
      if(TilesCount.imageCount[num].amount <= 0){
        i--;//repeat
      }else if(TilesCount.imageCount[num].amount > 0){
          if(TilesCount.imageCount[num].letter == '1')
            enableBlank();
  
        var str =TilesCount.imageCount[num].src;
        $("#letter" + i).attr("src", TilesCount.imageCount[num].src);
       
      }
    }
}

function submitBlankValue(){
    var val = document.getElementById("blankValue").value
    var id;
  
    for(var i = 0; i < 7; i++){
      var str = String($("#letter" + i).attr("src"));
      index = str.length - 5;//where value resides
      var letter = str.charAt(index);
      if(letter == "1"){
        var src = str.substring(0, index)+ val + str.substring(index+1, str.length);
        $("#letter" + i).attr("src", src);
        break;
        //makeDroppableTiles();
      }
    }
  
  }

  
  

  function makeDroppableTiles(){
    letter = '-';
    $("#tile1").droppable({
      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[0] = letter;
        IdOrder[0] = ui.draggable.prop('id');
        console.log("tile1 " + " letter is " + letter);
  
        updateWord();
  
  
        ui.draggable.css({ height : $(this).height() });
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
  
    //double word tile
    $("#tile2").droppable({
      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[1] = letter;
        IdOrder[1] = ui.draggable.prop('id');
        console.log("tile2 " + " letter is " + letter);
        Word.isDouble1 = "true";
  
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile3").droppable({
      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[2] = letter;
        IdOrder[2] = ui.draggable.prop('id');
        console.log("tile3 " + " letter is " + letter);
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile4").droppable({
      drop: function( event, ui ) {
        letter = ' ';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[3] = letter;
        IdOrder[3] = ui.draggable.prop('id');
        console.log("tile4 " + " letter is " + letter);
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
  
    $("#tile5").droppable({
      drop: function( event, ui ) {
        letter = '-';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[4] = letter;
        IdOrder[4] = ui.draggable.prop('id');
        console.log("tile5 " + " letter is " + letter);
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile6").droppable({
      drop: function( event, ui ) {
        letter = '-';
        dropeditem = ui.draggable.prop("src");
        var length = dropeditem.length - 5;
        letter = dropeditem.charAt(length);
        Tiles[5] = letter;
        IdOrder[5] = ui.draggable.prop('id');
        console.log("tile6 " + " letter is " + letter);
        updateWord();
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
  
    $("#tile7").droppable({
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
    $( "#blankForm :input" ).prop( "disabled", true );

var  xml2 = new XMLHttpRequest();
  xml2.open("GET", "https://prerich.github.io/Scrabble/graphics_data/imageCount.json");
  xml2.onload = function(){
    if(this.status == 200){
      //console.log(xml2.responseText);
      TilesCount = JSON.parse(xml2.responseText);
     // TilesCount.imageCount[0].letter = JSON.stringify('a');
      //console.log(TilesCount.imageCount[0].letter);
      randomize7Images();
      document.getElementById("submit").addEventListener("click", SubmitWord);
      document.getElementById("randomize7").addEventListener("click", randomize7Images);
      document.getElementById("blankSubmit").addEventListener("click", submitBlankValue);
 
      }
  };
    xml2.send();

  $( ".draggable" ).draggable();
  makeDroppableTiles();






  } );
