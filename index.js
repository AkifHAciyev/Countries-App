const BASE_URL = 'https://restcountries.com/v3.1/';
const URL = 'https://restcountries.com/v3.1/all';
const URL_Search = 'https://restcountries.com/v3.1/name/';
const regions = document.querySelector('#regions');
const box = document.querySelector('.box');
const container = document.querySelector('.container');
const input = document.querySelector('input');

function addHtml(element, i) {
	container.innerHTML += `
	<a class="box" onclick=localDetails(${i})>
			<img class="img" src="${element.flags.svg}" alt="" />
			<div class="textBox">
				<h2 class="countryName">${element.name.common}</h2>
				<p class="population">Population: <span class="populationSpan">${element.population}</span></p>
				<p class="region">Region: <span class="regionSpan">${element.region}</span></p>
				<p class="capital">Capital: <span class="capitalSpan">${element.capital}</span></p>
			</div>
	</a>
	`;
}

function addBox() {
	axios.get(URL).then((res) => {
		res.data.forEach((element, i) => {
			addHtml(element, i);
		});
	});
}

addBox();

async function searchCountry() {
	container.innerHTML = ' ';
	if (input.value == '') {
		addBox();
	} else {
		await axios.get(`${URL_Search}/${input.value}`).then((res) => {
			res.data.forEach((element, i) => {
				addHtml(element, i);
			});
		});
	}
}

input.addEventListener('input', () => {
	searchCountry();
});

function filterRegion() {
	container.innerHTML = ' ';
	if (input.value == ' ') {
		addBox();
	} else {
		axios.get(`${BASE_URL}region/${regions.value}`).then((res) => {
			res.data.forEach((element, i) => {
				addHtml(element, i);
			});
		});
	}
}

regions.addEventListener('change', () => {
	filterRegion();
});

// task № 5

function localDetails(i) {
	axios.get(URL).then((res) => {
		localStorage.setItem('countryName', JSON.stringify(res.data[i].name.common));
		window.location = './detail.html';
	});
}
