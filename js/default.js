(function(){

    function addEventListener(listenButton){
        listenButton.addEventListener("click", function(event){
            // Get clicked radio
            var radioUri = event.toElement.dataset.radioUri;
            // Get player
            var player = document.getElementById('audioPlayer');
            // Set new radio to the player
            player.innerHTML = "<source id='sourcePL' src='"+radioUri+"' type='audio/mpeg'/>";
            // Set info new url
            var infoLink = document.getElementById('info').firstChild;
            if(typeof event.toElement.dataset.radioInfo === 'string'){
                infoLink.href = event.toElement.dataset.radioInfo;
            }
            else{
                infoLink.removeAttribute('href');
            }
            // Reload and play
            player.load();
            playPlayer();
            // Set to select current radio
            selectRadio(event.toElement);
        });
    }

    function setControlsListeners(){
        var playPauseButton = document.getElementById('player-play-pause');
        playPauseButton.addEventListener('click', function(){
            var player = document.getElementById('audioPlayer');
            if(player.paused){
                playPlayer();
            }
            else{
                pausePlayer();
            }
        });
    }

    function selectRadio(elem){
        deselectRadios();
        elem.dataset.selected = "true";
    }

    function deselectRadios(){
        var listenButtons = document.getElementsByClassName("listenRadio");
        for(i=0; i< listenButtons.length; i++){
            listenButtons[i].dataset.selected = "false";
        }
    }

    function pausePlayer(){
        var player = document.getElementById('audioPlayer');
        if(player.firstChild.nodeName==='SOURCE'){
            player.pause();
            // Change control icon
            var playPauseButton = document.getElementById('player-play-pause');
            playPauseButton.innerHTML = '<img src="img/play.png"/>';
        }
    }

    function playPlayer(){
        var player = document.getElementById('audioPlayer');
        if(player.firstChild.nodeName==='SOURCE'){
            player.play();
            // Change control icon
            var playPauseButton = document.getElementById('player-play-pause');
            playPauseButton.innerHTML = '<img src="img/pause.png"/>';
        }
    }


    var listenButtons = document.getElementsByClassName("listenRadio");
    var i = 0;
    for(i=0; i<listenButtons.length; i++){
        addEventListener(listenButtons[i]);
    }

    setControlsListeners();

})();