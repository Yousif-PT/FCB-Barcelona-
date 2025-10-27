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
// show and hide nav bullets
const navBull = document.querySelector(".nav-bullets");
const showBulletsOption = document.querySelector(".bullets-option .fa-eye");
const HideBulletsOption = document.querySelector(
	".bullets-option .fa-eye-slash"
);
showBulletsOption.addEventListener("click", () => {
	navBull.style.opacity = 1;
});
HideBulletsOption.addEventListener("click", () => {
	navBull.style.opacity = 0;
});
// reset button
document.querySelector(".settings-container .fa-arrows-rotate").onclick =
	() => {
		localStorage.clear();
		window.location.reload();
	};
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
// show and hide toggle menu
const toggleMenu = document.querySelector(".landing-page .fa-bars");
const navBar = document.querySelector(
	".landing-page .landing-page__header__nav"
);
toggleMenu.addEventListener("click", () => {
	navBar.classList.toggle("open");
});
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

// proogress bars animation
const progressSpans = document.querySelectorAll(
	".skills .skills__prog .skills__prog__bar .skills__prog__bar__item .skills__prog__bar__item__progress span"
);
// put this at the end of <body> or run on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
	const skills = document.querySelector(".skills");
	if (!skills) return console.warn("No .skills element found");

	// find the bar elements that have a `progress` attribute
	const progressSpans = skills.querySelectorAll("[progress]");
	// the text elements that show the percent (your selector from before)
	const progPercentage = skills.querySelectorAll(
		".skills__prog__bar__item__title span"
	);

	// init
	progressSpans.forEach((s, i) => {
		s.style.width = "0%";
		if (progPercentage[i]) progPercentage[i].textContent = "0%";
	});

	let animated = false;

	// IntersectionObserver is cleaner and more performant than 'scroll'
	const io = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !animated) {
					animated = true;

					progressSpans.forEach((span, i) => {
						const target = parseInt(span.getAttribute("progress")) || 0;
						// set the visual width immediately
						span.style.width = target + "%";

						// animate the number text from 0 -> target
						if (!progPercentage[i]) return;
						let current = 0;
						// step size so bigger numbers don't take forever
						const step = Math.max(1, Math.round(target / 20));
						const timer = setInterval(() => {
							current += step;
							if (current >= target) {
								progPercentage[i].textContent = target + "%";
								clearInterval(timer);
							} else {
								progPercentage[i].textContent = current + "%";
							}
						}, 50);
					});

					// stop observing once animated (prevents re-trigger)
					observer.unobserve(skills);
				}
			});
		},
		{ threshold: 0.6 }
	);

	io.observe(skills);
});

// end proogress bars animation

// ############################################################################

// Gellery Lightbox
const galleryImages = document.querySelectorAll(
	".gallery .gallery__images .gallery__images__item img"
);
galleryImages.forEach((image) => {
	image.addEventListener("click", () => {
		// overlay
		const pageOverlay = document.createElement("div");
		pageOverlay.classList.add("overlay");
		document.body.appendChild(pageOverlay);
		// lightbox
		const lightBox = document.createElement("div");
		lightBox.classList.add("lightbox");
		// image title
		const imageTitle = document.createElement("h3");
		if (image.alt !== null) {
			imageTitle.textContent = image.alt;
		}
		imageTitle.style.alignSelf = "start";
		lightBox.appendChild(imageTitle);
		// close button
		const closeButton = document.createElement("span");
		closeButton.classList.add("close-btn");
		closeButton.textContent = "X";
		imageTitle.appendChild(closeButton);
		lightBox.appendChild(imageTitle);
		closeButton.addEventListener("click", () => {
			lightBox.remove();
			pageOverlay.remove();
		});
		// lightbox image
		const lightBoxImage = document.createElement("img");
		lightBoxImage.src = image.src;
		lightBox.appendChild(lightBoxImage);
		pageOverlay.appendChild(lightBox);
	});
});
// end Gellery Lightbox

// ############################################################################

// start Timeline Section
const timelineItems = document.querySelectorAll(
	".timeline .timeline__content__item"
);
timelineItems.forEach((item, i) => {
	if (i % 2 !== 0) {
		item.style.alignSelf = "end";
		item.style.marginLeft = "10px";
	} else {
		item.style.alignSelf = "start";
		item.style.marginRight = "10px";
	}
});

// end Timeline Section

// ############################################################################

// start navigation bullets
// scroll to section on bullet click
const navBullets = document.querySelectorAll(".nav-bullets .nav-bullets__item");
navBullets.forEach((bullet) => {
	bullet.addEventListener("click", (e) => {
		document.querySelector(e.target.dataset.section).scrollIntoView({
			behavior: "smooth",
		});
	});
});
// set active class on bullets while scrolling
navBullets.forEach((bullet) => {
	const bullets = document.querySelectorAll(".nav-bullets__item");
	const sections = [...bullets].map((b) =>
		document.querySelector(b.getAttribute("data-section"))
	);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					bullets.forEach((b) => b.classList.remove("active"));
					const activeBullet = document.querySelector(
						`.nav-bullets__item[data-section="#${entry.target.id}"]`
					);
					activeBullet.classList.add("active");
				}
			});
		},
		{ threshold: 0.6 }
	);

	sections.forEach((section) => observer.observe(section));
});

// end navigation bullets
