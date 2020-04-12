
function MagicCardo(backImg,frontImg) {

    //create div for Card

    let div = document.createElement('div')
    div.style.backgroundImage = backImg
    div.style.position = "absolute"
    div.style.width = "180px"
    div.style.height = "273px"
    div.style.backgroundSize = "100% 100%"
    //

    return {
        backImg: backImg, frontImg: frontImg, div: div, position: false,
        turnOver() {
            this.position ? this.div.style.backgroundImage = this.backImg : this.div.style.backgroundImage = this.frontImg
            this.position = !this.position
        }
    }
}

module.exports = MagicCardo