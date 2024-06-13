const items = document.querySelectorAll(".item");
const popup = document.querySelector(".popup");
const newGame = document.querySelector("#new-game");
const message = document.querySelector("#message");
const playerTurn = document.querySelector("#player-turn");

// x play first
let xTurn = true;
let count = 0;

//display X or O on click
items.forEach((element) => {
    element.addEventListener("click", () =>{
        if(xTurn){
            xTurn = false;

            //change player from x to o
            playerTurn.innerText = 'O Turn';
            playerTurn.classList.remove('x');
            playerTurn.classList.add('o');

            //display of o
            element.innerText = "X";
            element.classList.remove('o');
            element.classList.add('x');
        }
        else{
            xTurn = true;

            //change player from o to x
            playerTurn.innerText = 'X Turn';
            playerTurn.classList.remove('o');
            playerTurn.classList.add('x');

            //display of x
            element.innerText = "O";
            element.classList.remove('x');
            element.classList.add('o');
        }

        //disable the button when the button is already clicked
        element.disabled = true;

        //increment the count on each click
        count += 1;
        if(count == 9){
            drawMatch();
        }

        //check for win for every click
        checkWin();
    })
});

//disable all buttons at end of match

const disableButtons =() => {
    items.forEach((element) => {
        element.disabled = true;
    });

    //popup showing
    popup.classList.remove("hide");

};

//enable all buttons for new game

const enableButtons = () => {
    items.forEach ((element) => {
        //Reset all o and x text
        element.innerText = "";
        element.disabled = false;
    });

    //hide popup
    popup.classList.add("hide");
};

//executed when player wins
const winMatch = (player) => {
    disableButtons();
    if(player == "X"){
        message.innerText = "X Wins";
    }
    else{
        message.innerText = "O Wins";
    }
};

//Executed when match is draw
const drawMatch = () => {
    disableButtons();
    message.innerText = "The match is tie!";
}

//new game
newGame.addEventListener("click", () => {
    count = 0;
    enableButtons();

    //set x into first player
    xTurn = true;
    playerTurn.innerText = "X Turn";
    playerTurn.classList.remove('o');
    playerTurn.classList.add('x');
});

//logic of winning game
const checkWin = () => {
    //winning pattern
    const winningPattern =[
        [0,1,2],
        [0,3,6],
        [2,5,8],
        [6,7,8],
        [3,4,5],
        [1,4,7],
        [0,4,8],
        [2,4,6],
    ];

    //loop through all winning patterns
    for (let i of winningPattern){
        let [element1, element2, element3] = [
            items[i[0]].innerText,
            items[i[1]].innerText,
            items[i[2]].innerText,
        ];
        //checking if the elements are filled
        if(element1 != "" && (element2 != "") && (element3 != "")){
            //executing winMatch function if 3 empty values elements are same
            if(element1 == element2 && (element2 == element3)){
                winMatch(element1);
            }
        }
    }
}

