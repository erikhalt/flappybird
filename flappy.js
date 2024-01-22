document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas')
    const pipewidth = canvas.clientWidth / 6
    const spacing = 20
    var pipes = []
    var Ids = []
    var startButton = document.getElementById('startbtn')
    startButton.style.top = `${(canvas.clientHeight / 2) - (startButton.clientHeight / 2) + 70}px`
    startButton.style.left = `${(canvas.clientWidth / 2) - (startButton.clientWidth / 2)}px`





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
        lowerPipe.style.bottom = `${-20}%`
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
        var tmp = canvas.clientHeight / 2 - 25
        bird.classList.add('bird')
        bird.style.left = `${canvas.clientWidth / 2 - 25}px`
        bird.style.top = `${tmp}px`
        canvas.appendChild(bird)
        return [bird, tmp]
    }



    function playerFall() {
        if (player[1] < (canvas.clientHeight - 50)) {

            player[1] += 1
            player[0].style.top = player[1] + 'px'
        }
    }

    function playerJump() {
        for (i = 2; i < 22; i += 2) {
            if (player[1] >= 50) {
                player[1] -= i
                player[0].style.top = player[1] + 'px'
            }
        }
    }


    function checkCollision(pipeElement) {
        var playerRightEdge = canvas.clientWidth / 2 + 20
        var playerTopEdge = player[1]
        var playerBottomEdge = player[1] - 45
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
        var fallID = setInterval(playerFall, 5);
        var pipeID = setInterval(updatePipes, 10)
        var createpipeID = setInterval(createPipe, 2500)
        var collisionID = setInterval(updateCollision, 1);
        Ids.push(fallID)
        Ids.push(pipeID)
        Ids.push(createpipeID)
        Ids.push(collisionID)

    }


    var player = createBird();

    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'
        initIntervals()

    })

    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            clearInterval(fallID)
            playerJump()
            if (fallID === null) {
                var fallID = setInterval(playerFall, 5)
            };
        };
    });

    function gameOver() {
        console.log('GAME OVER!')
        Ids.forEach((item) => {
            clearInterval(item)
        })
        Ids = []

        pipes.forEach((element) => {


            var upper = element[1]
            var lower = element[2]
            var upperParent = upper.parentNode
            upperParent.removeChild(upper)
            var lowerParent = lower.parentNode
            lowerParent.removeChild(lower)

        })
        pipes = []
        startButton.style.display = 'flex'
    }
});