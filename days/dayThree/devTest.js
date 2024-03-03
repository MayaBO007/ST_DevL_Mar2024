

const responsesDev = {
    todayDate: getTodayDate(),
    correctRedPressDevtest: correctRedPressDevtest,
    correctBluePressDevtest: correctBluePressDevtest,
    correctYellowPressDevtest: correctYellowPressDevtest,
    correctFirstRedPressDevtest: correctFirstRedPressDevtest,
    correctFirstBluePressDevtest: correctFirstBluePressDevtest,
    incorrectRedPressDevtest: incorrectRedPressDevtest,
    incorrectBluePressDevtest: incorrectBluePressDevtest,
    redChoiceDev: redChoiceDev,
    blueChoiceDev: blueChoiceDev,
    allRedPressesDev: allRedPressesDev,
    allBluePressesDev: allBluePressesDev,
    allCorrectFirstPressDev: allCorrectFirstPressDev,
    allChoicesDev: allChoicesDev,
    devButton: devButton
};
let saveAttemptDev = 0;
// 1=red, 2=blue buttons
//let buttonChoice = null;
// let sessionInterval = null;
// let startGame = null;
let startClickDev = null;

redElement.addEventListener("touchstart", function () {
    allRedPressesDev.push(new Date().getTime() - milliseconds);
    redElement.style.transform = "translateY(10px)";
    redElement.style.webkitTransform = "translateY(10px)";
    setTimeout(() => {
        redElement.style.transform = "initial";
    }, 100); // Adjust the delay as needed
});
blueElement.addEventListener("touchstart", function () {
    allBluePressesDev.push(new Date().getTime() - milliseconds);
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

function yellowPressDev() {
    if (red_yellow && blue_yellow) {
        correctYellowPressDevtest.push(new Date().getTime() - milliseconds);
        red_yellow = false;
        blue_yellow = false;
    }
}

async function startDevTest() {
    return new Promise(resolve => {
        breaks = 0;
        countingCars = 0;
        count = 0;
        function startIntervalDevtest() {
            let randCount = randCountAirplane();
            document.getElementById("redButton").style.display = "inline";
            document.getElementById("blueButton").style.display = "inline";
            document.getElementById("gameScreen").style.display = "inline";
            sessionIntervalTest = setInterval(
                function carMove() {
                    let choseCar = randColorDev();
                    let carSpeed = randSpeedCar();
                    blueElement.removeEventListener("click", function () {
                        correctBluePressDevtest.push(new Date().getTime() - milliseconds);
                    })
                    redElement.removeEventListener("click", function () {
                        correctRedPressDevtest.push(new Date().getTime() - milliseconds);
                    })
                    buttonChoice = 0;
                    if (count >= randCount) {
                        clearInterval(sessionIntervalTest);
                        document.getElementById("yellowCar").style.display = "inline";
                        document.getElementById("yellowCar").style.animationPlayState = "running";
                        yellowChoice.push(new Date().getTime() - milliseconds);
                        platform.saveSession(responsesDev, false);
                        redElement.addEventListener("click", function () {
                            red_yellow = true;
                        });
                        blueElement.addEventListener("click", function () {
                            blue_yellow = true;
                        });
                        setTimeout(() => {
                            sessionIntervalTest();
                            reset_yellowCar();
                            count = 0;
                            yellowPressDev();
                            redElement.removeEventListener("click", function () {
                                red_yellow = true;
                            });
                            blueElement.removeEventListener("click", function () {
                                blue_yellow = true;
                            });
                        }, 800);
                    } else {
                        count++;
                        countingCars++;
                        if (choseCar >= 0.5) {
                            document.getElementById("redCar").style.display = "inline";
                            document.getElementById("redCar").style.animationPlayState = "running";
                            document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                            document.getElementById("redButton").onclick = function () {
                                correctFirstRedPressDevtest.push(new Date().getTime() - milliseconds);
                            }.then(() => {
                                redElement.addEventListener('click', () => {
                                    correctRedPressDevtest.push(new Date().getTime() - milliseconds);
                                })
                            });
                            document.getElementById("blueButton").onclick = function () {
                                incorrectBluePressDevtest.push(new Date().getTime() - milliseconds);
                            };

                            setTimeout(() => {
                                reset_redCar();
                            }, carSpeed * 1000);
                        } else {
                            document.getElementById("blueCar").style.display = "inline";
                            document.getElementById("blueCar").style.animationPlayState = "running";
                            document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                            document.getElementById("redButton").onclick = function () {
                                incorrectRedPressDevtest.push(new Date().getTime() - milliseconds);
                            };
                            document.getElementById("blueButton").onclick = function () {
                                correctFirstBluePressDevtest.push(new Date().getTime() - milliseconds);
                            }.then(() => {
                                blueElement.addEventListener('click', () => {
                                    correctBluePressDevtest.push(new Date().getTime() - milliseconds);
                                });
                            });

                            setTimeout(() => {
                                reset_blueCar();
                            }, carSpeed * 1000);
                        }

                        // if (countingCars >= 280 & breaks <= 2) {
                        //     clearInterval(sessionIntervalTest);
                        //     reset_redCar();
                        //     reset_blueCar();
                        //     reset_airplane();
                        //     document.getElementById("gameScreen").style.display = "none";
                        //     document.getElementById("redButton").style.display = "none";
                        //     document.getElementById("blueButton").style.display = "none";
                        //     document.getElementById("break").style.display = "inline";
                        //     document.getElementById("iframe-element3").src = "../../timer/timer3.html";
                        //     document.getElementById("iframe-element3").style.display = "inline";
                        //     document.getElementById("iframe-element3").style.top = "0%";
                        //     countingCars = 0;
                        //     setTimeout(() => {
                        //         startIntervalDevtest();
                        //         document.getElementById("iframe-element3").src = "";
                        //         document.getElementById("iframe-element3").style.display = "none";
                        //     }, 30500);
                        //     breaks++;
                        // }
                    }

                }, 1200);// (Maximal carSpeed)*1000

            let sessionTimerTest = setTimeout(function timeCount() {
                document.getElementById("blueButton").style.display = "none";
                document.getElementById("redButton").style.display = "none";
                clearInterval(sessionIntervalTest);
                clearTimeout(sessionTimerTest);
                function savingDev() {
                    platform.saveSession(responsesDev, false).then(() => {
                        resolve("doneDevTest");
                        reset_yellowCar();
                        reset_blueCar();
                        reset_redCar();
                    }).catch(() => {
                        if (saveAttemptDev >= 2000) {
                            problemOrient();
                        } else {
                            saveAttemptDev++;
                            savingDev()
                        }
                    });
                }
                savingDev();
            }, 250000);
            // }, 3000);
        };
        startIntervalDevtest();
    });
}
