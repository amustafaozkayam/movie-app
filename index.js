const container = document.querySelector(".container")
const selectedSeatCount = document.querySelector("#count")
const pickMovie = document.querySelector("#movie")
const filmName = document.querySelector("#film")
const total = document.querySelector("#total")
let seatList = [];

// listener for booking and unbooking seat
container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
    }
    updateSeatNumber();
    updatePrice();

    const allSeats = container.querySelectorAll(".seat")
    const selectedSeats = [...allSeats].filter(
        (seat) => seat.classList.contains("selected")
    );
    allSeats.forEach((seat, index) => {
        if (selectedSeats.includes(seat) && !seatList.includes(index))
            seatList.push(index);
        else if (!selectedSeats.includes(seat) && seatList.includes(index)) {
            seatList = seatList.filter(item => item !== index);
        }     
    })

    localStorage.setItem("seatList", JSON.stringify(seatList))
})

// listener for picking a movie
pickMovie.addEventListener("change", function (e) {
    const movieName = this.options[this.selectedIndex].innerText.split("(")[0];
    filmName.innerText = movieName;
    updatePrice();

    localStorage.setItem("movieName", JSON.stringify(movieName))
});

const updateSeatNumber = () => {
    const selectedSeats = document.querySelectorAll(".selected");
    selectedSeatCount.innerText = selectedSeats.length - 1
}

const updatePrice = () => {
    total.innerText = pickMovie.value * selectedSeatCount.innerText
}

// tasks when page reloaded
window.addEventListener("load", () => {

    // get reserved seat from local storage
    if (localStorage.getItem("seatList")) {
        seatList = JSON.parse(localStorage.getItem("seatList"));
    }

    const allSeats = container.querySelectorAll(".seat");
    allSeats.forEach((seat, index) => {
        if (seatList.includes(index)) seat.classList.add("selected");
    });

    // get active movie name from local storage
    let movieName;
    if (localStorage.getItem("movieName")) {
        movieName = JSON.parse(localStorage.getItem("movieName"));
    } else {
        movieName = pickMovie.options[pickMovie.selectedIndex].innerText.split("(")[0];
    }

    Array.from(pickMovie.options).forEach(option => {
        if (option.innerText.startsWith(movieName)) {
            option.selected = "selected"
        }
    })

    // update values
    filmName.innerText = movieName;
    updateSeatNumber();
    updatePrice();
})



