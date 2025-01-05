// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize Vanta.js Background
//     VANTA.FOG({
//         el: "#vanta-bg",
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         minHeight: 1000.00,
//         minWidth: 100.00,
//         highlightColor: 0xc31432,
//         midtoneColor: 0x240b36,
//         lowlightColor: 0x2900ff,
//         baseColor: 0x000000,
//     });
//   });

  const joke = document.querySelector('.joke');
const btn = document.querySelector('.btn');
const url = "https://v2.jokeapi.dev/joke/Programming";

async function load() {
    const response = await fetch(url);
    const data = await response.json();
    if (data.setup) {
        joke.innerHTML = `${data.setup}<br>${data.delivery}`;
    } else {
        joke.innerHTML = `${data.joke}`;
    }
}
    


btn.addEventListener('click', load);