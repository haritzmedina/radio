(function(){

    /**
     * Stations playing functionality
     */

    function addEventListener(listenButton){
        listenButton.addEventListener("click", function(event){
            // Get clicked radio
            var currentStation = document.getElementById('audioPlayer').dataset.station || '';
            var newStation = event.toElement.innerText;
            if(newStation!==currentStation){
                // Get selected radio media URI
                var radioUri = event.toElement.dataset.radioUri;
                // Get player
                var player = document.getElementById('audioPlayer');
                // Set new radio to the player
                player.innerHTML = "<source id='sourcePL' src='"+radioUri+"' type='audio/mpeg'/>";
                player.dataset.station = event.toElement.innerText;
                // Reload and play
                player.load();
                playPlayer();
                // Set to select current radio
                selectRadio(event.toElement);
            }
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
            var playPauseIcon = document.getElementById('player-play-pause').children[0];
            playPauseIcon.src = 'img/play.png';
        }
    }

    function playPlayer(){
        var player = document.getElementById('audioPlayer');
        if(player.firstChild.nodeName==='SOURCE'){
            player.play();
            // Change control icon
            var playPauseIcon = document.getElementById('player-play-pause').children[0];
            playPauseIcon.src = 'img/pause.png';
        }
    }


    var listenButtons = document.getElementsByClassName("listenRadio");
    var i = 0;
    for(i=0; i<listenButtons.length; i++){
        addEventListener(listenButtons[i]);
    }

    setControlsListeners();

    /**
     * Station metadata related functionality
     */
        function updateSongMetadata(){
        var stationName = document.getElementById('audioPlayer').dataset.station;
        if(typeof stationName==='string'){
            $.getJSON('metadata.php?name='+stationName, function(result){
                if(typeof result.metadata.title === 'string'){
                    var songTitleWrapper = document.getElementById('songtitle');
                    if(result.metadata.title!==songTitleWrapper.innerText){
                        var songChangedEvent = new CustomEvent('songChanged', {detail: result});
                        songTitleWrapper.dispatchEvent(songChangedEvent);
                    }
                    // Set song title
                    document.getElementById('songtitle').innerText = result.metadata.title;
                    // Update youtube link
                    document.getElementById('youtubeLink').href =
                        'https://www.youtube.com/results?search_query='+result.metadata.title;
                }
                else{
                    document.getElementById('songtitle').innerText = "";
                    document.getElementById('youtubeLink').removeAttribute('href');
                }
            });
        }
    }

    setInterval(updateSongMetadata, 3000);

    /**
     * TODO History handlers
     */

    function setHistoryHandlers(){
        var songTitleWrapper = document.getElementById('songtitle');
        songTitleWrapper.addEventListener('songChanged', function(event){

            var historyPanel = document.getElementById('historyPanel');
            // Create history song
            var content = document.importNode(document.querySelector('#historySongTemplate').content, true);
            var historySong = content.children[0];

            var d = new Date();
            var timeStampString = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2);

            historySong.dataset.timestamp = d.getTime();
            historySong.dataset.title = event.detail.metadata.title;
            historySong.dataset.title = event.detail.station.name;

            historySong.querySelector('.historySongTitle').innerText = event.detail.metadata.title;
            historySong.querySelector('.historySongTimestamp').innerText = event.detail.station.name;
            historySong.querySelector('.historySongStation').innerText = timeStampString;
            historySong.querySelector('.historySongYoutubeWrapper').querySelector('a').href =
                'https://www.youtube.com/results?search_query='+event.detail.metadata.title;

            historyPanel.prepend(historySong);
        })
    }

    setHistoryHandlers();


})();