<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="referrer" content="always">
        <meta name="description" content="{{ $page->description }}">
		<title>{{ $page->title }}</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="{{ $page->baseUrl }}{{ mix('css/page.css', 'assets/build') }}" media="none" onload="this.media = 'all';">
    </head>
    <body class="max-w-screen-md mx-auto px-6 pb-4">
		@include("_partials.header", [
			"brand" => "Khalyomede",
		])
		<main>
			@yield('content')
		</main>
    </body>
</html>
