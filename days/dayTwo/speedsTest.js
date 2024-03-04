
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

//let sessionIntervalSpeeds = null;
let endSpeeds = null;
let countSpeeds = 0;
async function startIntervalSpeeds() {
    document.getElementById("redButton").style.display = "inline";
    document.getElementById("blueButton").style.display = "inline";
    document.getElementById("gameScreen").style.display = "inline";
    let randCount = randCountAirplane();
    return new Promise(resolve => {
        sessionIntervalSpeeds = setInterval(
            function carMove() {
                let choseCar = randColorSpeeds();
                let carSpeed = randSpeedCarSpeeds();
                buttonChoice = 0;
                redPress = 0;
                bluePress = 0;
                if (countSpeeds >= randCount) {
                    clearInterval(sessionIntervalSpeeds);
                    document.getElementById("yellowCar").style.display = "inline";
                    document.getElementById("yellowCar").style.animationPlayState = "running";
                    yellowChoiceSpeeds.push(new Date().getTime() - milliseconds);
                    platform.saveSession(responsesSpeeds, false);
                    redElement.addEventListener("click", function () {
                        red_yellow = true;
                    });
                    blueElement.addEventListener("click", function () {
                        blue_yellow = true;
                    });
                    setTimeout(() => {
                        startIntervalSpeeds();
                        reset_yellowCar();
                        countSpeeds = 0;
                        yellowPressSpeeds();
                        redElement.removeEventListener("click", function () {
                            red_yellow = true;
                        });
                        blueElement.removeEventListener("click", function () {
                            blue_yellow = true;
                        });
                    }, 800);
                } else {
                    countSpeeds++;
                    if (choseCar >= 0.5) {
                        document.getElementById("redCar").style.display = "inline";
                        document.getElementById("redCar").style.animationPlayState = "running";
                        document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                        redClick = function () {
                            redPress++;
                            if (redPress == 1) {
                                correctFirstRedPressSpeeds.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPressSpeeds.push(new Date().getTime() - milliseconds);
                            }
                        };
                        redElement.addEventListener("click", redClick);
                        blueElement.onclick = function () {
                            incorrectBluePressSpeeds.push(new Date().getTime() - milliseconds);
                        };

                        setTimeout(() => {
                            reset_redCar();
                            redElement.removeEventListener("click", redClick);
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        redElement.onclick = function () {
                            incorrectRedPressSpeeds.push(new Date().getTime() - milliseconds);
                        };
                        blueClick = function () {
                            bluePress++;
                            if (bluePress == 1) {
                                correctFirstBluePressSpeeds.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePressSpeeds.push(new Date().getTime() - milliseconds);
                            }
                        }
                        blueElement.addEventListener("click", blueClick);

                        setTimeout(() => {
                            reset_blueCar();
                            blueElement.removeEventListener("click", blueClick)
                        }, carSpeed * 1000);
                    };

                };
            }, 1200);// (Maximal carSpeed)*1000

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