@php
	use Mtownsend\ReadTime\ReadTime;
	use Carbon\Carbon;

	$readingTime = (new ReadTime($page->getContent()))->get();
	$publishedAt = Carbon::parse($page->published_at)->format("Y-m-d");
@endphp

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>{{ $page->title }}</title>
	<meta name="description" content="{{ $page->excerpt }}">
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="stylesheet" href="{{ $page->baseUrl }}{{ mix('css/post.css', 'assets/build') }}" media="none" onload="this.media = 'all';">
</head>
<body class="max-w-screen-md mx-auto px-6 pb-4">
	<header>
		@include("_partials.header", ["brand" => "Khalyomede"])
	</header>
	<main>
		<h1 class="text-3xl mb-4">{{ $page->title }}</h1>
		<div class="text-sm mb-4 text-gray-600">
			{{ $publishedAt }} • {{ $readingTime }}
		</div>
		<article>
			@yield("content")
		</article>
	</main>
	<footer class="text-right">
		<a href="https://github.com/khalyomede/blog/edit/master/source/_post/{{ $page->getFilename() }}.md" class="text-blue-700 hover:underline">Edit this page</a>
	</footer>
	<script type="text/javascript" src="{{ $page->baseUrl }}{{ mix("js/post.js", "assets/build") }}"></script>
</body>
</html>
