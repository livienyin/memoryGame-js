var currentGame;
var gameTimer;

function timeStart() {
 var count = 0; 
 gameTimer = setInterval(function (){
   count += 1;
   timerDiv = $("#timer")[0]
   timerDiv.innerHTML = "Timer: " + count.toString() + " secs";
 }, 1000);
}

function checkForWin(){
  if($('.hidden').length === 0){
    clearInterval(gameTimer);
  }
}

function smallGame (){
  timeStart();
  var square1;
  var square2;
  var letterArray = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E"];
  var shuffledArray = _.shuffle(letterArray);
  console.log(shuffledArray);
  for (var i = 0; i < shuffledArray.length; i += 1){
    var divElement = $("<div/>");
    var gameSquares = $("#game_squares");
    var square = shuffledArray[i];
    divElement.attr('class', 'hidden');
    divElement.attr('data-id', i);
    divElement.append(square);
    gameSquares.append(divElement);
  }

  $(".hidden").mouseover(function(){
    $(this).addClass("hover");
  });

  $(".hidden").mouseout(function(){
    $(this).removeClass("hover");
  });

  $(".hidden").on('click', function() {
    revealedElements = $(".revealed");
    console.log(revealedElements);
    console.log(revealedElements.html());
    console.log($(this).html());
    if(revealedElements.length === 0) {
      $(this).addClass("revealed");
    } else if($(".revealed").html() === $(this).html()){
      $(this).addClass("matched");
      $(".revealed").addClass("matched");
      $(".revealed").unbind('click mouseover');
      $(".revealed").removeClass("hidden revealed");
      $(this).removeClass("hidden revealed");
      checkForWin();
    } else {
      $(this).addClass("revealed");
      setTimeout(function() {$(".revealed").removeClass("revealed") }, 800);
    }
  });
}

$(document).ready(function(){
  var letterArray = [];
  $("#easy_btn").on('click', smallGame);
});
