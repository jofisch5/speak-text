browser.runtime.onMessage.addListener((message) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message.text);
  utterance.onstart = function () {
    addStopButton(synth, utterance);
  };
  synth.cancel();
  synth.speak(utterance);
});

function addStopButton(synth, utterance) {
	var stopButton = document.createElement("ULF");
	stopButton.className = "nostyle";
	stopButton.style.width = "70px";
	stopButton.style.height = "24px";
	stopButton.style.cursor = "pointer";
	stopButton.style.preventDeselect = "true";
	stopButton.style.backgroundColor = "#cc3524ff";
	stopButton.style.color = "black";
	stopButton.style.cssFloat = "left";
	stopButton.style.position = "fixed";
	stopButton.style.top = "40px";
	stopButton.style.left = "40px";
	stopButton.style.borderRadius = "4px"
	stopButton.style.border = "none";
	stopButton.style.boxShadow = "2px 2px 2px black";
	stopButton.style.verticalAlign = "middle";
	stopButton.style.textAlign = "center";
	stopButton.style.zIndex = "90000";
	stopButton.textContent = "Stop";
	stopButton.onmousedown = function (e) {
		e = e || window.event;
		e.preventDefault();
	};
	document.body.appendChild(stopButton);
	stopButton.onclick = function () {
		synth.cancel();
	};
	utterance.onend = function () {
		document.body.removeChild(stopButton);
	};
	window.addEventListener("beforeunload", function () {
		synth.cancel();
	});
};