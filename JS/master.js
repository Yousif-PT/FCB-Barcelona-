/** @format */
//start settings box
// Settings Box main variables declaration
const settingsBox = document.querySelector(".settings-box");
const settingsToggle = document.querySelector(".settings-box__toggle");
const settingsToggleIcon = document.querySelector(".settings-box__toggle i");
const colorsList = document.querySelectorAll(".colors-list li");
const randomBackgrounds = document.querySelector(".random-backgrounds i");
//  local storage main variables
const mainColor = localStorage.getItem("mainColor");

// Open Settings Box
settingsToggle.addEventListener("click", () => {
	settingsBox.classList.toggle("open");
	settingsToggleIcon.classList.toggle("fa-spin");
});
// on page load
window.addEventListener("load", () => {
	settingsBox.classList.remove("open");
	settingsToggleIcon.classList.remove("fa-spin");
	changeBG();
});
// Change Colors items
colorsList.forEach((li) => {
	li.style.backgroundColor = li.getAttribute("data-color");
});
// Change Colors of the page
colorsList.forEach((li, i) => {
	li.addEventListener("click", (e) => {
		// set last item color to main page
		if (i === 3) {
			localStorage.removeItem("mainColor");
			document.documentElement.style.setProperty("--main-color", "#0576e7");
			document.documentElement.style.setProperty("--sec-color", "#df364c");
			document.documentElement.style.setProperty("--third-color", "#fcce16");
			colorsList.forEach((li) => {
				li.classList.remove("active");
			});
			return;
		}
		// set all colors value and local storage value
		localStorage.setItem("mainColor", e.target.dataset.color);
		document.documentElement.style.setProperty(
			"--main-color",
			e.target.dataset.color
		);
		document.documentElement.style.setProperty(
			"--sec-color",
			e.target.dataset.color
		);
		document.documentElement.style.setProperty(
			"--third-color",
			e.target.dataset.color
		);
		// set active class on selected color
		if (e.target.dataset.color === localStorage.getItem("mainColor")) {
			colorsList.forEach((li) => {
				li.classList.remove("active");
			});
			e.target.classList.add("active");
		}
	});
});

// check if there is main color on local storage and set it on the page
if (mainColor) {
	console.log(`${mainColor} is the main color`);
	document.documentElement.style.setProperty("--main-color", mainColor);
	document.documentElement.style.setProperty("--sec-color", mainColor);
	document.documentElement.style.setProperty("--third-color", mainColor);
	colorsList.forEach((li) => {
		li.classList.remove("active");
		if (li.dataset.color === mainColor) {
			li.classList.add("active");
		}
	});
} else {
	console.log("There is no main color on local storage");
}
//random backgroud play and pause
randomBackgrounds.addEventListener("click", () => {
	randomBackgrounds.classList.toggle("fa-pause");
	randomBackgrounds.classList.toggle("fa-play");
	changeBG();
});
// end settings box

// ############################################################################
// landing page main variables
const logo = document.querySelector(
	".landing-page .landing-page__header__logo"
);
const LI = document.querySelectorAll(
	".landing-page .landing-page__header__nav ul li"
);
const landingIMG = document.querySelector(".landing-page");

// add trophies icons to nav bar
const trophies = [
	"../IMAGES/trophy-1.png",
	"../IMAGES/trophy-2.png",
	"../IMAGES/trophy-3.png",
];

for (let i = 0; i < trophies.length; i++) {
	const trophy = document.createElement("img");
	trophy.src = trophies[i];
	trophy.classList.add("trophy");
	trophy.style.cssText = "width: 25px; height: 40px; margin: 0 5px";
	if (trophies[i] === "../IMAGES/trophy-2.png") {
		trophy.style.cssText =
			"height: 50px; filter: brightness(0.01); width: 25px; margin: 0 5px";
	}
	logo.appendChild(trophy);
}

// set curent page in nav bar
LI.forEach((li) => {
	li.addEventListener("click", () => {
		LI.forEach((li) => {
			li.classList.remove("active");
		});
		li.classList.add("active");
	});
});

// change backround image
const BGS = [
	"../IMAGES/landing-1.avif",
	"../IMAGES/landing-2.avif",
	"../IMAGES/landing-3.avif",
];

function changeBG() {
	if (randomBackgrounds.classList.contains("fa-play")) {
		randomBgInterval = setInterval(() => {
			let random = Math.floor(Math.random() * BGS.length);
			landingIMG.style.backgroundImage = `url(${BGS[random]})`;
		}, 6000);
	} else if (randomBackgrounds.classList.contains("fa-pause")) {
		clearInterval(randomBgInterval);
		landingIMG.style.backgroundImage = `url(${BGS[0]})`;
	}
}
