@echo off
setlocal

set "APP_DIR=%~dp0"
set "PHP_UPLOAD_TMP=%APP_DIR%storage\app\php-upload-tmp"

if not exist "%PHP_UPLOAD_TMP%" mkdir "%PHP_UPLOAD_TMP%"

php ^
  -d upload_tmp_dir="%PHP_UPLOAD_TMP%" ^
  -d sys_temp_dir="%PHP_UPLOAD_TMP%" ^
  -d display_errors=0 ^
  -d log_errors=1 ^
  -d upload_max_filesize=40M ^
  -d post_max_size=40M ^
  -S 127.0.0.1:8000 ^
  -t "%APP_DIR%public" ^
  "%APP_DIR%local-server.php"
