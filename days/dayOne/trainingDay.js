import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import React from 'react';

const responsesTrainingData = {
    todayDate: getTodayDate(),
    correctRedPress: correctRedPress,
    correctBluePress: correctBluePress,
    correctFirstRedPress: correctFirstRedPress,
    correctFirstBluePress: correctFirstBluePress,
    correctYellowPress: correctYellowPress,
    incorrectRedPress: incorrectRedPress,
    incorrectBluePress: incorrectBluePress,
    redChoice: redChoice,
    blueChoice: blueChoice,
    allRedPresses: allRedPresses,
    allBluePresses: allBluePresses,
    // allCorrectTrainingPress: allCorrectTrainingPress,
    allChoices: allChoices
};

var redElement = document.getElementById("redButton");
var blueElement = document.getElementById("blueButton");
let red_yellow = false;
let blue_yellow = false;

import React from 'react';

class ButtonManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redButtonPressed: false,
            blueButtonPressed: false
        };
    }

    handleRedButtonPress = () => {
        this.setState({ redButtonPressed: true });
        setTimeout(() => {
            this.setState({ redButtonPressed: false });
        }, 100); // Adjust the timeout value as needed
    };

    handleBlueButtonPress = () => {
        this.setState({ blueButtonPressed: true });
        setTimeout(() => {
            this.setState({ blueButtonPressed: false });
        }, 100); // Adjust the timeout value as needed
    };

    render() {
        const { redButtonPressed, blueButtonPressed } = this.state;
        return (
            <div>
                <button
                    id="redButton"
                    onTouchStart={this.handleRedButtonPress}
                    className={redButtonPressed ? "redButton active" : "redButton"}
                >
                    Red Button
                </button>
                <button
                    id="blueButton"
                    onTouchStart={this.handleBlueButtonPress}
                    className={blueButtonPressed ? "blueButton active" : "blueButton"}
                >
                    Blue Button
                </button>
            </div>
        );
    }
}

export default ButtonManager;


document.getElementById("redButton").addEventListener("touchstart", function () {
    allRedPresses.push(new Date().getTime() - milliseconds);
});
document.getElementById("blueButton").addEventListener("touchstart", function () {
    allBluePresses.push(new Date().getTime() - milliseconds);
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
    }
}


let saveAttemptTraining = 0;
let count = 0; // counter for iterations
// 1=red, 2=blue buttons
let buttonChoice = null;
let sessionInterval = null;
let startGame = null;
platform.saveSession(responsesTrainingData, true)

async function trainingDay() {
    return new Promise(resolve => {
        document.getElementById("startButton").style.display = "inline";
        document.getElementById("redButton").style.display = "inline";
        document.getElementById("blueButton").style.display = "inline";
        document.getElementById("gameScreen").style.display = "inline";
        document.getElementById("startButton").onclick = function () {
            document.getElementById("startButton").style.display = "none";
            function startIntervalTrainingDay() {
                let randCount = randCountAirplane();
                document.getElementById("redButton").style.display = "inline";
                document.getElementById("blueButton").style.display = "inline";
                document.getElementById("gameScreen").style.display = "inline";
                sessionIntervalTrainingDay = setInterval(
                    function carMove() {
                        let choseCar = randColor();
                        let carSpeed = randSpeedCar();
                        // reset_airplane();
                        buttonChoice = 0;
                        if (count >= randCount) {
                            clearInterval(sessionIntervalTrainingDay);
                            document.getElementById("yellowCar").style.display = "inline";
                            document.getElementById("yellowCar").style.animationPlayState = "running";
                            setTimeout(startIntervalTrainingDay, 800);
                            document.getElementById("redButton").addEventListener("pointerdown", () => {
                                red_yellow = true;
                            });
                            document.getElementById("blueButton").addEventListener("pointerdown", () => {
                                blue_yellow = true;
                                setTimeout(() => {
                                    yellowPress();
                                }, 100);
                            });
                            platform.saveSession(responsesTrainingData, false);
                            setTimeout(() => {
                                reset_yellowCar();
                                count = 0;
                                red_yellow = false;
                                blue_yellow = false;
                                document.getElementById("redButton").removeEventListener("touchstart", () => {
                                    red_yellow = true;
                                });
                                document.getElementById("blueButton").removeEventListener("touchstart", () => {
                                    blue_yellow = true;
                                    setTimeout(() => {
                                        yellowPress();
                                    }, 100);
                                });
                            }, 800);
                        } else {
                            count++;
                            // document.getElementById("counter").innerHTML = count;
                            // document.getElementById("carColorShow").innerHTML = choseCar;
                            // document.getElementById("carSpeedShow").innerHTML = carSpeed;
                            // document.getElementById("finishedShow").innerHTML = "Started";
                            if (choseCar == 1) { // 1=red, 0=blue
                                document.getElementById("redCar").style.display = "inline";
                                document.getElementById("redCar").style.animationPlayState = "running";
                                document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                                document.getElementById("redButton").onclick = function () {
                                    correctFirstRedPress.push(new Date().getTime() - milliseconds);
                                    // allCorrectTrainingPress.push(new Date().getTime() - milliseconds);
                                    document.getElementById("redButton").addEventListener("touchstart", function () {
                                        correctRedPress.push(new Date().getTime() - milliseconds);
                                    });
                                };
                                document.getElementById("blueButton").onclick = function () {
                                    incorrectBluePress.push(new Date().getTime() - milliseconds);
                                };

                                setTimeout(() => {
                                    reset_redCar();
                                    // document.getElementById("finishedShow").innerHTML = "Finished";
                                }, carSpeed * 1000);
                            } else {
                                document.getElementById("blueCar").style.display = "inline";
                                document.getElementById("blueCar").style.animationPlayState = "running";
                                document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                                document.getElementById("redButton").onclick = function () {
                                    incorrectRedPress.push(new Date().getTime() - milliseconds);
                                };
                                document.getElementById("blueButton").onclick = function () {
                                    correctFirstBluePress.push(new Date().getTime() - milliseconds);
                                    // allCorrectTrainingPress.push(new Date().getTime() - milliseconds);
                                    document.getElementById("blueButton").addEventListener("touchstart", function () {
                                        correctBluePress.push(new Date().getTime() - milliseconds);
                                    });
                                };

                                setTimeout(() => {
                                    reset_blueCar();
                                    // document.getElementById("finishedShow").innerHTML = "Finished";
                                }, carSpeed * 1000);
                            }
                        }
                    }, 1200);// (Maximal carSpeed)*1000

                let sessionTimerTrainingDay = setTimeout(function timeCount() {
                    clearTimeout(sessionTimerTrainingDay);
                    clearInterval(sessionIntervalTrainingDay);
                    function savingTraining() {
                        platform.saveSession(responsesTrainingData, false).then(() => {
                            reset_airplane();
                            document.getElementById("blueButton").style.display = "none";
                            document.getElementById("redButton").style.display = "none";
                            resolve("done");
                        }).catch(() => {
                            if (saveAttemptTraining >= 2000) {
                                document.getElementById("problem").style.display = "inline";
                            } else {
                                saveAttemptTraining++;
                                savingTraining()
                            }
                        })
                    }
                    savingTraining()
                }, 300000);
                // }, 10000);
            }
            studySessionData.doneDay1 = "startDayOne";
            platform.saveSession(studySessionData, true).then(() => {
                startIntervalTrainingDay();
                getMillisec();
            });
        }
        // }
    })
}
