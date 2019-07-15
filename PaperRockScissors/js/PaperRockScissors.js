'use strict';
(function(){

//DOM Varriaty Section
var modal = document.getElementById("myModal");
var endmodal = document.querySelector(".endmodal");
var ng = document.getElementById("ng");
var res = document.getElementById("res");
var roundsnumber = document.getElementById("roundsnumber"); 
var manualplay = document.getElementById("manualplay"); 
var autoplay = document.getElementById("autoplay"); 
var com = document.getElementById("communicat");
var table = document.querySelector(".tablebodystat");
var params = { play: "", movenumber: 1, round: 0, roundleft: 0, player1: undefined, player2: undefined, p1score: 0, p2score: 0, progress: []}

//MODAL SECTION
// When the user clicks on <span> (x), close the modal
Array.from(document.getElementsByClassName("close")).forEach(function(e){
    e.onclick = function() {
        modal.style.display = "none";
        endmodal.style.display = "none";
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == endmodal) {
    modal.style.display = "none";
    endmodal.style.display = "none";
  }
}
// set round value after click subbmit button or ok button
document.getElementById("setsubm").addEventListener("click", 
    function(){
        params.round = parseInt(document.getElementById("rounds").value);

        if( isNaN(params.round) === true || params.round === undefined){
            alert("You must set number of rounds!");
        }
        else{
            if(manualplay.checked === true){
                params.play = "manual";
            }
            if(autoplay.checked === true){
                params.play = "auto";
            }
            params.roundleft = params.round;
            modal.style.display = "none";
            roundsnumber.innerHTML = "Number of rounds: " + params.roundleft;  
            com.innerHTML = "Player 1 turn!<br>";
        }
    }
);
document.querySelector(".endmodal button").addEventListener("click", function(){
    endmodal.style.display = "none";
    params["progress"] = [];
    table.innerHTML = "";
    }
);



//LOGIC SECTION
function setter(event){
    if (params.play === "manual"){
        if (params.player1 === undefined && params.player2 === undefined){

            if (params.roundleft === 0) {
                alert("Game is END! Please start New Game!");
            }
            else {
                params.player1 = event.target.getAttribute('data-move');
                com.innerHTML = "Player 1 end his turn! <br> Player 2 turn!<br>";
            }
        }

        else if ( params.player2 === undefined){
            params.player2 = event.target.getAttribute('data-move');
            com.innerHTML = "Player 2 end his turn! <br>";
            conditions();
            transition();
        }
    }
    if (params.play === "auto") {

        if (params.roundleft === 0) {
            alert("Game is END! Please start New Game!");
        }
        else {
            var variables = ["rock", "scissors", "paper"];
            params.player1 = event.target.getAttribute('data-move');
            com.innerHTML = "Player 1 choose: " + params.player1 + "!" + "<br> Player 2 turn!<br>";            
            params.player2 = variables[Math.floor(Math.random() * 3)];
            com.innerHTML += "Player 2 choose: " + params.player2  + "!<br>";
            conditions();
            transition();
        }
    } 
}

//Condition of winning SECTION
function conditions(){

    if((params.player1 === "scissors" && params.player2 === "rock") || (params.player1 === "rock" && params.player2 === "paper") || (params.player1 === "paper" && params.player2 === "scissors")){
        params.p2score++;
        params.roundleft--;
        params.progress[params.movenumber-1] = {move: params.movenumber, player1: params.player1, player2: params.player2, won:"P2", score: params.p1score + "-" + params.p2score};
        params.movenumber++;
        com.innerHTML += "Player 2 is winning " + (params.round - params.roundleft) + " round!";
    }
    if((params.player1 === "scissors" && params.player2 === "paper") || (params.player1 === "paper" && params.player2 === "rock") || (params.player1 === "rock" && params.player2 === "scissors")){
        params.p1score++;
        params.roundleft--;
        params.progress[params.movenumber-1] = {move: params.movenumber, player1: params.player1, player2: params.player2, won:"P1", score: params.p1score + "-" + params.p2score};
        params.movenumber++;
        com.innerHTML += "Player 1 is winning round " + (params.round - params.roundleft) + " !";
    }
    if((params.player1 === "scissors" && params.player2 === "scissors") || (params.player1 === "paper" && params.player2 === "paper") || (params.player1 === "rock" && params.player2 === "rock")){ 
        com.innerHTML += "REMIS! Repeat round " + (params.round - params.roundleft) + " !";
        params.progress[params.movenumber-1] = {move: params.movenumber, player1: params.player1, player2: params.player2, won:"REMIS", score: params.p1score + "-" + params.p2score};
        params.movenumber++;
    }
}
// Table draw content
function tabledraw(){
        for(var i = 0; i<params.progress.length;i++){
            table.innerHTML += 
            "<tr>" +
            "<td>" + params.progress[i].move + "</td>" +
            "<td>" + params.progress[i].player1 + "</td>" +
            "<td>" + params.progress[i].player2 + "</td>" +
            "<td>" + params.progress[i].won + "</td>" +
            "<td>" + params.progress[i].score + "</td>" +
            "</tr>";
        }
}

function transition(){
    roundsnumber.innerHTML = "Number of rounds: " + params.roundleft;
    if (params.p1score >  params.p2score && params.roundleft === 0 ) {
        endmodal.querySelector("p").innerHTML = "<br>Player 1 WON !!!";
        endmodal.style.display = "block";
        tabledraw();
    }
    if (params.p2score > params.p1score && params.roundleft === 0 ) {
        endmodal.style.display = "block";
        endmodal.querySelector("p").innerHTML = "<br>Player 2 WON !!!";
        tabledraw();
    }
    if (params.p1score === params.p2score && params.roundleft === 0 ) {
        endmodal.style.display = "block";
        endmodal.querySelector("p").innerHTML = "<br>REMIS !!!";
        tabledraw();
    }

    if (params.roundleft !== 0) {
        com.innerHTML +=  "<br>Player 1 turn!<br>";
        params.player1 = undefined;
        params.player2 = undefined;
        
    }
}
//ACTIONS
var playerMove = document.querySelectorAll(".playerMove");
    for(var a =0; a < playerMove.length; a++){
        playerMove[a].addEventListener("click", setter);
    }

ng.onclick = function() {
    params.player1 = undefined;
    params.player2 = undefined;
    params.p1score = 0;
    params.p2score = 0;
    params.movenumber = 1;
    table.innerHTML = "";
    params["progress"] = [];
    modal.style.display = "block";
  }
res.onclick = function() {
    params.roundleft = params.round;
    roundsnumber.innerHTML = "Number of rounds: " + params.roundleft;
    params.player1 = undefined;
    params.player2 = undefined;
    params.p1score = 0;
    params.p2score = 0;
    params.movenumber = 1;
    table.innerHTML = "";
    params["progress"] = [];
}

})();
