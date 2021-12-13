var dropeditem = "test";

var word = {
  word: "",
  value: 0, 
  isDefine: "false"
}

var Tiles ={
  tile1: "",
  tile2: "",
  tile3: "",
  tile4: "",
  tile5: "",
  tile6: "",
  tile7: "",
}


function makeDroppableTiles(){

  $("#tile1").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile1 = letter;
      console.log("tile1 " + " letter is " + letter);

      ui.draggable.css({ height : $(this).height() });
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  $("#tile2").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile2 = letter;
      console.log("tile2 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  $("#tile3").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile3 = letter;
      console.log("tile3 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  $("#tile4").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile4 = letter;
      console.log("tile4 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });


  $("#tile5").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile5 = letter;
      console.log("tile5 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  $("#tile6").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile6 = letter;
      console.log("tile6 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  $("#tile7").droppable({
    drop: function( event, ui ) {
      console.log('drop');
      dropeditem = ui.draggable.prop("src");
      var length = dropeditem.length - 5;
      letter = dropeditem.charAt(length);
      Tiles.tile7 = letter;
      console.log("tile7 " + " letter is " + letter);
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });


}
$( function() {

  $( ".draggable" ).draggable();
  makeDroppableTiles();

  var xml = new XMLHttpRequest();
  xml.open('GET', "graphics_data/pieces.json");
  xml.onload = function(){
    console.log(xml.responseText);
  };
  xml.send();






  } );


