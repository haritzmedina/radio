<?php

$stations = json_decode(file_get_contents('./stations.json'));

$requestedStationName = htmlspecialchars($_GET["name"]);
//$requestedStationName = htmlspecialchars('NERadio.fm');

$requestedStation = new stdClass();

foreach($stations as $station){
    if($station->name==$requestedStationName){
        $requestedStation = $station;
    }
}

$response = new stdClass();
$response->station = $requestedStation;

if($requestedStation->type==='shoutcast'){
    // create curl resource
    $ch = curl_init();

    $header = array();
    $header[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
    $header[] = 'Cache-Control: max-age=0';
    $header[] = 'Connection: keep-alive';
    $header[] = 'Keep-Alive: 300';
    $header[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
    $header[] = 'Accept-Language: en-us,en;q=0.5';
    $header[] = 'Pragma: ';

    // set url
    curl_setopt($ch, CURLOPT_URL, $requestedStation->metadata);

    // set user agent
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11 (.NET CLR 3.5.30729)');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);

    // $output contains the output string
    $resultPageString = curl_exec($ch);

    function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }
    $bodyContent = get_string_between($resultPageString, '<body>', '</body>');

    $pos = strrpos($bodyContent, ',');
    $id = $pos === false ? $bodyContent : substr($bodyContent, $pos + 1);


    $response->metadata = new stdClass();
    $response->metadata->title = $id;

    // close curl resource to free up system resources
    curl_close($ch);
}

// Response the user
echo(json_encode($response));

?>