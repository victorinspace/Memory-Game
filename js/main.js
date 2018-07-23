let cardValuesArr = [
	'A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I'
]
let storedCardValue = []
let cardNumber = []
let cardsMatched = 0
let cardsFlipped = 0
let turnsTaken = 0

// Shuffle the array using Fisher-Yates Algorithm
Array.prototype.shuffle = function() {
  let i = this.length, randomNumber, randomIndex

  while (--i > 0) { // decrement 'this.length' for each loop
    randomNumber = Math.floor(Math.random() * (i + 1)) 
    randomIndex = this[randomNumber] // random index position value 
    this[randomNumber] = this[i] // swap indexes
    this[i] = randomIndex // place indexes
  }
  return this
}

// Generate new board
function newBoard() {
	cardsFlipped = 0
	let output = ''
  cardValuesArr.shuffle()
	
	for (let i = 0; i < cardValuesArr.length; i++) {
		output += '<div id="card_' + i + '" onclick="flipCard(this,\'' + cardValuesArr[i] + '\')"></div>'
	}

	document.querySelector('#game-board').innerHTML = output
}

// Making sure window is loaded, before displaying
window.addEventListener('DOMContentLoaded', function(event) {
	console.log('DOM fully loaded and parsed')
	newBoard()
})

// Flipping cards and checking matches
function flipCard(card, val) {
	if (card.innerHTML == '' && storedCardValue.length < 2) { // first card
		
		card.style.background = '#fff' // flipped card bg-color
		card.innerHTML = val // place icon into card position
		
		if (storedCardValue.length == 0) { // flip first card
			
			storedCardValue.push(val) // capture first card value
			cardNumber.push(card.id) // capture first card number (placement)
			
			console.log('First card value:', storedCardValue)
			console.log('First card number:', cardNumber)

		} else if (storedCardValue.length == 1) { // second card flip
			
			storedCardValue.push(val) // capture second card value
			cardNumber.push(card.id) // capture second card number (placement)

			console.log('Both card values:', storedCardValue)
			console.log('Both card numbers:', cardNumber)

			setTimeout(turnCounter, 700)
			console.log('Turns Taken:', turnsTaken)

			if (storedCardValue[0] == storedCardValue[1]) { // if match is made 
				
				cardsFlipped += 2 // keep cards flipped open

				// Clear both arrays for new matching sequence
				storedCardValue = []
      	cardNumber = []

				// Check to see if the whole board is cleared
				if (cardsFlipped == cardValuesArr.length) {
					
					alert("Board cleared... generating new board")
					document.querySelector('#game-board').innerHTML = "" // clear board
					newBoard() // begin new game

				}

			} else {

				function flipDown() {  // if match is not made

			    // Flip the 2 tiles back over if no match made
			    let card1 = document.getElementById(cardNumber[0])
			    let card2 = document.getElementById(cardNumber[1])
			    
			    card1.style.background = '#44003E'
      	  card1.innerHTML = ""
			    card2.style.background = '#44003E'
        	card2.innerHTML = ""
			    
			    // Clear both arrays
			    storedCardValue = []
    	    cardNumber = []
				}

				setTimeout(flipDown, 700) // flip cards down
			}
		}
	}
}

// Keep track of turns taken
function turnCounter() {
	let turns = document.querySelector('#turns')
	turnsTaken++
	turns.innerHTML = `Turns: ${turnsTaken}/10 `

	if (turnsTaken === 15) {
		alert('You are out of turns!')
		document.querySelector('#game-board').innerHTML = "" // clear board
		newBoard() // begin new game
		turnsTaken = 0
		turns.innerHTML = 'Turns: 0/10'
	} 
}