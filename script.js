const SUPABASE_URL = 'https://nzaovbuscxgdzzbqjjqp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jPWmkSJKrD083SCnfnXJ_w_DerPmGrN';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let database = []; 
let currentVideo = null;

const input = document.getElementById("guessForm"); 
const submitBtn = document.getElementById("submitBtn"); 
const resultGuess = document.getElementById("guessrank");
const resultActual = document.getElementById("actualrank");

var rank = //getFromDb;

// rank calculation
function compareGuess(guess, rank){
    let digit = rankToDigit(rank);
    return _calculateScore(rank, digit, guess);
}

function rankToDigit(rank){
    if (rank >= 1000000) return 7;
    if (rank >= 100000)  return 6;
    if (rank >= 10000)   return 5;
    if (rank >= 1000)    return 4;
    if (rank >= 100)     return 3;
    if (rank >= 10)      return 2;
    return 1;
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



// gameplay loop
submitBtn.addEventListener("click", function (event){
    const userGuess = parseInt(input.value);
    if (isNaN(userGuess)) {
        alert("Please enter a valid number!");
        return;
    }
    // Capture the score
    const score = compareGuess(userGuess, currentVideo.rank);
    // Update the UI fields
    resultGuess.innerText = `#${userGuess.toLocaleString()}`;
    resultActual.innerText = `#${currentVideo.rank.toLocaleString()}`;
    document.getElementById("difference").innerText = `${Math.abs(userGuess - currentVideo.rank).toLocaleString()} ranks`;

    // Show results
    document.querySelector(".guesspanel").classList.remove("is-active");
    document.querySelector(".resultspanel").classList.add("is-active");
});

function nextRound(){
    currentVideo = getRandomVideo();
    playVideo(currentVideo.video_url);
    input.value = "";
}

function getRandomVideo(){
    // changing database to a dictionary might be easier for rank retrieval
    const index = Math.floor(Math.random() * database.length);
    return database[index];
}

function playVideo(videoPath){
    videoPlayer.src = videoPath;
    videoPlayer.load();
    videoPlayer.play();
}

const slider = document.getElementById("slider");

slider.addEventListener("input", function() {
    input.value = slider.value;
});

input.addEventListener("input", function() {
    slider.value = input.value;
});

// supabase
async function getClips() {
    const { data, error } = await supabaseClient
        .from('clips')
        .select('*');

    if (error) {
        console.error("Error fetching clips:", error);
        return;
    }

    database = data; 
    if (database.length > 0) {
        nextRound();
    }
}

getClips();

