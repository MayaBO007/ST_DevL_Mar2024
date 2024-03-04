

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
    yellowChoiceDev: yellowChoiceDev,
    allRedPressesDev: allRedPressesDev,
    allBluePressesDev: allBluePressesDev,
    allCorrectFirstPressDev: allCorrectFirstPressDev,
    allChoicesDev: allChoicesDev,
    devButton: devButton
};
let saveAttemptDev = 0;

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

function yellowPressDev() {
    if (red_yellow && blue_yellow) {
        correctYellowPressDevtest.push(new Date().getTime() - milliseconds);
        red_yellow = false;
        blue_yellow = false;
    }
}

async function startDevTest() {
    return new Promise(resolve => {
        count = 0;
        function startIntervalDevtest() {
            let randCount = randCountAirplane();
            document.getElementById("redButton").style.display = "inline";
            document.getElementById("blueButton").style.display = "inline";
            document.getElementById("gameScreen").style.display = "inline";
            sessionIntervalTest = setInterval(
                function carMove() {
                    let choseCar = randColorDev();
                    // let carSpeed = randSpeedCar();
                    buttonChoice = 0;
                    redPress = 0;
                    bluePress = 0;
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
                            startIntervalDevtest();
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
                        if (choseCar >= 0.5) {
                            document.getElementById("redCar").style.display = "inline";
                            document.getElementById("redCar").style.animationPlayState = "running";
                            // document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                            redClick = function () {
                                redPress++;
                                if (redPress == 1) {
                                    correctFirstRedPressDevtest.push(new Date().getTime() - milliseconds);
                                } else {
                                    correctRedPressDevtest.push(new Date().getTime() - milliseconds);
                                }
                            };
                            redElement.addEventListener("click", redClick);
                            document.getElementById("blueButton").onclick = function () {
                                incorrectBluePressDevtest.push(new Date().getTime() - milliseconds);
                            };

                            setTimeout(() => {
                                reset_redCar();
                                redElement.removeEventListener("click", redClick);
                            }, 1000);//carSpeed * 1000);
                        } else {
                            document.getElementById("blueCar").style.display = "inline";
                            document.getElementById("blueCar").style.animationPlayState = "running";
                            // document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                            document.getElementById("redButton").onclick = function () {
                                incorrectRedPressDevtest.push(new Date().getTime() - milliseconds);
                            };
                            blueClick = function () {
                                bluePress++;
                                if (bluePress == 1) {
                                    correctFirstBluePressDevtest.push(new Date().getTime() - milliseconds);
                                } else {
                                    correctBluePressDevtest.push(new Date().getTime() - milliseconds);
                                }
                            }
                            blueElement.addEventListener("click", blueClick);

                            setTimeout(() => {
                                reset_blueCar();
                                blueElement.removeEventListener("click", blueClick);
                            }, 1000);//carSpeed * 1000);
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

                }, 1000);//1200);// (Maximal carSpeed)*1000

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
