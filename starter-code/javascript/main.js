var chronometer = new Chronometer();
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var minDec = document.getElementById("minDec");
var minUni = document.getElementById("minUni");
var secDec = document.getElementById("secDec");
var secUni = document.getElementById("secUni");
var milDec = document.getElementById("milDec");
var milUni = document.getElementById("milUni");
var splitList = document.getElementById("splits");
var intervalId = "";

function printTime() {
  printMinutes();
  printSeconds();
  printMilliseconds();
}

function printMinutes() {
  var min = chronometer.minutes.split("");
  minDec.innerHTML = min[0];
  minUni.innerHTML = min[1];
}

function printSeconds() {
  var sec = chronometer.seconds.split("");
  secDec.innerHTML = sec[0];
  secUni.innerHTML = sec[1];
}

function printMilliseconds() {
  var sec = chronometer.millisecondsToPrint.split("");
  milDec.innerHTML = sec[0];
  milUni.innerHTML = sec[1];
}

function printSplit() {
  var listItem = document.createElement("li");
  var time = document.createTextNode(
    chronometer.minutes +
      ":" +
      chronometer.seconds +
      ":" +
      chronometer.millisecondsToPrint
  );

  listItem.appendChild(time);
  splitList.appendChild(listItem);
}

function clearSplits() {
  chronometer.resetClick();
  printTime();

  splitList.innerHTML = "";
}

function updateBtn(btn, text, btnClass) {
  btn.innerHTML = text;
  btn.setAttribute("class", btnClass);
}

function setStopBtn() {
  updateBtn(btnLeft, "STOP", "btn stop");
}

function setSplitBtn() {
  updateBtn(btnRight, "SPLIT", "btn split");
}

function setStartBtn() {
  updateBtn(btnLeft, "START", "btn start");
}

function setResetBtn() {
  updateBtn(btnRight, "RESET", "btn reset");
}

// Start/Stop Button
btnLeft.addEventListener("click", function() {
  if (btnLeft.getAttribute("class").indexOf("start") !== -1) {
    setStopBtn();
    setSplitBtn();

    chronometer.startClick();
    intervalId = setInterval(function() {
      printTime();
    }, 10);
  } else {
    setStartBtn();
    setResetBtn();

    chronometer.stopClick();
    clearInterval(intervalId);
  }
});

// Reset/Split Button
btnRight.addEventListener("click", function() {
  if (btnRight.getAttribute("class").indexOf("split") !== -1) {
    printSplit();
  } else {
    clearSplits();
  }
});
