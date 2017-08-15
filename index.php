<!DOCTYPE html>
<!--suppress JSUnresolvedFunction -->
<html>
<head>
    <title>EDM Radio Station Listener</title>
    <script type="text/javascript" src="js/vendor/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/vendor/jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="js/vendor/clipboard.min.js"></script>
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
        <div class="historySongStation historyInnerElem"></div>
        <div class="historySongTimestamp"></div>
        <div class="historySongYoutubeWrapper historyInnerElem">
            <a target="_blank"><img class="historySongControl" src="./img/youtube.png" alt="youtube icon"/></a>
        </div>
        <div class="historySongCopyClipboard">
            <a target="_blank"><img class="historySongControl" src="./img/clipboard.png" alt="clipboard icon"/></a>
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
            data-radio-type="'.$station->type.'">'.$station->name.'</div>';
        }
        ?>
    </div>
    <div id="player" data-role="footer" data-position="fixed">
        <div id="player-play-pause" class="controller" data-background="darkGray">
            <img src="img/play.png" data-background="darkGray" alt="playImage"/>
        </div>
        <div id="youtubeLinkWrapper" class="controller" data-background="darkGray">
            <a id="youtubeLink" target="_blank"><img src="img/youtube.png" data-background="darkGray" alt="youtube icon"/></a>
        </div>
        <div id="clipboardLinkWrapper" class="controller" data-background="darkGray">
            <a id="clipboardLink"><img src="img/clipboard.png" alt="clipboard icon"/></a>
        </div>
        <div id="metadata"><div id="songtitle"></div></div>
        <div id="historyButtonWrapper" class="controller" data-background="darkGray">
            <a href="#historyPanel"><img src="img/history.png" alt="history icon"/></a>
        </div>
    </div>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-78853312-2', 'auto');
        ga('send', 'pageview');
    </script>

    <!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.2/cookieconsent.min.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.2/cookieconsent.min.js"></script>
    <!-- End Cookie Consent plugin -->

    <script src="js/default.js" type="text/javascript"></script>
</div>
</body>
</html>