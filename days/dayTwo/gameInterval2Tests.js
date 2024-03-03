const responsesTrainingDataThree = {
    todayDate: getTodayDate(),
    correctRedPress: correctRedPress,
    correctBluePress: correctBluePress,
    correctFirstRedPress: correctFirstRedPress,
    correctFirstBluePress: correctFirstBluePress,
    incorrectRedPress: incorrectRedPress,
    incorrectBluePress: incorrectBluePress,
    redChoice: redChoice,
    blueChoice: blueChoice,
    allRedPresses: allRedPresses,
    allBluePresses: allBluePresses,
    // allCorrectFirstPress: allCorrectFirstPress,
    allChoices: allChoices
};

saveAttemptTrainingThree = 0;
let redElement = document.getElementById("redButton");
let blueElement = document.getElementById("blueButton");
let red_yellow = false;
let blue_yellow = false;


redElement.addEventListener("touchstart", function () {
    allRedPresses.push(new Date().getTime() - milliseconds);
    redElement.style.transform = "translateY(10px)";
    redElement.style.webkitTransform = "translateY(10px)";
    setTimeout(() => {
        redElement.style.transform = "initial";
    }, 100); // Adjust the delay as needed
});
blueElement.addEventListener("touchstart", function () {
    allBluePresses.push(new Date().getTime() - milliseconds);
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

function yellowPress() {
    if (red_yellow && blue_yellow) {
        correctYellowPress.push(new Date().getTime() - milliseconds);
        red_yellow = false;
        blue_yellow = false;
    }
}

let count = 0; // counter for iterations
// 1=red, 2=blue buttons
let buttonChoice = null;
let sessionInterval = null;
let startGame = null;


let countTimeout1 = 0;
async function startInterval2Tests() {
    let randCount = randCountAirplane();
    return new Promise(resolve => {
        sessionInterval2Test = setInterval(
            function carMove() {
                let choseCar = randColor();
                let carSpeed = randSpeedCar();
                document.getElementById("redButton").style.display = "inline";
                document.getElementById("blueButton").style.display = "inline";
                document.getElementById("gameScreen").style.display = "inline";
                buttonChoice = 0;
                blueElement.removeEventListener("touchstart", function () {
                    correctBluePress.push(new Date().getTime() - milliseconds);
                })
                redElement.removeEventListener("touchstart", function () {
                    correctRedPress.push(new Date().getTime() - milliseconds);
                });
                if (count >= randCount) {
                    clearInterval(sessionInterval2Test);
                    document.getElementById("yellowCar").style.display = "inline";
                    document.getElementById("yellowCar").style.animationPlayState = "running";
                    yellowChoice.push(new Date().getTime() - milliseconds);
                    platform.saveSession(responsesTrainingDataThree, false);
                    redElement.addEventListener("click", function () {
                        red_yellow = true;
                    });
                    blueElement.addEventListener("click", function () {
                        blue_yellow = true;
                    });
                    setTimeout(() => {
                        sessionInterval2Test();
                        reset_yellowCar();
                        count = 0;
                        yellowPress();
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
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstRedPress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPress.push(new Date().getTime() - milliseconds);
                            }
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectBluePress.push(new Date().getTime() - milliseconds);
                            }
                        };

                        setTimeout(() => {
                            reset_redCar();
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectRedPress.push(new Date().getTime() - milliseconds);
                            };
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstBluePress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePress.push(new Date().getTime() - milliseconds);
                            }

                        };

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };
                };
            }, 1200);// (Maximal carSpeed)*1000

        let sessionTimer2test = setTimeout(function timeCount() {
            // document.getElementById("blueButton").style.display = "none";
            // document.getElementById("redButton").style.display = "none";
            clearInterval(sessionInterval2Test);
            clearTimeout(sessionTimer2test);
            function savingTrainingThree() {
                platform.saveSession(responsesTrainingDataThree, false).then(() => {
                    reset_airplane();
                    clearInterval(sessionInterval2Test);
                    clearTimeout(sessionTimer2test);
                    countTimeout1++;
                    if (countTimeout1 >= 1) {
                        resolve("done1");
                        clearInterval(sessionInterval2Test);
                        clearTimeout(sessionTimer2test);
                        reset_airplane();
                    } else {
                        clearInterval(sessionInterval2Test);
                        clearTimeout(sessionTimer2test);
                        reset_airplane();
                    }
                }).catch(() => {
                    if (saveAttemptTrainingThree >= 1000) {
                        document.getElementById("problem").style.display = "inline";
                    } else {
                        saveAttemptTrainingThree++;
                        savingTrainingThree()
                    }
                })
            }
            savingTrainingThree()
            reset_airplane();
            // reset_redCar();
            // reset_blueCar();
        }, 20000);
        // }, 3000);
    });
};

let countTimeout2 = 0;
let countTwo = 0;
async function startInterval2Tests2() {
    let randCount = randCountAirplane();
    return new Promise(resolve => {
        sessionInterval2Test2 = setInterval(
            function carMove() {
                let choseCar = randColor();
                let carSpeed = randSpeedCar();
                buttonChoice = 0;
                blueElement.removeEventListener("touchstart", function () {
                    correctBluePress.push(new Date().getTime() - milliseconds);
                })
                redElement.removeEventListener("touchstart", function () {
                    correctRedPress.push(new Date().getTime() - milliseconds);
                });
                if (countTwo >= randCount) {
                    clearInterval(sessionInterval2Test2);
                    document.getElementById("yellowCar").style.display = "inline";
                    document.getElementById("yellowCar").style.animationPlayState = "running";
                    yellowChoice.push(new Date().getTime() - milliseconds);
                    platform.saveSession(responsesTrainingDataThree, false);
                    redElement.addEventListener("click", function () {
                        red_yellow = true;
                    });
                    blueElement.addEventListener("click", function () {
                        blue_yellow = true;
                    });
                    setTimeout(() => {
                        sessionInterval2Test2();
                        reset_yellowCar();
                        count = 0;
                        yellowPress();
                        redElement.removeEventListener("click", function () {
                            red_yellow = true;
                        });
                        blueElement.removeEventListener("click", function () {
                            blue_yellow = true;
                        });
                    }, 800);
                } else {
                    countTwo++;
                    if (choseCar >= 0.5) {
                        document.getElementById("redCar").style.display = "inline";
                        document.getElementById("redCar").style.animationPlayState = "running";
                        document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstRedPress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPress.push(new Date().getTime() - milliseconds);
                            }
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectBluePress.push(new Date().getTime() - milliseconds);
                            }
                        };

                        setTimeout(() => {
                            reset_redCar();
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectRedPress.push(new Date().getTime() - milliseconds);
                            };
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstBluePress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePress.push(new Date().getTime() - milliseconds);
                            }

                        };

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };

                };
            }, 1200);// (Maximal carSpeed)*1000

        let sessionTimer2test2 = setTimeout(function timeCount() {
            clearInterval(sessionInterval2Test2);
            clearTimeout(sessionTimer2test2);
            function savingTrainingThree2() {
                platform.saveSession(responsesTrainingDataThree, false).then(() => {
                    reset_airplane();
                    // reset_blueCar();
                    // reset_redCar();
                    countTimeout2++;
                    if (countTimeout2 >= 1) {
                        resolve("done3");
                        clearInterval(sessionInterval2Test2);
                        clearTimeout(sessionTimer2test2);
                    } else {
                        clearInterval(sessionInterval2Test2);
                        clearTimeout(sessionTimer2test2);
                        reset_airplane();
                    }
                }).catch(() => {
                    if (saveAttemptTrainingThree >= 1000) {
                        document.getElementById("problem").style.display = "inline";
                    } else {
                        saveAttemptTrainingThree++;
                        savingTrainingThree2()
                    }
                })
            };
            savingTrainingThree2()
        }, 20000);
        // }, 3000);
    });
};
let countTimeout3 = 0;
let countThree = 0;

async function startInterval2Tests3() {
    let randCount = randCountAirplane();
    return new Promise(resolve => {
        sessionInterval2Test3 = setInterval(
            function carMove() {
                let choseCar = randColor();
                let carSpeed = randSpeedCar();
                blueElement.removeEventListener("touchstart", function () {
                    correctBluePress.push(new Date().getTime() - milliseconds);
                })
                redElement.removeEventListener("touchstart", function () {
                    correctRedPress.push(new Date().getTime() - milliseconds);
                });
                buttonChoice = 0;
                if (countThree >= randCount) {
                    clearInterval(sessionInterval2Test3);
                    document.getElementById("yellowCar").style.display = "inline";
                    document.getElementById("yellowCar").style.animationPlayState = "running";
                    yellowChoice.push(new Date().getTime() - milliseconds);
                    platform.saveSession(responsesTrainingDataThree, false);
                    redElement.addEventListener("click", function () {
                        red_yellow = true;
                    });
                    blueElement.addEventListener("click", function () {
                        blue_yellow = true;
                    });
                    setTimeout(() => {
                        sessionInterval2Test3();
                        reset_yellowCar();
                        count = 0;
                        yellowPress();
                        redElement.removeEventListener("click", function () {
                            red_yellow = true;
                        });
                        blueElement.removeEventListener("click", function () {
                            blue_yellow = true;
                        });
                    }, 800);
                } else {
                    countThree++;
                    if (choseCar >= 0.5) {
                        document.getElementById("redCar").style.display = "inline";
                        document.getElementById("redCar").style.animationPlayState = "running";
                        document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstRedPress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPress.push(new Date().getTime() - milliseconds);
                            }
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectBluePress.push(new Date().getTime() - milliseconds);
                            }
                        };

                        setTimeout(() => {
                            reset_redCar();
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectRedPress.push(new Date().getTime() - milliseconds);
                            };
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstBluePress.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePress.push(new Date().getTime() - milliseconds);
                            }

                        };

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };

                };
            }, 1200);// (Maximal carSpeed)*1000

        let sessionTimer2test3 = setTimeout(function timeCount() {
            clearInterval(sessionInterval2Test3);
            clearTimeout(sessionTimer2test3);
            function savingTrainingThree3() {
                platform.saveSession(responsesTrainingDataThree, false).then(() => {
                    reset_airplane();
                    reset_blueCar();
                    reset_redCar();
                    countTimeout3++;
                    if (countTimeout3 == 1) {
                        resolve("done5");
                        clearInterval(sessionInterval2Test3);
                        clearTimeout(sessionTimer2test3);
                        reset_airplane();
                    } else {
                        clearInterval(sessionInterval2Test3);
                        clearTimeout(sessionTimer2test3);
                        reset_airplane();
                    }
                }).catch(() => {
                    if (saveAttemptTrainingThree >= 1000) {
                        document.getElementById("problem").style.display = "inline";
                    } else {
                        saveAttemptTrainingThree++;
                        savingTrainingThree3()
                    }
                })
            };
            savingTrainingThree3()
        }, (300000 - (new Date().getTime() - milliseconds)));
        // }, 3000);
    });
};

