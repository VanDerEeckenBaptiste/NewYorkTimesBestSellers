'use strict';

//#region ***  DOM references                           ***********

//#endregion

//#region ***  Helper Functions                          ***********
const titleCase = function (str) {
	// Eerste letter van elk woord in upper
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
};

function scrollFunction(mybutton) {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showHardCovers = function (jsonObject) {
	let htmlString = '';
	let htmlBoek = document.querySelector('.js-boeken');
	// console.log(jsonObject);
	const boeken = jsonObject.results.books;

	for (let boek of boeken) {
		// console.log(boek);

		const nummer = boek.rank;
		const nummerVorigeWeek = boek.rank_last_week;
		const titel = boek.title;
		const omschrijving = boek.description;
		const auteur = boek.author;
		const kopen = boek.amazon_product_url;
		const afbeelding = boek.book_image;
		const isbnNummer = boek.primary_isbn13;

		const titelUpper = titleCase(titel);
		let verschil = nummerVorigeWeek - nummer;
		let foto = 'down';

		if (nummerVorigeWeek == 0) {
			foto = 'new';
			verschil = 'New Entry';
		} else if (verschil == 0) {
			foto = 'equel';
			verschil = '';
		} else if (verschil > 0) {
			foto = 'up';
		}

		htmlString += `<div class="c-boek">
				<div class="c-boek__image">
					<img src="${afbeelding}" />
				</div> 

				<div class="c-boek-text">
					<div class="c-boek-text__head">
						<h1 class="c-boek-text__head-number">${nummer}.</h1>
						<h1 class="c-boek__title">${titelUpper}</h1>
						<div class="c-boek-text__head-vgl">
							<a>${verschil}</a>
							<img src="images/book_${foto}_black_24dp.svg" alt="">                           
						</div>
					</div>
					<h2 class="c-boek-auteur">${auteur}</h2>    
					<div class="c-content">
						<h3 class="c-content-omschrijving">Omschrijving:</h3>
						<p class="c-content-omschrijving__text">${omschrijving}</p>
						<h3 class="c-content-isbn">ISBN:</h3>
						<p class="c-content-isbn__text">${isbnNummer}</p>
						<h3 class="c-content-bestellen">Bestellen: </h3>
						<a class="c-link-cta" href="${kopen}">Amazon.com</a>
					</div>
				</div>
			</div>`;
	}

	htmlBoek.innerHTML = htmlString;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********

//#endregion

//#region ***  Data Access - get___                     ***********
const getHardCovers = function () {
	handleData(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=MSWshALLBlRYvUhrB2i7ngAXOMvRr3tZ`, showHardCovers);
};
//#endregion

//#region ***  Event Listeners - listenTo___            ***********

//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
	console.log('DOM is geladen');

	getHardCovers();

	var mybutton = document.getElementById('myBtn');

	window.onscroll = function () {
		scrollFunction(mybutton);
	};
};

document.addEventListener('DOMContentLoaded', init);
//#endregion
