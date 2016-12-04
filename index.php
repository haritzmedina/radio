<html>
<head>
    <title>EDM Radio Station listener</title>
    <script type="text/javascript" src="js/lib/jquery-2.1.3.min.js"></script>
    <link rel="stylesheet" href="css/default.css" type="text/css"/>
    <link rel="icon"
          type="image/png"
          href="./favicon.png">
</head>
<body>
<audio id='audioPlayer'>

</audio>
<header>
    Choose your radio station and just listen
</header>
<div id="radios"><?php
    $stations = json_decode(file_get_contents('./stations.json'));
    foreach($stations as $station){
        echo'<div class="listenRadio"
            data-radio-info="'.$station->metadata.'"
            data-radio-uri="'.$station->media.'"
            data-radio-type="'.$station->type.'"">'.$station->name.'</div>';
    }
    ?>
</div>
<div id="player">
    <div id="player-play-pause" class="controller"><img src="img/play.png"/></div>
    <div id="youtubeLinkWrapper" class="controller"><a id="youtubeLink" target="_blank"><img src="img/youtube.png"/></a></div>
    <div id="metadata" class="controller"><div id="songtitle"></div></div>
</div>
<script src="js/default.js" type="text/javascript"></script>
</body>
</html>