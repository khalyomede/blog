<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>{{ $page->title }}</title>
	<meta name="description" content="{{ $page->excerpt }}">
	<link rel="stylesheet" href="{{ mix('css/post.css', 'assets/build') }}" media="none" onload="this.media = 'all';">
</head>
<body class="max-w-screen-md mx-auto px-6 pb-4">
	<header>
		@include("_partials.header", ["brand" => "Khalyomede"])
	</header>
	<main>
		<h1 class="text-3xl mb-4">{{ $page->title }}</h1>
		<article>
			@yield("content")
		</article>
	</main>
	<script type="text/javascript" src="{{ mix("js/post.js", "assets/build") }}"></script>
</body>
</html>
