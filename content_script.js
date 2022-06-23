const planets = document.getElementsByClassName("planet-name")
const elementToClick = planets[Math.floor(Math.random() * planets.length)]
elementToClick.click()