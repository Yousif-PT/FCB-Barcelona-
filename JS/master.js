/** @format */
// add trophies icons to nav bar
const logo = document.querySelector(
	".landing-page .landing-page__header__logo"
);
const trophies = [
	"../IMAGES/cup-la-liga.png",
	"../IMAGES/copa-del-rey-spain-la-liga.png",
	"../IMAGES/la-liga-supercoppa.png",
];
for (let i = 0; i < trophies.length; i++) {
	const trophy = document.createElement("img");
	trophy.src = trophies[i];
	trophy.classList.add("trophy");
	trophy.style.cssText = "width: 30px; margin-left: 0px;";
	logo.after(trophy);
}

// set curent page in nav bar
const LI = document.querySelectorAll(
	".landing-page .landing-page__header__nav ul li"
);

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
	"../IMAGES/landing-1.jpg",
	"../IMAGES/landing-2.jpg",
	"../IMAGES/landing-3.jpg",
	"../IMAGES/landing-4.jpg",
];

const landingIMG = document.querySelector(".landing-page");

setInterval(() => {
	let random = Math.floor(Math.random() * BGS.length);
	landingIMG.style.backgroundImage = `url(${BGS[random]})`;
}, 5000);
