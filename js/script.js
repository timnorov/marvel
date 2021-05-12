document.querySelector('header').style.display = 'none';
document.querySelector('footer').style.display = 'none';
document.querySelector('.header-menu').style.display = 'none';

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

context.canvas.width = width;
context.canvas.height = height;
let page = document.getElementById("pageFlip");


$('#myCanvas').fadeTo(4400, 0.0, function() {
});

setTimeout(() => {
  document.querySelector('header').style.display = '';
  document.querySelector('footer').style.display = '';
  document.querySelector('.wrapper').style.display = 'none';
}, 3900);

setTimeout(() => {
  $("header").addClass("ready");
$("footer").addClass("ready");
}, 4500);

const input = document.querySelector('.main'),
      menu = document.querySelector('.header-menu'),
      marvelLogo = document.querySelector('.marvel-logo');

setTimeout(() => {
  marvelLogo.style.display = 'block';
}, 6500);

let dataBase = "";

const getData = () => {
  fetch('./js/dbHeroes.json')
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('Что-то не так');
      }
      return (response.json());
    })
    .then((data) => {
      dataBase = JSON.parse(JSON.stringify(data));
      setTimeout(() => {
        outputPhotos(data);
        document.querySelector('.header-menu').style.display = '';
      }, 3900);
    })
    .catch((error) => console.log(error));
  };
  getData();
const outputPhotos = (data) => {
  input.innerHTML = '';
  data.forEach((item) => {
  input.insertAdjacentHTML('beforeend', `
  <div class="card">
		<div class="imgBox">
			<img src="img/${item.photo}">
		</div>
		  <div class="details">
          <h3 class="hero-name">${item.name}</h3>
          <h3>Real name: <span class="hero-info">${item.realName}</span></h3>
          <h3>Species: <span class="hero-info">${item.species}</span></h3>
          <h3>Gender: <span class="hero-info">${item.gender}</span></h3>
          <h3>Birthday: <span class="hero-info">${item.birthDay}</span></h3>
          <h3>Death day: <span class="hero-info">${item.deathDay}</span></h3>
          <h3>Status: <span class="hero-info">${item.status}</span></h3>
          <h3>Actors: <span class="hero-info">${item.actors}</span></h3>
          <h3>Movies:</h3>
          <span>${item.movies}</span>
      </div>
    </div>`);
  });
};
setTimeout(() => {
  let heroInfo = document.querySelectorAll('.hero-info');
  heroInfo.forEach((item) => {
    if (item.textContent === 'undefined') {
      item.closest('h3').remove();
    };
  })
}, 4000);
const genderSelectFilter = document.getElementById('genderSelect'),
      movieSelectFilter = document.getElementById('movieSelect'),
      statusSelectFilter = document.getElementById('statusSelect');
const cards = document.querySelectorAll('.card');

setTimeout(() => {
  const moviesItem = dataBase.flatMap(hero => hero.movies)
  let newArray = [...(new Set(moviesItem))].sort();
  const movieFilter = document.getElementById('movieSelect');
  newArray.forEach((item) => {
    if(item !== undefined) {
      movieFilter.insertAdjacentHTML('beforeend', 
      `<option>${item}</option>`);
    }
  });

}, 500);

setTimeout(() => {
  const genderItem = dataBase.flatMap(hero => hero.gender)
  let newArray = [...(new Set(genderItem))].sort();
  const genderFilter = document.getElementById('genderSelect');
  newArray.forEach((item) => {
    if(item !== undefined) {
      genderFilter.insertAdjacentHTML('beforeend', 
      `<option>${item}</option>`);
    }
  });

}, 500);

setTimeout(() => {
  const statusItem = dataBase.flatMap(hero => hero.status)
  let newArray = [...(new Set(statusItem))].sort();
  const statusFilter = document.getElementById('statusSelect');
  newArray.forEach((item) => {
    if(item !== undefined) {
      statusFilter.insertAdjacentHTML('beforeend', 
      `<option>${item}</option>`);
    }
  });

}, 500);

let found = [];

function findInObjArray(array, value) {
  found = [];
  function findInObj(obj, value) {return Object.values(obj).some(v => typeof v == 'object' && v != 'null'? findInObj(v, value) : v === value);};
  array.forEach(function(obj) {if (findInObj(obj, value)) found.push(obj);})
  return found;
}
//animation
// let count = 0,
// 	driveInterval,
// 	isRunning = true;

//   const cardDrive = function() {
// 	 driveInterval = requestAnimationFrame(cardDrive);
// 	count += 10;
// 	if (count < 100) {
// 		input.style.marginTop = count + 'px';
// 	} else {
// 		cancelAnimationFrame(driveInterval);
// 	}
// };

// function isInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         rect.top >= 100 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)

//     );
// }

//  setTimeout(() => {
//   const cards = document.querySelectorAll('.card');
//   cards.forEach((item) => {
//     item.addEventListener('scroll', () => {
//       const rect = item.getBoundingClientRect();
//       console.log(rect.top);
//       if (rect.top < 100) {
//         // item.classList.add('noHover'); 
//         // if (isRunning) {
// 		    //   driveInterval = requestAnimationFrame(cardDrive);
// 	      // }
// 	      //   isRunning = !isRunning;
//       } else if (rect.top >= 100) {
//         item.classList.remove('noHover');
//       } 
//     })
      
//   })
//  }, 4000);

menu.addEventListener('change', event => {
  target = event.target;
  if(target.classList.contains("select")) {
    if(movieSelectFilter.value !== '' && genderSelectFilter.value !== '' && statusSelectFilter.value !== '') {
      findInObjArray(dataBase, movieSelectFilter.value);
      findInObjArray(found, genderSelectFilter.value);
      findInObjArray(found, statusSelectFilter.value);
      outputPhotos(found);
      movieLogo()
    } else if (movieSelectFilter.value !== '' && genderSelectFilter.value !== '') {
      findInObjArray(dataBase, movieSelectFilter.value);
      findInObjArray(found, genderSelectFilter.value);
      outputPhotos(found);
      movieLogo()
    } else if (movieSelectFilter.value !== '' && statusSelectFilter.value !== '') {
      findInObjArray(dataBase, movieSelectFilter.value);
      findInObjArray(found, statusSelectFilter.value);
      outputPhotos(found);
      movieLogo()
    } else if (genderSelectFilter.value !== '' && statusSelectFilter.value !== '') {
      findInObjArray(dataBase, genderSelectFilter.value);
      findInObjArray(found, statusSelectFilter.value);
      outputPhotos(found);
      document.querySelector('.movie-logo').innerHTML = '';
    } else if (movieSelectFilter.value !== '') {
      findInObjArray(dataBase, movieSelectFilter.value);
      outputPhotos(found);
      movieLogo()
    } else if (genderSelectFilter.value !== '') {
      findInObjArray(dataBase, genderSelectFilter.value);
      outputPhotos(found);
      document.querySelector('.movie-logo').innerHTML = '';
    } else if (statusSelectFilter.value !== '') {
      findInObjArray(dataBase, statusSelectFilter.value);
      outputPhotos(found);
      document.querySelector('.movie-logo').innerHTML = '';
    } else if (movieSelectFilter.value === '' && genderSelectFilter.value === '' && statusSelectFilter.value === '') {
      outputPhotos(dataBase);
      document.querySelector('.movie-logo').innerHTML = '';
    }
  }

  function movieLogo() {
    document.querySelector('.movie-logo').innerHTML = '';
      if (movieSelectFilter.value === 'Iron Man' || movieSelectFilter.value === 'Iron Man 2' || movieSelectFilter.value === 'Iron Man 3') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/iron-man.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Ant-Man') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/ant-man.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Ant-Man and the Wasp') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/ant-man-wasp.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Avengers: Age of Ultron' || movieSelectFilter.value === 'Avengers: Endgame' || movieSelectFilter.value === 'Avengers: Infinity War' || movieSelectFilter.value === 'The Avengers') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/avengers.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Black Panther') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/black-panther.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Captain America: Civil War' || movieSelectFilter.value === 'Captain America: The First Avenger' || movieSelectFilter.value === 'Captain America: The Winter Soldier') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/captain-america.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Captain Marvel') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/captain-marvel.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Doctor Strange') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/doctor-strange.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Guardians of the Galaxy' || movieSelectFilter.value === 'Guardians of the Galaxy Vol. 2') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/gardian-galaxy.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Iron Man' || movieSelectFilter.value === 'Iron Man 2' || movieSelectFilter.value === 'Iron Man 3') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/iron-man.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Spider-Man: Far From Home' || movieSelectFilter.value === 'Spider-Man: Homecoming') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/spider-man.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'The Incredible Hulk') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/hulk.png" alt="${movieSelectFilter.value} logo">`)
      } else if (movieSelectFilter.value === 'Thor' || movieSelectFilter.value === 'Thor: Ragnarok' || movieSelectFilter.value === 'Thor: The Dark World') {
        document.querySelector('.movie-logo').insertAdjacentHTML('beforeend', `<img class="movie-title" src="img/movies/thor.png" alt="${movieSelectFilter.value} logo">`)
      }
  }
});