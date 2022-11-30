// TODO LIST
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
     let userInput = document.querySelectorAll('.textInput') 
     userInput.forEach(userI => userI.value = '') 
    //  let userCheck = document.querySelectorAll('.checkBox') 
    //  userCheck.forEach(userC => userC.value = '') 
     document.querySelector('.congrats').innerText = ''     
 }
//  function getInfo(){
//     fetch(`/showPlan/${id}`, {method: 'POST'})
//     const update = { activities: [{checkbox: true, text: text}] };

//     .catch(err => {
//         console.log(`error ${err}`)
//     })
// }







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