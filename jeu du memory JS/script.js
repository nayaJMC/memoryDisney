/*
TO DO LIST

- Compter le nombre de coup pour gagner (stcker des stats en cookies)
*/
// Commencer par crée un tableau de 5 ligne

//Déclarer un tableau de toutes les cartes
let jeuTableau;
let cptClickCurrent = 0;
let cardClickedId;//je stock la valeur du click(si je click sur mickey c'est mickey qui est stocké)
const cards = ["Mickey", "Pluto", "Donald", "Minnie", "daisy", "Hercule"];// rajouter des cartes ici si on veut plus de cartes ("base de donné")
const gameBoard = document.getElementById("GameBoard");
let nbPairesOnGame;
let cptCartesTrouvees = 0; 



document.getElementById("playButton").addEventListener("click", function(){
    let nbCardInput = document.getElementById("nbCardInput")
    initGame(nbCardInput.value);
});
//je veux que toutes les cartes quand on click dessus si elles sont caché (hidden) on l'enleve
//si elles sont visible (show) on les caches 


//cette fonctin gère ce qu'il se passe 
//quand on clique sur une carte

document.getElementById("moreCards").addEventListener("click", function(){
    let nbCardInput = document.getElementById("nbCardInput")
    if(nbCardInput.value < 6){
        nbCardInput.value ++
    }
})

document.getElementById("lessCards").addEventListener("click", function(){
    let nbCardInput = document.getElementById("nbCardInput")
    if(nbCardInput.value > 2){nbCardInput.value --}
  
});

function clickOnCardEvent(card){
    let allCards = document.querySelectorAll(".card");
    //Je selectionne les classes qui portent le nom "card"
    if(card.classList.contains("finded")){
        return
    }
    cptClickCurrent ++// est ce que j'ai cliqué sur la premiere ou la deuxieme ?
    
    if(cptClickCurrent == 1){ // premier click, je cahce les images trouvées avant
        allCards.forEach(card => {
            if(card.classList.contains("finded")){
                //c'est une carte trouvée
            }
            else{
                //pas trouvée, il faut qu'elle soit masquée
                card.classList.add("hidden");
            }
        });
        //j'affiche la carte sur la quelle je viens de clicquer
        card.classList.remove("hidden")
        //je stock la réponse derrière la carte
        cardClickedId = card.id
    }
    else if(cptClickCurrent == 2){
        //deuxième click, je vérifie si l'iamge a été trouvée
        if(cardClickedId == card.id){
            cptClickCurrent = 1
            return;
        }
        else{
            card.classList.remove("hidden");
            let cardClickedBefore = document.getElementById(cardClickedId);
            if( cardClickedBefore.dataset.image == card.dataset.image){
                allCards.forEach(card => {
                    if(card.classList.contains("hidden")){
                        //c'est une image caché 
                    }
                    else if(!card.classList.contains("finded")){
                        card.classList.add("finded")
                        //nb carte trouvée
                        cptCartesTrouvees++;
                    }
                });
            }
            cptClickCurrent = 0 //remise a 0 des click car dans le jeu du memory on a que deux click
            cardClickedId = "";

            if(cptCartesTrouvees == nbPairesOnGame*2){
                setAnimationWin();
            }
            dataImageshowed = ""
        }
        
        
        
    }
}

function initGame(nbPaires){
    stopAnimation();
    gameBoard.innerHTML = ""
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0;
    let gameCard = [];
    for (let i = 0; i < nbPaires; i++) {
        gameCard.push([cards[i], false]);
        gameCard.push([cards[i], false]);
    }
    console.log(gameCard);
    
    for (let i = 0; i < gameCard.length; i++){// pour chaque carte il faut générer un chiffre aléatoire
        let cardIsPositionned = false;
        while(!cardIsPositionned){
            let randomNumber = getRandomArbitrary(0, gameCard.length);
            if(gameCard[randomNumber][1] == false){
                cardIsPositionned = true;
                gameCard[randomNumber][1] = true;
                //il faut géréner le code HTMl et l'inclure
                let cardHtml = getHtmlCodeCard(gameCard[randomNumber][0], i);
                gameBoard.innerHTML += cardHtml;
            }
        }
    }

    let allCards = document.querySelectorAll(".card")
    allCards.forEach(card => {
        card.addEventListener("click", function(){
            clickOnCardEvent(card);  
        });
    });
}
function getRandomArbitrary(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getHtmlCodeCard(nomCard, id){
    return `<div class="card hidden" id="${id}" data-image="${nomCard}">
                <img src="${nomCard}.png" />
            </div>`;
}

function setAnimationWin(){
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";
    for(let i = 0; i < 100; i++){
        let confeti = document.createElement("div");
        confeti.classList.add("confetti");
        confeti.style.left = getRandomArbitrary(0,100)+'%';
        confeti.style.animationDelay = 50*i+"ms";
        confeti.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        animateDiv.appendChild(confeti);
    }
};

function stopAnimation(){
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";
}