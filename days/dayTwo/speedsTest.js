
const responsesSpeeds = {
    todayDate: getTodayDate(),
    correctRedPressSpeeds: correctRedPressSpeeds,
    correctBluePressSpeeds: correctBluePressSpeeds,
    correctYellowPressSpeeds: correctYellowPressSpeeds,
    correctFirstRedPressSpeeds: correctFirstRedPressSpeeds,
    correctFirstBluePressSpeeds: correctFirstBluePressSpeeds,
    incorrectRedPressSpeeds: incorrectRedPressSpeeds,
    incorrectBluePressSpeeds: incorrectBluePressSpeeds,
    redChoiceSpeeds: redChoiceSpeeds,
    blueChoiceSpeeds: blueChoiceSpeeds,
    yellowChoiceSpeeds: yellowChoiceSpeeds,
    allRedPressesSpeeds: allRedPressesSpeeds,
    allBluePressesSpeeds: allBluePressesSpeeds,
};

timeoutCountSpeeds = 0;
saveAttemptSpeedss = 0;
SpeedsNum = null;

// Timing of the speed test (ms)
const CAR_INTERVAL_SPEEDS = 1100;   // a new car every 1.1 s
const RESPONSE_WINDOW_SPEEDS = 1100; // presses count for 1.1 s, or until the next car appears
const YELLOW_WINDOW_SPEEDS = 800;    // time to press both buttons for a yellow car (unchanged)


redElement.addEventListener("touchstart", function () {
    allRedPressesSpeeds.push(new Date().getTime() - milliseconds);
    redElement.style.transform = "translateY(10px)";
    redElement.style.webkitTransform = "translateY(10px)";
    setTimeout(() => {
        redElement.style.transform = "initial";
    }, 100); // Adjust the delay as needed
});
blueElement.addEventListener("touchstart", function () {
    allBluePressesSpeeds.push(new Date().getTime() - milliseconds);
    blueElement.style.transform = "translateY(10px)";
    blueElement.style.webkitTransform = "translateY(10px)";
    setTimeout(() => {
        blueElement.style.transform = "initial";
    }, 100); // Adjust the delay as nee

});

function yellowPressSpeeds() {
    if (red_yellow && blue_yellow) {
        correctYellowPressSpeeds.push(new Date().getTime() - milliseconds);
        red_yellow = false;
        blue_yellow = false;
    }
}

// Closes the response window of the car currently on screen (if any).
let closeCurrentCarSpeeds = null;
function closeCarSpeeds() {
    if (closeCurrentCarSpeeds) {
        closeCurrentCarSpeeds();
    }
}

// Shows a red or blue car and records its presses.
// Each car has its own press handlers, so closing one car's window can never
// remove the handlers of the next car. The window closes after
// RESPONSE_WINDOW_SPEEDS ms, or earlier when the next car appears.
function launchCarSpeeds(isRed, carSpeed) {
    closeCarSpeeds();
    (isRed ? redChoiceSpeeds : blueChoiceSpeeds).push(new Date().getTime() - milliseconds);
    let carElement = document.getElementById(isRed ? "redCar" : "blueCar");
    // hide the car and force the browser to apply it, so the animation restarts
    // even when the previous car of this color was reset in the same moment
    carElement.style.display = "none";
    void carElement.offsetWidth;
    carElement.style.display = "inline";
    carElement.style.animationPlayState = "running";
    carElement.style.animationDuration = String(carSpeed) + "s";

    let correctElement = isRed ? redElement : blueElement;
    let wrongElement = isRed ? blueElement : redElement;
    let correctFirstList = isRed ? correctFirstRedPressSpeeds : correctFirstBluePressSpeeds;
    let correctList = isRed ? correctRedPressSpeeds : correctBluePressSpeeds;
    let incorrectList = isRed ? incorrectBluePressSpeeds : incorrectRedPressSpeeds;

    let presses = 0;
    let onCorrectPress = function () {
        presses++;
        if (presses == 1) {
            correctFirstList.push(new Date().getTime() - milliseconds);
        } else {
            correctList.push(new Date().getTime() - milliseconds);
        }
    };
    let onWrongPress = function () {
        incorrectList.push(new Date().getTime() - milliseconds);
    };
    correctElement.addEventListener("touchstart", onCorrectPress);
    wrongElement.onclick = onWrongPress;

    let closed = false;
    let closeThisCar = function () {
        if (closed) {
            return;
        }
        closed = true;
        correctElement.removeEventListener("touchstart", onCorrectPress);
        if (wrongElement.onclick === onWrongPress) {
            wrongElement.onclick = null;
        }
        if (closeCurrentCarSpeeds === closeThisCar) {
            closeCurrentCarSpeeds = null;
        }
    };
    closeCurrentCarSpeeds = closeThisCar;
    setTimeout(closeThisCar, RESPONSE_WINDOW_SPEEDS);
}

//let sessionIntervalSpeeds = null;
let endSpeeds = null;
let countSpeeds = 0;
// immediate = true launches the first car straight away. It is used when the
// cars restart after a special or yellow car, so that every car still comes
// CAR_INTERVAL_SPEEDS after the previous one.
async function startIntervalSpeeds(immediate = false) {
    if (endSpeeds) { // the 90 s test has already ended: don't restart the cars
        return;
    }
    document.getElementById("redButton").style.display = "inline";
    document.getElementById("blueButton").style.display = "inline";
    document.getElementById("gameScreen").style.display = "inline";
    let randCount = randCountAirplane();
    return new Promise(resolve => {
        function carMove() {
            let choseCar = randColorSpeeds();
            let carSpeed = randSpeedCarSpeeds();
            buttonChoice = 0;
            redPress = 0;
            bluePress = 0;
            if (countSpeeds >= randCount) {
                clearInterval(sessionIntervalSpeeds);
                closeCarSpeeds();
                document.getElementById("yellowCar").style.display = "inline";
                document.getElementById("yellowCar").style.animationPlayState = "running";
                yellowChoiceSpeeds.push(new Date().getTime() - milliseconds);
                platform.saveSession(responsesSpeeds, false);
                redElement.addEventListener("touchstart", yellowRed);
                blueElement.addEventListener("touchstart", yellowBlue)
                setTimeout(() => {
                    reset_yellowCar();
                    countSpeeds = 0;
                    yellowPressSpeeds();
                    redElement.removeEventListener("touchstart", yellowRed);
                    blueElement.removeEventListener("touchstart", yellowBlue);
                }, YELLOW_WINDOW_SPEEDS);
                setTimeout(() => {
                    startIntervalSpeeds(true);
                }, CAR_INTERVAL_SPEEDS);
            } else if (countSpeeds == 12 || countSpeeds == 5 || countSpeeds == 2) {
                countSpeeds++;
                clearInterval(sessionIntervalSpeeds);
                let isRed = choseCar >= 0.5;
                launchCarSpeeds(isRed, 1.1);
                setTimeout(() => {
                    if (isRed) {
                        reset_redCar();
                    } else {
                        reset_blueCar();
                    }
                    startIntervalSpeeds(true);
                }, CAR_INTERVAL_SPEEDS);
            } else {
                countSpeeds++;
                let isRed = choseCar >= 0.5;
                launchCarSpeeds(isRed, carSpeed);
                // the car leaves the screen after carSpeed s; its presses still count for RESPONSE_WINDOW_SPEEDS
                setTimeout(() => {
                    if (isRed) {
                        reset_redCar();
                    } else {
                        reset_blueCar();
                    }
                }, carSpeed * 1000);
            };
        }
        sessionIntervalSpeeds = setInterval(carMove, CAR_INTERVAL_SPEEDS);
        if (immediate) {
            carMove();
        }

        let sessionTimerSpeeds = setTimeout(function timecountSpeeds() {
            // document.getElementById("blueButton").style.display = "none";
            // document.getElementById("redButton").style.display = "none";
            clearInterval(sessionIntervalSpeeds);
            clearTimeout(sessionTimerSpeeds);
            // reset_airplane();
            // reset_blueCar();
            // reset_redCar();
            timeoutCountSpeeds++;
            endSpeeds = 1;
            if (timeoutCountSpeeds == 1) {
                closeCarSpeeds();
                function savingSpeedss() {
                    platform.saveSession(responsesSpeeds, false).then(() => {
                        resolve("done4");
                    }).catch(() => {
                        if (saveAttemptSpeedss >= 2000) {
                            problemOrient();
                        } else {
                            saveAttemptSpeedss++;
                            savingSpeedss()
                        }
                    });
                }
                savingSpeedss();
            } else {
                clearInterval(sessionIntervalSpeeds);
                clearTimeout(sessionTimerSpeeds);
                // reset_airplane();
                // reset_blueCar();
                // reset_redCar();
            }
        }, 90000);
        // }, 30000);
    })
};
