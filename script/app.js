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
		} else if (verschil > 0) {
			foto = 'new';
		}

		htmlString += `<article class="c-boek">                
		<img class="c-boek__image" src="${afbeelding}" />

		<div class="c-boek_text">
			<h1 class="c-boek__title">${titelUpper}</h1>
			<img src="images/book_${foto}_black_24dp.svg" alt="">
			<a>${verschil}</a>

			<a></br>Vorige week ${nummerVorigeWeek} </br> deze week ${nummer}</a>
			
			<h2>${auteur}</h2>    
			<div class="c-boek__content">
			  <a><span class="c-boek__label">Omschrijving: </span>${omschrijving}</a>
			  <a><span class="c-boek__label">ISBN: </span>${isbnNummer}</a>
			  <a><span class="c-boek__label">Bestellen: </span> <a class="c-link-cta" href="${kopen}">Amazon.com</a></a>     
			</div>
	   </div>
	  </article>`;
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
};

document.addEventListener('DOMContentLoaded', init);
//#endregion
