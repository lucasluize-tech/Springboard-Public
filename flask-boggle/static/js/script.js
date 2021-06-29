const $msg = $('.messages')
let guessInput = $('#guess').val()
const $timer = $('.timer')
const $board = $('#boggle')
const $score = $('.score')
const $guessList = $('#guesses')
const $form = $('.add-guess')

class BoggleGame {
    constructor(seconds=60){
        this.secs = seconds;
        this.showTimer();
        this.score = 0
        this.guessess = new Set();
        this.timer = setInterval(this.tick.bind(this), 1000)
        $form.on("submit", this.submitGuess.bind(this))
    }

    appendGuess(guess){
        $guessList.append($('<li>', {text: guess}))
    }

    showScore(){
        $score.text(this.score)
    }

    showMessage(message, cls){
        $msg.text(message).removeClass().addClass(`message ${cls}`)
    }


    async submitGuess(e){
        console.log(e)
        e.preventDefault()
        let guess = guessInput
        if(!guess) return;
        if (this.guessess.has(guess)){
            this.showMessage(`Already guessed ${guess}`, "error")
            return
        }

        const res = await axios.get('/validate', {params:{guess: guess}})

        if(res.data.result === "not-word"){
            this.showMessage(`${guess} is not a word`, "error")
        }else if (res.data.result === "not-on-board"){
            this.showMessage(`${guess} is not a word on this board`, "error")
        }else{
            this.appendGuess(guess)
            this.score += guess.length
            this.showScore()
            this.guessess.add(guess)
            this.showMessage(`you got it! ${guess} is valid word!`, "ok")
        }

        guessInput.val("")
    }


    showTimer(){
        $timer.text(this.secs)
    }

    async tick(){
        this.secs -= 1
        this.showTimer();
        if (this.secs === 0){
            clearInterval(this.timer);
            await this.gameScore()
        }
    }

    async gameScore(){
        $form.hide()
        const res = await axios.post('/scores', {score:this.score})
        if(res.data.record){
            this.showMessage(`New highscore: ${this.score}`, 'ok')
        }else {
            this.showMessage(`Final Score: ${this.score}`, 'ok')
        }
    }
}

let game = new BoggleGame(60);

