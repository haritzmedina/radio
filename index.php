<html>
<head>
    <title>EDM Radio Station listener</title>
    <script type="text/javascript" src="js/lib/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery.mobile-1.4.5.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
    <link rel="stylesheet" href="css/default.css" type="text/css"/>
    <link rel="icon"
          type="image/png"
          href="./favicon.png">
</head>
<body>
<template id="historySongTemplate">
    <div class="historySong" data-timestamp="" data-title="" data-station="">
        <div class="historySongTitle"></div>
        <div class="historySongTimestamp"></div>
        <div class="historySongStation"></div>
        <div class="historySongYoutubeWrapper">
            <a target="_blank"><img src="./img/youtube.png"</a>
        </div>
    </div>
</template>


<div data-role="page" data-theme="b" >
    <div data-role="panel" id="historyPanel" data-position="right" data-display="overlay">
        <!-- panel content goes here -->
    </div><!-- /panel -->


    <audio id='audioPlayer'>

    </audio>
    <header>
        Choose your radio station and just listen
    </header>
    <div id="radios" data-role="main" class="ui-content"><?php
        $stations = json_decode(file_get_contents('./stations.json'));
        foreach($stations as $station){
            echo'<div class="listenRadio"
            data-radio-info="'.$station->metadata.'"
            data-radio-uri="'.$station->media.'"
            data-radio-type="'.$station->type.'"">'.$station->name.'</div>';
        }
        ?>
    </div>
    <div id="player" data-role="footer" data-position="fixed">
        <div id="player-play-pause" class="controller">
            <img src="img/play.png" data-background="darkGray"/>
        </div>
        <div id="youtubeLinkWrapper" class="controller">
            <a id="youtubeLink" target="_blank"><img src="img/youtube.png" data-background="darkGray"/></a>
        </div>
        <div id="historyButtonWrapper" class="controller">
            <a href="#historyPanel"><img src="img/history.png" data-background="darkGray"/></a>
        </div>

        <!--<div data-role="panel" id="mypanel">

        </div><!-- /panel -->
        <div id="metadata" class="controller"><div id="songtitle"></div></div>
    </div>
    <script src="js/default.js" type="text/javascript"></script>
</div>
</body>
</html>