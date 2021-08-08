<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Chata Travná</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Train+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>
    <style>
        .bg-light {
            background-color: white;
        }
    </style>
</head>
<body style="background-color: white;">
<div id="app">
    <h1>Chata travná</h1>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="https://www.irozhlas.cz/sites/default/files/styles/zpravy_otvirak_velky/public/uploader/2019-04-16t192437z_8_190416-230807_vman.JPG?itok=E27_haRM" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="https://s.france24.com/media/display/451ed2b8-eed6-11ea-afdd-005056bf87d6/w:1280/p:16x9/messi-1805.webp" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="https://e3.365dm.com/21/04/2048x1152/football-messi-lionel_5359730.jpg" alt="Third slide">
            </div>
        </div>
    </div>
    <example-component></example-component>
</div>
<script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>
