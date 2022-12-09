const URL = 'https://restcountries.com/v3.1/all';
const URL_Search = 'https://restcountries.com/v3.1/name/';
const regions = document.querySelector('#regions');
const box = document.querySelector('.box');
const container = document.querySelector('.container');
const input = document.querySelector('input');

function addHtml(element) {
	container.innerHTML += `
	<div class="box">
		<img class="img" src="${element.flags.svg}" alt="" />
		<div class="textBox">
			<h2 class="countryName">${element.name.common}</h2>
			<p class="population">Population: <span class="populationSpan">${element.population}</span></p>
			<p class="region">Region: <span class="regionSpan">${element.region}</span></p>
			<p class="capital">Capital: <span class="capitalSpan">${element.capital}</span></p>
		</div>
	</div>
	`;
}

function addBox() {
	axios.get(URL).then((res) => {
		res.data.forEach((element) => {
			addHtml(element);
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
			res.data.forEach((element) => {
				addHtml(element);
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
		axios.get(`https://restcountries.com/v3.1/region/${regions.value}`).then((res) => {
			res.data.forEach((element) => {
				addHtml(element);
			});
		});
	}
}

regions.addEventListener('change', () => {
	filterRegion();
});
