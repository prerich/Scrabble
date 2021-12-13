

var Word = {
  word: "",
  score: 0, 
  isDefine: "false",
  isDouble1: "false",
  isDouble2: "false"
}

var defaultTiles; //jason object

var TilesCount;

var Tiles = [' ', ' ', ' ', ' ', ' ', ' ', ' '];

var xml2;

function updateScore(){
  if(Word.isDouble1 === "true"){
    Word.score = Word.score * 2;
  }
  $("#score").text("Score: " + Word.score);
}


//genereate a number between 0 -26
// https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function randomNumber(){
  return Math.floor(Math.random() * 26);

}


function randomize7Images(){

  var num = randomNumber();

  if(TilesCount.imageCount[num].amount > 0){

    console.log(TilesCount.imageCount[num].src);
    var str = String(TilesCount.imageCount[num].src)
    console.log(str);
    $("#tile1").attr("src", str);
    
  }

}
function updateWord(){
  Word.word = '';
  var score = 0;

  for(var i = 0; i < 7; i++){
    Word.word += Tiles[i];
    for(var j = 0; j < 26; j++){
      if(defaultTiles.pieces[j].letter === Tiles[i]){
         score += defaultTiles.pieces[j].value;
      } 
    }
  }

  Word.score = score;
  $("#word").text("Word: " + Word.word);
  updateScore();

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

  var xml = new XMLHttpRequest();
  xml.open('GET', "https://prerich.github.io/Scrabble/graphics_data/pieces.json");
  xml.onload = function(){
    if(this.status == 200){
    defaultTiles = JSON.parse(xml.responseText);
    }
  };
  xml.send();


  xml2 = new XMLHttpRequest();
  xml2.open("GET", "https://prerich.github.io/Scrabble/graphics_data/imageCount.json");
  xml2.onload = function(){
    if(this.status == 200){
      //console.log(xml2.responseText);
      TilesCount = JSON.parse(xml2.responseText);
     // TilesCount.imageCount[0].letter = JSON.stringify('a');
      //console.log(TilesCount.imageCount[0].letter);
      randomize7Images();
      }
  };
    xml2.send();

  


  $( ".draggable" ).draggable();
  makeDroppableTiles();

  } );


