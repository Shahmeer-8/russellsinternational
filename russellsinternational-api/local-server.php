<?php

$publicPath = __DIR__.DIRECTORY_SEPARATOR.'public';

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '');
$file = $publicPath.str_replace('/', DIRECTORY_SEPARATOR, $uri);

if ($uri !== '/' && is_file($file)) {
    return false;
}

require_once $publicPath.DIRECTORY_SEPARATOR.'index.php';
