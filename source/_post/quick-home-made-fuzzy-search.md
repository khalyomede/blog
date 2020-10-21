---
extends: _layouts.post
section: content
title: Quick home made fuzzy search
excerpt: No time to implement a fuzzy search library? Me too.
published_at: "2020-10-20 22:24:00"
published: true
---

Lot of occasion presented to me where I have two choice: either take this package, learn, install, implement, check for advanced usage, and ultimately spend some time just for a small fuzzy search dependent component (like a home page search), or just roll my own.

Let's be honest, fuzzy search is one of these algorithm that you are tempted to think:

> That's just an SQL like query!

It is, or at least it can be in its easiest form possible. Let me show you. These examples will feature Laravel because I know this framework well.

## Level 1: basic search

Take the search term, and perform a like in SQL. Simple, working, no complexity. Ideal for simple things.

```php
// app/Http/Controllers/SearchController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Post;
use Illuminate\View\View;

class SearchController extends Controller
{
	public function search(SearchRequest $request): View
	{
		$term = $request->term;
		$posts = Post::where("title", "like", "%$term%")
			->orWhere("excerpt", "like", "%$term%")
			->orWhere("content", "like", "%$term%")
			->get();

		return view("search")->with("posts", $posts);
	}
}
```

## Level 2: VSCode Command Palette search-like

If you are on VSCode on Sublim Text, you might use this trick where you write this:

```
aphtcontsea
```

Which is the concatenation of app-http-controller-search, and VSCode is correctly finding your file `Controllers/SearchController.php`.

This is because the search algorithm is actually splitting each characters, and include a wildcard placeholder to say "between each of the characters of the search, you might found anything, nevermind, match it.

This means you don't even have to write these "/", because the regular expression is expecting them.

Check it by yourself on this [regex101.com](https://regex101.com/r/ydPJcj/1) example.

Here is a suggested implementation:

```php
// app/Http/Controllers/SearchController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Post;
use Illuminate\View\View;

class SearchController extends Controller
{
	public function search(SearchRequest $request): View
	{
		$characters = str_split($request->term);

		$search = array_map(function(string $character): string {
			return "%$character%";
		}, $characters);

		$posts = Post::where("title", "like", $search)
			->orWhere("excerpt", "like", $search)
			->orWhere("content", "like", $search)
			->get();

		return view("search")->with("posts", $posts);
	}
}
```

Which would return the following inside `$search` if you type `blog`:

```
%b%%l%%o%%g%
```

Extra `%` are not a problem, just redundant. With a few little effort, we have made something good enough.

## When using fuzzy search

What we did is closer to primitive search than real fuzzy search.

Fuzzy search works by mutating the search term until it find similarities with an existing word, like trying to removing some characters until finding an existing word.

This have the advantage of finding near match, something that we can't find with the examples above. If you made a typo to `blog`, like `bkog`, it will no longer match, when fuzzy search would. Try changing a letter in the [regexp101.com](https://regex101.com/r/ydPJcj/1) example to see it in action.

Other advantage, fuzzy search provides a result confidence ratio for each results, so you can order search results by this new variable (which we can't do with the examples above).

Implementing fuzzy search involves a lot of time finding the best approach, so this should come as an upgrade of an existing simple search algorithm.

I would not advise to start with fuzzy search because this is also a cost depending how it is implemented (you might have to first convert every of your potental results to fit the library, which is something you would not have to do with pure SQL).
