// Guess Verification
const form = document.getElementById("guessForm");
const input = document.getElementById("rankGuess");

form.addEventListener("submit", function (event){
    event.preventDefault();
});

const guess = input.value;

var rank = //getFromDb;

function compareGuess(guess, rank){
    let digit = rankToDigit(rank);
    return _calculateScore(rank, digit, guess);
}

function rankToDigit(rank){
    if (rank > 1000000 && rank <= 100000){
        return 6;
    }else if (rank > 100000 && rank <= 10000){
        return 5;
    }else if (rank > 10000 && rank <= 1000){
        return 4;
    }else if (rank > 1000 && rank <= 100){
        return 3;
    }else if (rank > 100 && rank <= 10){
        return 2;
    }else if (rank > 10 && rank <= 1){
        return 1;
    }else{
        return 7;
    }
}
//ME is MARGIN_OF_ERROR
const SEVEN_DIGIT_ME = 500000;
const SIX_DIGIT_ME = 50000;
const FIVE_DIGIT_ME = 5000;
const FOUR_DIGIT_ME = 500;
const THREE_DIGIT_ME = 50;

function _calculateScore(rank, digit, guess){
    let ME = 0;
    switch (digit){
        case 7:
            ME = SEVEN_DIGIT_ME;
            break;
        case 6:
            ME = SIX_DIGIT_ME;
            break;
        case 5:
            ME = FIVE_DIGIT_ME;
            break;
        case 4:
            ME = FOUR_DIGIT_ME;
            break;
        //3 digit margin of error will be used for 3, 2 and 1 digits because of the small range of players
        case 3:
            ME = THREE_DIGIT_ME;
            break;
        case 2:
            ME = THREE_DIGIT_ME;
            break;
        case 1:
            ME = THREE_DIGIT_ME;
            break;
    }
    let score = 0;
    if (guess == rank){
        score += 1000;
    }else if (guess <= rank + ME && guess >= rank - ME){
        score += 300;
    }else if (guess <= rank + (ME * 1.5) && guess >= rank - (ME * 1.5)){
        score += 100;
    }
    return score;
}

// Video Clips
const videoPlayer = document.getElementById("videoPlayer");
const randomBtn = document.getElementById("nextBtn");
// Store clips
// Randomly Select a clip to send to html
function playVideo(videoPath){
    videoPlayer.src = videoPath;
    videoPlayer.load();
    videoPlayer.play();
}

function getRandomVideo(){
    // changing database to a dictionary might be easier for rank retrieval
    const index = Math.floor(Math.random() * database.length);
    return database[index];
}

randomBtn.addEventListener("click", playVideo);

// Get player information adjacent to the clips

// Optional receive clips and send to database