---
extends: _layouts.post
section: content
title: Are we in control?
excerpt: A reflexion toward a predictible and safe future.
published_at: "2020-10-21 20:26:00"
published: true
---

There was a period of my life where I knew I could differentiate cats and dogs using [php-ai/php-ml](https://packagist.org/packages/php-ai/php-ml). Then life gave me a slap on the face and I came back building web apps...

## What is inside?

I am someone that loves simplicity, and when I can, I will happily let me carry by a nice library with a beautiful API. At such point that I could potentially not care about **how** it is made, since the job is done.

There was this funny moment, still trying to figure out the best parameters possible for using [FANN](https://www.php.net/manual/fr/book.fann.php) (Fast Artificial Neural Network).

I would let my computer run its learning for hours only to found out that the prediction were less than 30% correct.

It was at this moment I wanted to understand what was happening. What was the algorithm was doing at which moment, for which reason. It was my ego speaking, trying to figure out why this genius idea to use such parameters would not work as expected. But it was also some kind of lucidity that all of a sudden pushed me to know, how I could figure this out.

## Back on my web apps

I completely refocused on building web apps, and everything went clear.

Set up a route, create a controller, scaffold a view, build your assets. Boom, done. Your page is up. Millions of views (finger crossed... just joking, have some pity for my AWS t2.micro).

Then came the moment when you work with team mates, on an existing project, with constructed business rules, and the code is way more complex than your static blog.

At one point I had this error I could not figure out neither how to reproduce it, nor how it might have occured (or how it have not occured, because we were speaking of a queue job that was supposed to trigger, but the record in database showed that it never did).

At this exact moment, I was having this thought again: how, as humans, can we know exactly what the program does.

## What the program did, when, why?

That is a quite paradoxal question. We are the author of this algorithm. We can read code. Are not we supposed to answer this question? At least, that is what your product management team expected from you since they hired you, isn't it?

Or is it so impossible that we are lossing control over what we write?

At this moment, I tried to find some ways to sort of log _everything_, like every call to functions, every conditions passed, etc...

For example, let's take an example. You are hired by a blog website, and this program is displaying the published blog posts in the home page:

```php
function arrayToObjects(array $array): array
{
  return array_map(function($item) {
    return (object) $item;
  }, $array);
}

$posts = [
  [
    "title" => "Are we in control?",
    "published" => false,
  ],
  [
    "title" => "Decoupled programing",
    "published" => true,
  ],
  [
    "title" => "Quick home made fuzzy search",
    "published" => true,
  ],
];

$posts = arrayToObjects($posts);

foreach ($posts as $post) {
  if ($post->publshed) {
    echo $post->title . PHP_EOL;
  }
}
```

And you have one bug ticket, where one of the user said he did not saw any articles.

Before you got to figure out what is happening, one of your dev mate had to edit the style of the listed blog posts, but he saw one typo. He decides to correct it in order to be able to see the blog posts and edit the CSS:

```diff
-if ($post->publshed) {
+if ($post->published) {
```

So your team mate ticket is published on master (or should I say, main?) branch, everything is fine.

Some months pass, tickets are done, master is updated, ... And here comes this ticket where you need to figure out the error enonced previously: blog posts have not been displayed for this user.

You check on the code, nothing weird. You run the server, blog posts are displayed well. The product owner knows it too, because blogs posts are well displayed on the production server too.

How can you figure out what happened? Will you say "huh, you know, maybe just a little downtime from the server I guess".

And this is honestly something I practiced from time to time, when something was so illogical, I could not believe it did not worked as written in the code.

## Can we do better?

Now, I am asking this open question: do you think we can have a way to know exactly what happened, at anytime, without any extra effort (apart from writing the code)?

This is something I would dream of, taking again the previous code:

```
[2020-10-21 21:09:00.169357] assignement of array(3) {
  [0] => object(stdClass)#2 (2) {
    ["title"]=> string(18) "Are we in control?"
    ["published"]=> bool(false)
  }
  [1] => object(stdClass)#3 (2) {
    ["title"]=> string(20) "Decoupled programing"
    ["published"]=> bool(true)
  }
  [2] => object(stdClass)#4 (2) {
    ["title"]=> string(28) "Quick home made fuzzy search"
    ["published"]=> bool(true)
  }
} to $posts

[2020-10-21 21:09:00.170093] assignment of object(stdClass)#2 (2) {
	["title"]=> string(18) "Are we in control?"
	["published"]=> bool(false)
} to $post in iteration #1

[2020-10-21 21:09:00.171240] condition $post->published did not matched

[2020-10-21 21:09:00.171393] assignment of object(stdClass)#2 (2) {
	["title"]=> string(18) "Are we in control?"
	["published"]=> bool(false)
} to $post in iteration #1

[2020-10-21 21:09:00.171571] condition $post->published matched


[2020-10-21 21:09:00.171547] echoing "Decoupled programing"

...
```

This way, you answer the why, the when and the what at the same time. However, this would greatly impact performance as it would need a kind of extra job and file writing from the language interpreter, which is something I obviously know is enough CPU costing.

This would definitively be of a great help, but also would cost a lot. I think it would be opt-in by default of course, and would at least be useful on development environments.

If any form of this kind of concept would ever see the light, I know I would be the kind of person to enable it anyway, in production and locally.

And I am convinced that this kind of job would help us be better aware of what happens **exactly**, not using our ego and some asumptions. I don't trust my feeling, but I trust in something I can trace, read, store, share.

And I think if my young self would have this kind of tools some years ago while trying to figure out if an image of a tabby cat is a cat and not a dog using machine learning, having this kind of information would have at least let me know exactly how and why I s\*\*k so much in AI programing.
