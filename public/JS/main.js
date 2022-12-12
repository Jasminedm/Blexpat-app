// Itenerary LIST
document.querySelector('.nextItem').addEventListener('click', nextInput)
console.log('arrived!!')
function nextInput(){
    console.log('arrived!!')
   const nextItem = document.createElement('li')
   const nextInputSpace = document.createElement('input')
   nextInputSpace.setAttribute('class', 'textInput')
   const checkB = document.createElement('input')
   checkB.setAttribute('class', 'checkBox')
    checkB.setAttribute('type', 'checkbox')
    nextItem.appendChild(checkB)
    nextItem.appendChild(nextInputSpace)
    document.querySelector('#uL').appendChild(nextItem)
    console.log(document.querySelector("#uL").childNodes)
    
}

document.querySelector('.done').addEventListener('click', isCompleted)
function isCompleted(){
    let checkCheck = Array.from(document.querySelectorAll('.checkBox'))
    
    if(checkCheck.every(done => done.checked == true)){
        document.querySelector('.congrats').innerText = 'Looks like you\'re all set!'
    }
}
 document.querySelector('#clear').addEventListener('click', clearTask)

 function clearTask(){
    let ulinputs = document.querySelector("#uL") 
    const nextItem = document.createElement('li')
    const nextInputSpace = document.createElement('input')
    nextInputSpace.setAttribute('class', 'textInput')
    const checkB = document.createElement('input')
    checkB.setAttribute('class', 'checkBox')
     checkB.setAttribute('type', 'checkbox')
     nextItem.appendChild(checkB)
     nextItem.appendChild(nextInputSpace)
     console.log(ulinputs.childNodes)
    ulinputs.innerHTML = ''
    document.querySelector('#uL').appendChild(nextItem)
     document.querySelector('.congrats').innerText = ''     
 }
 function updateItenerary(id){
    let itenerary = []
    let text = document.querySelectorAll(".textInput")
    for(let i=0; i<text.length; i++){
        itenerary.push(text[i].value)
    }
    console.log(itenerary)
    fetch("/showP", {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: id,
            itenerary: itenerary
        }), 
        
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
   
}







// API CALL
function getInfo(){
    fetch('https://gnews.io/api/v4/search?q=example&token=23f01ef0c4b4e5150c7294718a3b2549')
    .then(res => res.json())
    .then(data => {
        
        for(let i = 0 ; i < data.articles.length; i++){
             console.log(data.articles[1].title)
             
             document.getElementById('title').innerText = data.articles[1].title
             document.getElementById('img').src = data.articles[1].image
         }
    
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}
    getInfo()

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fd0b029055mshd4f57765206b99bp13d40cjsne071f4109e07',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };
    
    fetch('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=eiffel%20tower&lang=en_US&units=km', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));