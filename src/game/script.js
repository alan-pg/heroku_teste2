let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let jogo = game();
let telas = criaTelas();
let score = document.getElementById("score");
let level = document.getElementById("level")
let total_score = 0
let total_level = 1;
let box = 32;
let snake = [];
let aux_snake = {
    x: 0,
    y: 0
}

let bg_color = "#90EE90";
let aux_bg_color = 0;

var img_start_game = new Image();
var img_game_over = new Image();

const effect_up_level = new Audio('./effects/smw_1-up.wav')
const effect_scored = new Audio('./effects/smw_yoshi_swallow.wav');
const effect_game_over = new Audio('./effects/smw_lost_a_life.wav');

snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let diretion = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var form_name = document.getElementById('form_name')
var player_name = document.getElementById('player_name')
var name = ''

document.addEventListener('keydown', update);
form_name.addEventListener('submit', function(e) {
  e.preventDefault();
  name = player_name.value
  if(name != ''){
    document.getElementById('p_name').innerHTML = name
    modal.style.display = "none";
  }
});



function createBG() {
    if (total_level == 6) {
        if (aux_bg_color == 0) {
            bg_color = "#8B008B"
            aux_bg_color = 1
        } else {
            bg_color = "#da08da"
            aux_bg_color = 0
        }
    }
    context.fillStyle = bg_color
    context.fillRect(0, 0, 16 * box, 16 * box)
}

createBG();
telas.telaInicial();


function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        if (i == 0) {
            if (diretion == "up") {
                context.fillStyle = "white";
                context.fillRect(snake[i].x + 20, snake[i].y + 5, 3, 20);
                context.fillRect(snake[i].x + 10, snake[i].y + 20, 3, 5);
            }
            if (diretion == "down") {
                context.fillStyle = "white";
                context.fillRect(snake[i].x + 10, snake[i].y + 5, 3, 20);
                context.fillRect(snake[i].x + 25, snake[i].y + 5, 3, 5);
            }
            if (diretion == "right") {
                context.fillStyle = "white";
                context.fillRect(snake[i].x + 5, snake[i].y + 20, 20, 3);
                context.fillRect(snake[i].x + 5, snake[i].y + 5, 3, 5);
            }
            if (diretion == "left") {
                context.fillStyle = "white";
                context.fillRect(snake[i].x + 5, snake[i].y + 20, 20, 3);
                context.fillRect(snake[i].x + 25, snake[i].y + 5, 3, 5);
            }
        }

    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function resetSnake() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
}

function resetGame() {
    resetSnake();
    document.addEventListener('keydown', update);
    score.innerHTML = 0;
    level.innerHTML = 1;
    total_score = 40;
    bg_color = "#90EE90";    
    diretion = "right";
}

function scored() {
    total_score++;
    score.innerHTML = total_score
    effect_scored.pause();
    effect_scored.play();
    if (total_score == 150) {
        effect_up_level.play();
        resetSnake();
        jogo.speed(40)
        total_level++;
    } else if (total_score == 140) {
        effect_up_level.play();
        resetSnake();
        bg_color = "#8B008B"
        jogo.speed(50)
        total_level++;
    } else if (total_score == 110) {
        effect_up_level.play();
        resetSnake();
        bg_color = "#BA55D3"
        jogo.speed(60)
        total_level++;
    } else if (total_score == 80) {
        effect_up_level.play();
        resetSnake();
        bg_color = "#ADFF2F"
        jogo.speed(70)
        total_level++;
    } else if (total_score == 45) {
        effect_up_level.play();
        resetSnake();
        bg_color = "#006400"
        jogo.speed(90)
        total_level++;
    }
    level.innerHTML = total_level;
}

function update(event) {    
  if(event.keyCode >=37 && event.keyCode <=40){
    if (event.keyCode == 37 && diretion != "right") diretion = "left";
    if (event.keyCode == 38 && diretion != "down") diretion = "up";
    if (event.keyCode == 39 && diretion != "left") diretion = "right";
    if (event.keyCode == 40 && diretion != "up") diretion = "down";
    document.removeEventListener('keydown', update)
  }
    if (event.keyCode == 13 && !jogo.isRunning()) jogo.start(100);
    if (event.keyCode == 32) jogo.stop();
}

function iniciaJogo() {    
    createBG();
    criarCobrinha();
    drawFood();
    
    //VERIFICA COLISÃO COM O CORPO DA SNAKE
    for (let i = 1; i < snake.length; i++) {        
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {             
           fazColisao()
        }
    }

    //DEFINE A PRÓXIMA POSIÇÃO DA SNAKE
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (diretion == "right") snakeX += box;
    if (diretion == "left") snakeX -= box;
    if (diretion == "up") snakeY -= box;
    if (diretion == "down") snakeY += box;

    //PERMITE QUE A SNAKE ATRAVESSE A PAREDE E RETORNE NO LADO OPOSTO
    if (diretion == "right" && snakeX > 15 * box) snakeX = 0
    if (diretion == "left" && snakeX < 0) snakeX = 15 * box
    if (diretion == "down" && snakeY > 15 * box) snakeY = 0
    if (diretion == "up" && snakeY < 0) snakeY = 15 * box

    //VERIFICA COLISÃO COM A FRUTA
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //SE NÃO HOUVE COLISÃO COM A FRUTA, RETIRA A ÚLTIMA POSIÃO DO ARRAY PARA DAR SENSAÇÃO DE MOVIMENTO
    } else {
        //SE COLIDIU COM A FRUTA, NÃO RETIRA A ÚLTIMA POSIÇÃO DO ARRAY PARA A SNAKE CRESCER E DEFINE POSIÇÃO DA NOVA FRUTA
        scored(); 
        food.x = Math.floor(Math.random() * 15 + 1) * box; 
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }    

     

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead) //ATUALIZA O INÍCIO DO ARRAY DANDO MOVIMENTO A SNAKE

    //ATIVA NOVAMENTE A ESCUTA DO TECLADO
    document.addEventListener('keydown', update);
    
}

function game() {
    var currentGame;
    var isRunning = false;
    return {
        start() {
            resetGame();
            currentGame = setInterval(iniciaJogo, 110)
            isRunning = true
        },
        stop() {
            clearInterval(currentGame)
            isRunning = false
        },
        speed(interval) {
            clearInterval(currentGame)
            currentGame = setInterval(iniciaJogo, interval)
        },
        isRunning(){
          return isRunning
        }
    }
}

function criaTelas() {
    return {
        telaInicial() {
            img_start_game.src = './effects/tela.jpg';
            img_start_game.onload = function () {
                context.drawImage(img_start_game, 120, 150)
            }
        },
        telaGameOver() {
            createBG()
            img_game_over.src = './effects/gameover.jpg'
            img_game_over.onload = function () {
                context.drawImage(img_game_over, 120, 150)
            }
        }
    }
}

function fazColisao(){
  if(total_score > scores[scores.length - 1].score){
    scores.push({"name": name, "score": total_score})
    scores.sort((a,b) => b.score - a.score)
    scores.pop()
    saveScore(scores).then((resp) => resp == 'ok' ? getScore() : console.log('score não atualizado'))
    modal2.style.display = "block"
  }
  jogo.stop();
  telas.telaGameOver();
  effect_game_over.play();
}






const URL_TO_FETCH = 'http://localhost:3000/score';
const id2 = '5fb4321eeedd062f6421ea63'


let scores = []
let id = ''

getScore();

function getScore() {
    return fetch(URL_TO_FETCH, {
      method: 'get' // opcional 
    })
      .then(function (response) {
        console.log('resp get score', response)
        return response.json()
      }).then(function (resp) {
        id = resp.id
        scores = [...resp.score]
        scores.sort(function (a, b) {
          return b.score - a.score;
        })
        scores.forEach((element, index) => {
          //document.getElementById(`${index}`).innerHTML = `${element.name} ${element.score}`
          document.getElementById(`${index}`).innerHTML = `${index+1}º ${element.name} ${element.score}`
        });
        console.log('scores', scores)
      })
      .catch(function (err) {
        console.error('erro:',err);
      });
  }


  function saveScore(novo_score) {      
    return fetch(`${URL_TO_FETCH}/${id2}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(novo_score)
    }).then(function (response) {
      console.log('res save score', response)
      return response.text()
    }).catch(err => console.log('error save score', err))
  }


  


  function atualizaScore(pontos, nome) {
    scores.push({"name": name, "score": pontos})
    scores.sort((a,b) => b.score - a.score)
    scores.pop()
    
    saveScore(scores).then((resp)=> {
      console.log(resp)
      getScore()
      })
    
  
  }

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
/* btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById('teste').innerHTML = "200"
} */

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
/* window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} */

modal.style.display = "block";

/* const headers = {
  method: 'get',
  mode: 'cors',
  cache: 'default'
}
function getCountry(country) {
  return fetch('http://localhost:3000/score', headers)
    .then((response) => response.json())
}

getCountry().then((res) => console.log('res teste', res)) */