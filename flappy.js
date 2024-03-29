document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas')
    const pipewidth = canvas.clientWidth / 6
    var spacing = 20
    var pipes = []
    var Ids = []
    var fallID;
    var pipeID;
    var createpipeID;
    var collisionID;
    var jumpID;
    var score = 0
    var jumpheight = 40
    var startButton = document.getElementById('startbtn')
    startButton.style.top = `${(canvas.clientHeight / 2) - (startButton.clientHeight / 2) + 70}px`
    startButton.style.left = `${(canvas.clientWidth / 2) - (startButton.clientWidth / 2)}px`
    var scoreText = document.getElementById('score')




    function createPipe() {
        var upperPipe = document.createElement('div')
        var lowerPipe = document.createElement('div')
        var random = Math.floor(Math.random() * 50)
        random += 10
        var upperHeight = random
        var lowerHeight = 100 - random - spacing



        var left = canvas.clientWidth + 10
        upperPipe.style.height = `${upperHeight}%`
        upperPipe.style.width = `${pipewidth}px`
        upperPipe.style.left = `${left}px`
        upperPipe.classList.add('pipe')

        lowerPipe.style.height = `${lowerHeight}%`
        lowerPipe.style.width = `${pipewidth}px`
        lowerPipe.style.top = `${random + spacing}%`
        lowerPipe.style.left = `${left}px`
        lowerPipe.classList.add('pipe')

        canvas.appendChild(upperPipe)
        canvas.appendChild(lowerPipe)
        pipes.push([left, upperPipe, lowerPipe])
    }

    function removePipe(upper, lower) {
        var upperParent = upper.parentNode
        upperParent.removeChild(upper)
        var lowerParent = lower.parentNode
        lowerParent.removeChild(lower)

    }

    function movePipes(item) {
        if (item[0] === Math.floor(canvas.clientWidth / 2 - 20)) {
            score++
            updateScore()
        }

        if (item[0] <= 0) {
            //remove pipe
            removePipe(item[1], item[2])
            pipes.shift()
        } else {
            item[0] -= 1
            item[1].style.left = `${item[0]}px`
            item[2].style.left = `${item[0]}px`
        }

    }

    function updatePipes() {
        pipes.forEach(movePipes)
    }


    function createBird() {
        var bird = document.createElement('div')
        bird.classList.add('bird')
        var tmp = canvas.clientHeight / 2 - 15
        bird.style.left = `${canvas.clientWidth / 2 - 25}px`
        bird.style.top = `${tmp}px`
        console.log(tmp)
        canvas.appendChild(bird)
        return [bird, tmp]
    }



    function playerFall() {
        if (player[1] < (canvas.clientHeight - 50)) {

            player[1] += 1.5
            player[0].style.top = player[1] + 'px'
        }
    }


    function playerJump() {
        if (player[1] >= 50 & jumpheight >= 0) {
            jumpheight -= 1
            player[1] -= 2
            player[0].style.top = player[1] + 'px'
        } else {
            clearInterval(jumpID)
            Ids.splice(Ids.indexOf(jumpID), 1)

            fallID = setInterval(playerFall, 5)
            Ids.push(fallID)

            jumpheight = 40

        }
    }

    function checkCollision(pipeElement) {
        var playerRightEdge = canvas.clientWidth / 2 + 20
        var playerTopEdge = player[1] - 15
        var playerBottomEdge = player[1] + 15
        if (pipeElement[0] < playerRightEdge & (pipeElement[0] + pipewidth) > playerRightEdge) {
            if (playerTopEdge <= pipeElement[1].clientHeight | playerBottomEdge >= canvas.clientHeight - pipeElement[2].clientHeight) {
                gameOver()
            }

        }

    }
    function updateCollision() {
        pipes.forEach(checkCollision)
    }

    function initIntervals() {
        fallID = setInterval(playerFall, 5);
        pipeID = setInterval(updatePipes, 10)
        createpipeID = setInterval(createPipe, 2500)
        collisionID = setInterval(updateCollision, 1);
        Ids.push(fallID)
        Ids.push(pipeID)
        Ids.push(createpipeID)
        Ids.push(collisionID)

    }

    function updateScore() {
        scoreText.innerHTML = `Score: ${score}`
    }


    var player;

    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'
        score = 0
        updateScore()
        player = createBird()
        initIntervals()

    })

    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            clearInterval(fallID)
            Ids.splice(Ids.indexOf(fallID), 1)
            try {
                this.clearInterval(jumpID)
                jumpheight = 40
                jumpID = this.setInterval(playerJump, 2)
                Ids.push(jumpID)
            } catch {
                jumpID = this.setInterval(playerJump, 2)
                Ids.push(jumpID)
            }

        };
    });

    function removeIntervals() {
        Ids.forEach((item) => {
            clearInterval(item)
        })
        Ids = []
    }

    function removeAllPipes() {
        pipes.forEach((element) => {
            try {
                var upper = element[1]
                var lower = element[2]
                var upperParent = upper.parentNode
                upperParent.removeChild(upper)
                var lowerParent = lower.parentNode
                lowerParent.removeChild(lower)
            } catch {

            }

        })
        pipes = []
    }
    function removePlayer() {
        var playerParent = player[0].parentNode
        playerParent.removeChild(player[0])
        player = [0, 0]
    }

    function gameOver() {
        console.log('GAME OVER!')
        console.log(Ids)
        removeIntervals()
        removeAllPipes()
        removePlayer()

        startButton.style.display = 'flex'
    }

});