
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
    allRedPressesSpeeds: allRedPressesSpeeds,
    allBluePressesSpeeds: allBluePressesSpeeds,
};

timeoutCountSpeeds = 0;

// let redElement = document.getElementById("redButton");
// let blueElement = document.getElementById("blueButton");
// let red_yellow = false;
// let blue_yellow = false;


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
redElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
blueElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

function yellowPressSpeeds() {
    if (red_yellow && blue_yellow) {
        correctYellowPressSpeed.push(new Date().getTime() - milliseconds);
        red_yellow = false;
        blue_yellow = false;
    }
}



saveAttemptSpeeds = 0;
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
                let carSpeed = randSpeedCar();
                blueElement.removeEventListener("touchstart", function () {
                    correctBluePressSpeeds.push(new Date().getTime() - milliseconds);
                })
                redElement.removeEventListener("touchstart", function () {
                    correctRedPressSpeeds.push(new Date().getTime() - milliseconds);
                });
                buttonChoice = 0;
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
                        redElement.onclick = function () {
                            correctFirstRedPressSpeeds.push(new Date().getTime() - milliseconds);
                        }.then(() => {
                            redElement.addEventListener("touchstart", function () {
                                correctRedPressSpeeds.push(new Date().getTime() - milliseconds);
                            });
                        })

                        blueElement.onclick = function () {
                            incorrectBluePressSpeeds.push(new Date().getTime() - milliseconds);
                        }

                        setTimeout(() => {
                            reset_redCar();
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        redElement.onclick = function () {
                            incorrectRedPressSpeeds.push(new Date().getTime() - milliseconds);
                        };
                        blueElement.onclick = function () {
                            correctFirstBluePressSpeeds.push(new Date().getTime() - milliseconds);
                        }.then(() => {
                            blueElement.addEventListener("touchstart", function () {
                                correctBluePressSpeeds.push(new Date().getTime() - milliseconds);
                            })
                        });

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };

                };
            }, 1300);// (Maximal carSpeed)*1000

        let sessionTimerSpeeds = setTimeout(function timecountSpeeds() {
            // document.getElementById("blueButton").style.display = "none";
            // document.getElementById("redButton").style.display = "none";
            clearInterval(sessionIntervalSpeeds);
            clearTimeout(sessionTimerSpeeds);
            reset_airplane();
            // reset_blueCar();
            // reset_redCar();
            timeoutCountSpeeds++;
            endSpeeds = 1;
            if (timeoutCountSpeeds == 1) {
                function savingSpeeds() {
                    platform.saveSession(responsesSpeeds, false).then(() => {
                        resolve("done4");
                    }).catch(() => {
                        if (saveAttemptSpeeds >= 2000) {
                            problemOrient();
                        } else {
                            saveAttemptSpeeds++;
                            savingSpeeds()
                        }
                    })
                }
                savingSpeeds()
            } else {
                clearInterval(sessionIntervalSpeeds);
                clearTimeout(sessionTimerSpeeds);
                reset_airplane();
                // reset_blueCar();
                // reset_redCar();
            }
        }, 90000);
        // }, 30000);
    })
};


