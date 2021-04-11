//random words
const words = ['pizza','brownie','icecream','sandwich','pastries','macroni','chowmine'];
let selectedWords = words[Math.floor(Math.random()*words.length)];
console.log("heres your answer cheater---",selectedWords)
//selectors
const guessWord = document.querySelector('.guess');
const popUp = document.querySelector('.final');
const FinalMsg = document.querySelector('.win-loose');
const wrong = document.querySelector('.wrong');
const parts = document.querySelectorAll('.figure-part');
const notification = document.querySelector('.notify-repeat');
const playAgain = document.querySelector('.play')
let correctwords=[];
let wrongwords = [];

//eventListener
window.addEventListener("keydown",matchWord);
playAgain.addEventListener("click",restartgame)



//functions

displayWord = ()=>{
    guessWord.innerHTML = selectedWords.split('').map(letter=>(
        `<span class="letter">${correctwords.includes(letter)?letter:''}</span>`
        )).join('')
    }
    
    displayWord()
    
    function matchWord(e){
        if(e.keyCode>=60 && e.keyCode<=90  ){
            const pressedLetter = e.key;
            
            if(selectedWords.includes(pressedLetter)){
                if(!correctwords.includes(pressedLetter)){
                    correctwords.push(pressedLetter);
                    displayWord()
                }else{
                    displayNotification()
                }
            }else {
                if(!wrongwords.includes(pressedLetter)){
                    wrongwords.push(pressedLetter);
                    updateWrongLetters()
                    parts.forEach((part,index)=>{
                        // console.log(index)
                        console.log(wrongwords.length)
                        const errors = wrongwords.length;
                        if(index < errors){
                            part.style.display = "block";
                        }else{
                            part.style.display="none"
                        }
                    })
                }else{
                    displayNotification()
                }
            }
        }
        const innerWord = guessWord.innerText.replace(/\n/g,'')
        console.log(innerWord)
        if (selectedWords===innerWord){
            FinalMsg.innerText = "Congratulations! You won! 😃"
            popUp.style.display = "block"
        }
        if(wrongwords.length>5){
            FinalMsg.innerText = "You failed try again"
            popUp.style.display = "block"
        }
    }
    
    function updateWrongLetters(){
        wrong.innerHTML=`
        ${wrongwords.length>0?`<h2>Wrong</h2>`:''}
        ${wrongwords.map(letter=>`<span class="font">${letter}</span>`)}
        `
    }
    
    
    function displayNotification(){
        notification.style.display="flex";
        
        setTimeout(()=>{
            notification.style.display="none"
        },2000)
    }

    function restartgame(){
        correctwords.splice(0);
  wrongwords.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetters();

  popUp.style.display = 'none';
  parts.forEach(item=>{
      item.style.display="none"
  })
    }
    
    