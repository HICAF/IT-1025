<?php

$oXml = simplexml_load_file('logo.xml');
echo $oXml->name['id']; 

?>