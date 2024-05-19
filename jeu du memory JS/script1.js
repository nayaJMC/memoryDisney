/*
TO DO LIST

- Gérer l'aléatoire dans le placement des images
- Pouvoir choisir le nombre de cartes en jeu
- Gerer les débuts et fins de partie
- Ajouter une animation (conféti) lors de victoire
- pouvoir relancer une partie
- Gérer le bug du click deux fois sur une même image
- Compter le nombre de couts pour gagner (stocker des stats en cookies ?)

*/


//Déclarer un tableau de toutes les cartes
let jeuTableau;
let allCards = document.getElementById(".card");
let cptClickCurrent = 0;
let dataImageShowed;

allCards.forEach(card => {
    card.addEventListener("click", function(){
        playGame(card);
    });
});

function playGame(card){
    cptClickCurrent ++;

    if(cptClickCurrent == 1){
        //premier click, je cache les images trouvées avant
        allCards.forEach(card => {
            if(card.classList.contains("finded")){
                //c'est une carte trouvée
            }
            else{
                //pas trouvée, il faut qu'elle soit masquée
                card.classList
            }
        })
    }
}