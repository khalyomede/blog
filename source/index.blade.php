@extends("_layouts.base")

@php
	use Mtownsend\ReadTime\ReadTime;
	use Carbon\Carbon;

	$post = $post->filter(function($article) {
		return $article->published;
	})->sortByDesc("published_at");
@endphp

@section("content")
	<div class="mb-8">
		<h1 class="text-3xl mb-2 text-center">
			<div>
				Welcome to my blog
			</div>
		</h1>
		<div class="text-lg text-center">This is where I save my thoughts about programming. Make yourself comfortable.</div>
	</div>

	@if($post->count() > 0)
		<ul>
			@foreach ($post as $article)
				<li class="mb-4">
					<a href="{{ $article->getUrl() }}">
						<div class="text-2xl">
							{{ $article->title }}
						</div>
						<div class="text-gray-600 text-sm">
							{{ Carbon::parse($article->published_at)->fromNow() }} • {{ (new ReadTime($article->getContent()))->get() }}
						</div>
						<div>{{ $article->excerpt }}</div>
					</a>
				</li>
			@endforeach
		</ul>
	@else
		<p>
			No article found.
		</p>
	@endif
@endsection
