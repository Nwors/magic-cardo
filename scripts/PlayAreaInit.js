
function PlayAreaInit(numOfCards) {

    let playAreaSelector = document.getElementById("playArea")
    let playFieldSelector = document.getElementById("playField")

    playFieldSelector.style.width = `${180*6}px`
    playFieldSelector.style.height = `${Math.ceil(numOfCards/6)*273}px`
    playFieldSelector.style.gridTemplateColumns = "repeat(6,180px)"
    playFieldSelector.style.gridTemplateRows = `repeat(${Math.ceil(numOfCards/6)},273px)`
    playFieldSelector.style.gridGap = "10px 10px"

    playAreaSelector.style.width = playFieldSelector.style.width+273
    playAreaSelector.style.height = playFieldSelector.style.height
}

module.exports = PlayAreaInit