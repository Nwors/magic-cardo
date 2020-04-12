
const FMagicCardo = require("./Card")
const FPlayAreaInit = require("./PlayAreaInit")

function GameHelper() {

    createCardPairs = numOfPairs => {
        let deck = []
        for(let i = 0; i < numOfPairs; i++) {
            let newCard1 = FMagicCardo(`url(img/cardBack.png)`,`url(img/${i}.jpg)`)
            let newCard2 = FMagicCardo(`url(img/cardBack.png)`,`url(img/${i}.jpg)`)

            newCard1.div.id = `magicCardo${i}_1`
            newCard2.div.id = `magicCardo${i}_2`
            deck.push(newCard1)
            deck.push(newCard2)
        }
        return deck.sort(_=> { return .5 - Math.random() } )
    }

    printCards = deck => {
        let margin = 0
        let deckPlaceHolderSelector = document.getElementById("deckPlaceHolder")
        deck.forEach(card => {
            card.div.style.marginLeft = margin + "%"
            deckPlaceHolderSelector.appendChild(card.div)
            margin += 0.2
        })
    }

    moveCardsToPlayField = deck => {
        let playFieldSelector = document.getElementById("playField")
        let rowNumber = 0;
        deck.forEach(card => {
            if(deck.indexOf(card)%6 == 0) { rowNumber++ }
            card.div.style.gridColumn = `${deck.indexOf(card)%6 + 1}/${deck.indexOf(card)%6 + 1}`
            card.div.style.gridRow = `${rowNumber}/${rowNumber}`
            card.div.style.marginLeft = 0 + "px"
            card.div.style.position = ""
            playFieldSelector.appendChild(document.getElementById(card.div.id))
        })
    }

    prepareArea = deck => {
        FPlayAreaInit(deck.size)
        printCards(deck)
    }

    removeCardPairById = (id,deck) => {
        let cardPair = []
        deck.forEach(card => {
            if(card.div.id.slice(0,-2) == id.slice(0,-2)) {
                cardPair.push(card)
                document.getElementById(card.div.id).remove()
            }
        })
        deck.splice(deck.indexOf(cardPair.pop()),1)
        deck.splice(deck.indexOf(cardPair.pop()),1)
    }

    turnOverOpenCards = deck => {
        deck.forEach(card => {
            if(card.position) {
                card.turnOver()
            }
        })
    }

    removeCards = deck => {
        deck.forEach(card => {
            document.getElementById(card.div.id).remove()
        })
        deck = []
    }

    recordStat = (playerName, dif, numberOfClicks) => {
        let ulSelector = document.getElementById("recordList")
        let li = document.createElement("li")
        li.textContent = `Игрок ${playerName} справился с игрой на сложности ${dif}, за ${numberOfClicks} кликов`
        ulSelector.appendChild(li)
    }

    gameStart = (playerName, dif, deck) => {
        moveCardsToPlayField(deck)
        let clickCounter = 0
        deck.forEach(card => {
            let divSelector = document.getElementById(card.div.id)
            divSelector.onclick = _ => {
                clickCounter++
                let idArray = []
                let openCardCounter = 0
                card.turnOver()
                deck.forEach(card => { if(card.position) { openCardCounter++; idArray.push(card.div.id) }})
                if(openCardCounter == 2) {
                    let id0 = idArray.shift()
                    let id1 = idArray.shift()
                    if(id0.slice(0,-2) == id1.slice(0,-2)) {
                        setTimeout(_=> removeCardPairById(id0,deck),1000)
                        if(deck.length == 2){ setTimeout(_=>alert("Игра окончена! Проверьте страницу рекордов"),1005); recordStat(playerName,dif,clickCounter) }
                    } else { setTimeout(_=> turnOverOpenCards(deck),1000) }
                }
            }
        })
    }
    return {
        createCardPairs,
        prepareArea,
        removeCards,
        gameStart
    }
}

module.exports = GameHelper