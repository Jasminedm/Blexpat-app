document.querySelector(".feedLocateSearch").addEventListener("change", searchLocation)

function searchLocation(){
let selectedLocation = document.querySelector(".feedLocateSearch").value
let selectedLocationDecks = Array.from(document.getElementsByClassName(selectedLocation))
console.log(selectedLocationDecks)
console.log(selectedLocation)
let allCardDecks = Array.from(document.querySelectorAll('.card'))

allCardDecks.forEach( card => card.classList.add('hide'))
selectedLocationDecks.forEach( card => card.classList.remove('hide'))
    

}

//selecting the card div on dom
//compare the second class to the select value
