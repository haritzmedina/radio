(function () {

    /**
     * Stations playing functionality
     */

    function addEventListener(listenButton) {
        listenButton.addEventListener("click", function (event) {
            // Get clicked radio
            var currentStation = document.getElementById('audioPlayer').dataset.station || '';
            var newStation = event.toElement.innerText;
            if (newStation !== currentStation) {
                // Get selected radio media URI
                var radioUri = event.toElement.dataset.radioUri;
                // Get player
                var player = document.getElementById('audioPlayer');
                // Set new radio to the player
                player.innerHTML = "<source id='sourcePL' src='" + radioUri + "' type='audio/mpeg'/>";
                player.dataset.station = event.toElement.innerText;
                // Reload and play
                player.load();
                playPlayer();
                // Set to select current radio
                selectRadio(event.toElement);
                ga('send', 'event', 'listenRadio', '', newStation);
            }
        });
    }

    function setControlsListeners() {
        var playPauseButton = document.getElementById('player-play-pause');
        playPauseButton.addEventListener('click', function () {
            var player = document.getElementById('audioPlayer');
            if (player.paused) {
                playPlayer();
            }
            else {
                pausePlayer();
            }
        });
    }

    function selectRadio(elem) {
        deselectRadios();
        elem.dataset.selected = "true";
    }

    function deselectRadios() {
        var listenButtons = document.getElementsByClassName("listenRadio");
        for (i = 0; i < listenButtons.length; i++) {
            listenButtons[i].dataset.selected = "false";
        }
    }

    function pausePlayer() {
        var player = document.getElementById('audioPlayer');
        if (player.firstChild.nodeName === 'SOURCE') {
            player.pause();
            // Change control icon
            var playPauseIcon = document.getElementById('player-play-pause').children[0];
            playPauseIcon.src = 'img/play.png';
        }
    }

    function playPlayer() {
        var player = document.getElementById('audioPlayer');
        if (player.firstChild.nodeName === 'SOURCE') {
            player.play();
            // Change control icon
            var playPauseIcon = document.getElementById('player-play-pause').children[0];
            playPauseIcon.src = 'img/pause.png';
        }
    }


    var listenButtons = document.getElementsByClassName("listenRadio");
    var i = 0;
    for (i = 0; i < listenButtons.length; i++) {
        addEventListener(listenButtons[i]);
    }

    setControlsListeners();

    function setClipboardButtonHandler(){
        var clipboardButton =  document.querySelector('#clipboardLink');
        new Clipboard(clipboardButton, {
            text: function() {
                return document.querySelector('#songtitle').innerText;
            }
        });
    }

    setClipboardButtonHandler();

    /**
     * Station metadata related functionality
     */
    function updateSongMetadata() {
        var stationName = document.getElementById('audioPlayer').dataset.station;
        if (typeof stationName === 'string') {
            $.getJSON('metadata.php?name=' + stationName, function (result) {
                if (typeof result.metadata.title === 'string') {
                    var songTitleWrapper = document.getElementById('songtitle');
                    if (result.metadata.title !== songTitleWrapper.innerText) {
                        var songChangedEvent = new CustomEvent('songChanged', {detail: result});
                        songTitleWrapper.dispatchEvent(songChangedEvent);
                    }
                    // Set song title
                    document.getElementById('songtitle').innerText = result.metadata.title;
                    // Update youtube link
                    document.getElementById('youtubeLink').href =
                        'https://www.youtube.com/results?search_query=' + encodeURIComponent(result.metadata.title);
                    ga('send', 'event', 'updatedMetadata', '', stationName);
                }
                else {
                    document.getElementById('songtitle').innerText = "";
                    document.getElementById('youtubeLink').removeAttribute('href');
                    document.title = 'Listening to '+result.station.name+' - EDM Radio Station Listener';
                }
            });
        }
    }

    setInterval(updateSongMetadata, 3000);

    function songChangedTitleHandler(event) {
        document.title = event.detail.metadata.title + ' on '+event.detail.station.name;
    }

    /**
     * History handlers
     */

    function songChangedHistoryHandler(event) {
        var historyPanel = document.getElementById('historyPanel');
        // Create history song
        var content = document.importNode(document.querySelector('#historySongTemplate').content, true);
        var historySong = content.children[0];

        var d = new Date();
        var timeStampString = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2);

        var songTitle = event.detail.metadata.title;

        historySong.dataset.timestamp = d.getTime();
        historySong.dataset.title = songTitle;
        historySong.dataset.title = event.detail.station.name;

        historySong.querySelector('.historySongTitle').innerText = event.detail.metadata.title;
        historySong.querySelector('.historySongStation').innerText = event.detail.station.name;
        historySong.querySelector('.historySongTimestamp').innerText = timeStampString;
        historySong.querySelector('.historySongYoutubeWrapper').querySelector('a').href =
            'https://www.youtube.com/results?search_query=' + encodeURIComponent(songTitle);

        // Add event listener for copy clipboard
        var copyClipboardButton = historySong.querySelector('.historySongCopyClipboard');
        new Clipboard(copyClipboardButton, {
            text: function() {
                return songTitle;
            }
        });

        historyPanel.prepend(historySong);
    }

    function setSongChangeEvents() {
        var songTitleWrapper = document.getElementById('songtitle');
        songTitleWrapper.addEventListener('songChanged', function (event) {
            if(!document.getElementById('audioPlayer').paused){
                songChangedHistoryHandler(event);
                songChangedTitleHandler(event);
            }
        });
    }

    setSongChangeEvents();


    /**
     * Cookies
     */

    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#101010"
                },
                "button": {
                    "background": "transparent",
                    "text": "#999999",
                    "border": "#999999"
                }
            },
            "content": {
                "href": "https://haritzmedina.com/#cookies"
            }
        })
    });

    /**
     * Analytics custom events
     */

    document.querySelector('#youtubeLink').addEventListener('click', function (event){
        ga('send', 'event', 'youtubeLink');
    });

    document.querySelector('#historyPanel').addEventListener('click', function (event){
        ga('send', 'event', 'historyPanel');
    });

})();