$(document).ready(function () {

    let gamePattern = [];
    let buttonColours = ["red", "blue", "green", "yellow"];
    let userPattern = [];
    let level = 0;
    let a = 0;

    //FOR KEYPRESSED
    $(document).keypress(function () {
        alert("Game started!!");
        startGame();
    })


    //FUNCTION FOR CHECK STATUS
    function checkStatus() {
        if (JSON.stringify(userPattern) == JSON.stringify(gamePattern)) {
            userPattern = [];
            addRand();
            console.log("right Ans!");
        }
        else {
            wrongPattern();
        }

    }

    //FUNCTION FOR WRONG PATTERN
    function wrongPattern() {
        mkSound("wrong");
        setTimeout(() => {
            $("body").css("backgroung-color", "red");
        }, 200);
        gamePattern = [];
        userPattern = [];
        $("h1").text("Game Over! press key to restart");
    }




    //FUNCTION TO GENERATE AND ADD
    function addRand() {
        let randomNumber = Math.round(Math.random() * 3);
        let randColour = buttonColours[randomNumber];
        gamePattern.push(randColour);

        level++;
        $("h1").text("here you go, Level " + level);

        setTimeout(() => {
            mkSound(gamePattern[gamePattern.length - 1]);
            animatePress(gamePattern[gamePattern.length - 1]);

        }, 250);

    }



    //FOR GAME STARTING
    function startGame() {
        if (level == 0) {
            $("h1").text("Be Alert, Level 1");
            addRand();
        }
        else {
            alert("something wrong!");
        }

    }


    //FUNCTION FOR MANAGE USERPATTERN ARRAY
    function mngUser(newAdd) {
        userPattern.push(newAdd);
    }


    //FUNCTION FOR USER CLICK
    $(document).click(function (event) {

        let userClickedColour = event.target.id;
        mkSound(userClickedColour);
        animatePress(userClickedColour);

        if (level == 1) {
            mngUser(userClickedColour);
            checkStatus();
        }
        else {
            console.log(userPattern);
            mngUser(userClickedColour);

            if (userPattern[a] !== gamePattern[a]) {
                wrongPattern();
            }
            else {
                a++;
            }
        }
        if (userPattern.length == gamePattern.length) {
            a = 0;
            checkStatus();
        }
    })



    //FUNCTION TO ANIMATE BOXES
    function animatePress(currentColour) {

        $("#" + currentColour).addClass("pressed");

        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 300);

    }
    //FUNCTION FOR MAKE SOUND
    function mkSound(currentColour) {
        var audio = new Audio("currentColour + ".mp3");
        audio.play();
    }




})
