let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let aux_snake = {
    x: 0,
    y: 0
}
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let bg_color = "#90EE90";
let aux_bg_color = 0;
let diretion = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let jogo = game();
let telas = criaTelas();

let score = document.getElementById("score");
let level = document.getElementById("level")
let total_score = 0
let total_level = 1;

var img_start_game = new Image();
var img_game_over = new Image();
var mushroom =  new Image();
var mushroom2 =  new Image();
mushroom.src = './effects/Retro-Mushroom-1UP-1.png';
mushroom2.src = './effects/Retro-Mushroom-1UP-2.png';

const effect_up_level = new Audio('./effects/smw_1-up.wav')
const effect_scored = new Audio('./effects/smw_yoshi_swallow.wav');
const effect_game_over = new Audio('./effects/smw_lost_a_life.wav');

// Get the modal
var modal = modal()

var btn_close_modal_record = document.getElementById("close_modal");
btn_close_modal_record.onclick = modal.CloseModalNewRecord

var form_name = document.getElementById('form_name')
var player_name = document.getElementById('player_name')
var name = ''

document.addEventListener('keydown', update);
form_name.addEventListener('submit', function(e) {
  e.preventDefault();
  name = player_name.value
  if(name != ''){
    document.getElementById('p_name').innerHTML = name
    modal.CloseModalNamePlayer()
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

var cogumelo = 1
function drawFood() {
 /*  mushroom.onload = function () {
  } */
  if(cogumelo == 1){
    context.drawImage(mushroom, food.x, food.y)
    cogumelo = 0
  }else{
    context.drawImage(mushroom2, food.x, food.y)
    cogumelo = 1
  }
    /* context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); */
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
    modal_new_record.style.display = "block"
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


  function modal(){
    var modal_name_player = document.getElementById("modal_name_player");
    var modal_new_record = document.getElementById("modal_new_record");
    return {
      showModalPlayerName(){
        modal_name_player.style.display = "block";
      },
      CloseModalNamePlayer(){
        modal_name_player.style.display = "none";
      },
      ShowModalNewRecord(){
        modal_new_record.style.display = "block";
      },
      CloseModalNewRecord(){
        modal_new_record.style.display = "none";
      }
    }
  }

// Get the modal
/* var modal = document.getElementById("myModal"); */

// Get the <span> element that closes the modal
/* var span = document.getElementsByClassName("close")[0]; */


// When the user clicks on the button, open the modal
/* btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById('teste').innerHTML = "200"
} */

// When the user clicks on <span> (x), close the modal
/* span.onclick = function() {
  modal.style.display = "none";
} */




//modal_name_player.style.display = "block";
modal.showModalPlayerName()


var el = document.getElementById("snake");
el.addEventListener("touchstart", touchstart, false);
el.addEventListener("touchend", touchend, false);
el.addEventListener("touchcancel", touchcancel, false);
el.addEventListener("touchleave", touchleave, false);
el.addEventListener("touchmove", touchmove, false);
var array = []
var inicio = {}
var fim = {}
var distancia = 0
function touchstart(evt){
  if(!jogo.isRunning() && name != ''){
    jogo.start(100)
  }
    console.log('handleStart')
    inicio = { 
        pageX: Math.round(evt.changedTouches[0].pageX),
        pageY: Math.round(evt.changedTouches[0].pageY)
      }
    console.log('touchmove',inicio )
}

function touchend(evt){
  fim = { 
      pageX: Math.round(evt.changedTouches[0].pageX),
      pageY: Math.round(evt.changedTouches[0].pageY)
    }
    console.log('handleEnd')
    console.log('touchmove', fim)
    /* if(distancia > 10){
    } */
    direcao()
    distancia = 0
}
function touchcancel(){
    console.log('touchcancel')
}
function touchleave(){
    console.log('touchleave')
}
function touchmove(evt){
  distancia++
  console.log('distancia', distancia)
}

function direcao(){
  console.log('func direcao')
     
    var td_x = fim.pageX - inicio.pageX;
    var td_y = fim.pageY - inicio.pageY;
    // O movimento principal foi vertical ou horizontal?
    if( Math.abs( td_x ) > Math.abs( td_y ) ) {
       // é horizontal
       if( td_x < 0 ) {
          console.log('esquerda')
          if (diretion != "right") diretion = "left";
       } else {
        console.log('direita')
        if (diretion != "left") diretion = "right";
       }
    } else {
       // é vertical
       if( td_y < 0 ) {
        console.log('cima')
        if (diretion != "down") diretion = "up";
       } else {
        console.log('baixo')
        if (diretion != "up") diretion = "down";
       }     

    }
  }

