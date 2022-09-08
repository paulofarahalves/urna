let yourVoteTo = document.querySelector('.d-1-1 span');
let role = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

let currentStage = 0;
let currentNumber = '';
let blankVote = false;
let votes = [];

function startStage() {
    let stage = stages[currentStage];
    let numberHTML = '';
    currentNumber = '';
    blankVote = false;

    for(let i=0;i<stage.numeros;i++){
        if(i === 0){
            numberHTML += '<div class="number blink"></div>';
        } else {
            numberHTML += '<div class="number"></div>';
        }      
    }

    yourVoteTo.style.display = 'none';
    role.innerHTML = stage.titulo;
    description.innerHTML = '';
    warning.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHTML;
}

function refreshInterface() {
    let stage = stages[currentStage];
    let candidate = stage.candidatos.filter((item)=>{
        if(item.numero === currentNumber) {
            return true;
        } else {
            return false;
        }
    });

    if(candidate.length > 0){
        candidate = candidate[0];
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.nome}<br/>Partido: ${candidate.partido}`;
        let photosHtml = '';

        for(let i in candidate.fotos){
            if(candidate.fotos[i].small){
                photosHtml += `<div class="d-1-image small"><img src="images/${candidate.fotos[i].url}" alt="">${candidate.fotos[i].legenda}</div>`;
            } else {
                photosHtml += `<div class="d-1-image"><img src="images/${candidate.fotos[i].url}" alt="">${candidate.fotos[i].legenda}</div>`;
            }
        }
        side.innerHTML = photosHtml;
    } else {
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="warning--big blink">VOTO NULO</div>';  
    }
}

function clicked(n) {
    let elNumber = document.querySelector('.number.blink');
    if(elNumber !== null){
        elNumber.innerHTML = n;
        currentNumber = `${currentNumber}${n}`;
        elNumber.classList.remove('blink');

        if(elNumber.nextElementSibling !== null){
            elNumber.nextElementSibling.classList.add('blink');
        } else {
            refreshInterface();
        }
        
    }
}

function blank() {
    currentNumber = '';
    blankVote = true;
    yourVoteTo.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="warning--big blink">VOTO EM BRANCO</div>'; 
    side.innerHTML = '';
}

function correct() {
    startStage();
}

function confirm() {
    let stage = stages[currentStage];
    let confirmedVote = false;

    if(blankVote === true) {
        confirmedVote = true;
    } else if(currentNumber.length === stage.numeros) {
        confirmedVote = true;
    }

    if(confirmedVote) {
        currentStage++;
        if(stages[currentStage] !== undefined){
            startStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="warning--very-big blink">FIM</div>';
            console.log(votos);
        }
    }
}

startStage();