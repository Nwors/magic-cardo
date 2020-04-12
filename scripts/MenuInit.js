
const FGameHelper = require("./GameHelper")

function MenuInit() {
    //mainView
    let mainViewSelector = document.getElementById("mainView")
    let playBtnSelector = document.getElementById("playBtn")
    let recordsBtnSelector = document.getElementById("recordsBtn")
    //

    //gameView
    let gameViewSelector = document.getElementById("gameView")
    let backBtnSelector0 = document.getElementById("backBtn0")
    //game settings buttons
    let easyBtnSelector = document.getElementById("easy")
    let mediumBtnSelector = document.getElementById("medium")
    let hardBtnSelector = document.getElementById("hard")
    let startGameBtnSelector = document.getElementById("startGameBtn")

    //recordView
    let backBtnSelector1 = document.getElementById("backBtn1")
    let recordViewSelector = document.getElementById("recordView")

    //create GameHelper obj
    let gameHelper = FGameHelper()

    //mainView
    playBtnSelector.onclick = _ => { mainViewSelector.style.visibility = "hidden"; gameViewSelector.style.visibility = "visible" }
    recordsBtnSelector.onclick = _ => { mainViewSelector.style.visibility = "hidden"; recordViewSelector.style.visibility = "visible" }

    //gameView
    backBtnSelector0.onclick = _ => { gameViewSelector.style.visibility = "hidden"; mainViewSelector.style.visibility = "visible" }

    //recordView
    backBtnSelector1.onclick = _ => { recordViewSelector.style.visibility = "hidden"; mainViewSelector.style.visibility = "visible" }

    //game settings buttons
    let deck = []
    let dif = ""
    easyBtnSelector.onclick = _ => {
        dif = "Easy"
        gameHelper.removeCards(deck)
        deck = gameHelper.createCardPairs(5)
        gameHelper.prepareArea(deck)
    }

    mediumBtnSelector.onclick = _ => {
        dif = "Medium"
        gameHelper.removeCards(deck)
        deck = gameHelper.createCardPairs(10)
        gameHelper.prepareArea(deck)
    }

    hardBtnSelector.onclick = _ => {
        dif = "Hard"
        gameHelper.removeCards(deck)
        deck = gameHelper.createCardPairs(15)
        gameHelper.prepareArea(deck)
    }

    startGameBtnSelector.onclick = _ => {
        let playerName = ""
        if(!deck.length) { alert("Choose difficult"); return} else {playerName = prompt("Player name")}
        while(!playerName.trim().length) { playerName = prompt("Player name") }
        gameHelper.gameStart(playerName,dif,deck)
    }
}

module.exports = MenuInit
