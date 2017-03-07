<?php
/**
 * Created by PhpStorm.
 * User: semyonchick
 * Date: 07.03.2017
 * Time: 23:54
 */

header('Access-Control-Allow-Origin: *');
header_remove("X-Frame-Options");

$data = file_get_contents('https://' . $_GET['server_domain'] . '/oauth/token/?grant_type=authorization_code&client_id=local.58760b75b13ab4.18962256&client_secret=lXyZoUw1iG3D33w7vunRFiIOvq75CwXTzZ7oXOTPy35JS7PgWU&code=' . $_GET['code']);
echo '<h1>'.json_decode($data)->access_token.'</h1>';
