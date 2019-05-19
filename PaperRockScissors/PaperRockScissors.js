'use strict';
(function(){

//DOM Varriaty Section
var modal = document.getElementById("myModal");
var scissors = document.getElementById("scissors");
var paper = document.getElementById("paper");
var rock = document.getElementById("rock");
var ng = document.getElementById("ng");
var res = document.getElementById("res");
var roundsnumber = document.getElementById("roundsnumber"); 
var manualplay = document.getElementById("manualplay"); 
var autoplay = document.getElementById("autoplay"); 
var com = document.getElementById("communicat");

var play;
var round;
var roundleft;
var player1; var player2;
var p1score = 0;
var p2score = 0;

//MODAL SECTION
// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
   modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// set round value after click subbmit button
document.getElementById("setsubm").addEventListener("click", 
    function(){
        round = parseInt(document.getElementById("rounds").value);

        if( isNaN(round) === true || round === undefined){
            alert("You must set number of rounds!");
        }
        else{
            roundleft = round;
            if(manualplay.checked === true){
                play = "manual";
            }
            if(autoplay.checked === true){
                play = "auto";
            }
            modal.style.display = "none";
            roundsnumber.innerHTML = "Number of rounds: " + roundleft;  
            com.innerHTML = "Player 1 turn!<br>";
        }
    }
);



//LOGIC SECTION
function setter(event){
    if (play === "manual"){
        if (player1 === undefined && player2 === undefined){

            if (roundleft === 0) {
                alert("Game is END! Please start New Game!");
            }
            else {
                player1 = event.currentTarget.id;
                com.innerHTML = "Player 1 choose: " + player1 + "!" + "<br> Player 2 turn!<br>";
            }
        }

        else if ( player2 === undefined){
            player2 = event.currentTarget.id;
            com.innerHTML = "Player 2 choose: " + player2  + "!<br>";
            conditions();
            transition();
        }
    }
    if (play === "auto") {

        if (roundleft === 0) {
            alert("Game is END! Please start New Game!");
        }
        else {
            var variables = ["rock", "scissors", "paper"];
            player1 = event.currentTarget.id;
            com.innerHTML = "Player 1 choose: " + player1 + "!" + "<br> Player 2 turn!<br>";            
            player2 = variables[Math.floor(Math.random() * 3)];
            com.innerHTML += "Player 2 choose: " + player2  + "!<br>";
            conditions();
            transition();
        }
    } 
}

//Condition of winning SECTION
function conditions(){

    if((player1 === "scissors" && player2 === "rock") || (player1 === "rock" && player2 === "paper") || (player1 === "paper" && player2 === "scissors")){
        p2score++;
        roundleft--;
        com.innerHTML += "Player 2 is winning " + (round - roundleft) + " round!";
    }
    if((player1 === "scissors" && player2 === "paper") || (player1 === "paper" && player2 === "rock") || (player1 === "rock" && player2 === "scissors")){
        p1score++;
        roundleft--;
        com.innerHTML += "Player 1 is winning round " + (round - roundleft) + " !";
    }
    if((player1 === "scissors" && player2 === "scissors") || (player1 === "paper" && player2 === "paper") || (player1 === "rock" && player2 === "rock")){ 
        com.innerHTML += "REMIS! Repeat round " + (round - roundleft) + " !";
    }
}
function transition(){
    roundsnumber.innerHTML = "Number of rounds: " + roundleft;

    if (p1score === round ) {
        com.innerHTML += "<br>Player 1 WON!!";
    }
    if (p2score === round ) {
        com.innerHTML += "<br>Player 2 WON!!";
    }

    if (roundleft !== 0) {
        com.innerHTML +=  "<br>Player 1 turn!<br>";
        player1 = undefined;
        player2 = undefined;
        
    }
}
//ACTIONS
    
scissors.addEventListener("click", setter);
paper.addEventListener("click", setter);
rock.addEventListener("click", setter);

ng.onclick = function() {
    player1 = undefined;
    player2 = undefined;
    p1score = 0;
    p2score = 0;
    modal.style.display = "block";
  }
res.onclick = function() {
    roundleft = round;
    roundsnumber.innerHTML = "Number of rounds: " + roundleft;
    player1 = undefined;
    player2 = undefined;
    p1score = 0;
    p2score = 0;
}

})();
