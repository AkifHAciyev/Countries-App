const FULL_Name_URL = 'https://restcountries.com/v3.1/name/';
const Border_URL = 'https://restcountries.com/v3.1/alpha/';
const detailContainer = document.querySelector('.detail_container');
let countryName = JSON.parse(localStorage.getItem('countryName'));

console.log(countryName);

function addClickCountry() {
	axios.get(`${FULL_Name_URL}${countryName}?fullText=true`).then((res) => {
		console.log(res.data);
		res.data.forEach((element) => {
			let nativeName = Object.entries(element.name.nativeName)[0][1].common;
			let currencies = Object.entries(element.currencies)[0][0];
			let languages = Object.entries(element.languages)[0][1];

			let createBtn = document.createElement('button');
			let borders = element.borders.map((e) => e);
			createBtn.innerHTML += `${borders}`;
			console.log(createBtn);

			detailContainer.innerHTML += `
			<div class="imgDiv">
				<img
					src="${element?.flags?.svg}"
					alt=""
				/>
			</div>

			<div class="info_box">
				<div class="information_Box">
					<div class="info_Box-left">
						<div class="title"><h1 class="country">${element?.name?.common}</h1></div>
						<p class="p">Native Name: <span>${nativeName}</span></p>
						<p class="p">Population: <span>${element?.population}</span></p>
						<p class="p">Region: <span>${element?.region}</span></p>
						<p class="p">Sub Region: <span>${element?.subregion}</span></p>
						<p class="p">Capital <span>${element?.capital}</span></p>
					</div>
					<div class="info_Box-right">
						<p class="p">Top Level Domain: <span>${element?.tld[0]}</span></p>
						<p class="p">Currencies: <span>${currencies}</span></p>
						<p class="p">Languages: <span>${languages}</span></p>
					</div>
				</div>
				<div class="borderDiv">
				<p class="p">Border Countries: ${createBtn}</button>
				</div>
		</div>`;
		});
	});
}

function borderAdd() {}

addClickCountry();
