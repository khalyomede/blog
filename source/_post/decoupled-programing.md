---
extends: _layouts.post
section: content
title: Decoupled programing
excerpt: A paradigm that augment flexibility and performance.
published_at: "2020-10-20 20:49:00"
published: true
---

Frameworks are legion today. At such point that if you don't learn some, you might get evinced from the game.

I am guilty of knowing [Laravel](https://laravel.com/), [Vue](https://laravel.com/) and [Bootstrap](https://getbootstrap.com/). These are still my go to tools at my job.

One day I watched [this video](https://www.youtube.com/watch?v=nmD1Q4FsXCc) about Rasmus speaking of his vision for PHP, a brief of the history of the language, and some of his thoughts.

I remember of one particular sentence in his talk:

> Today, frameworks ship too much. We should not have the database engine booted up for a static page. We should control what we want at a certain moment.

I tried to find a way to work with decoupled components. At first it was an experiment, and then, I found I could go on with a functional router, then a view engine (Blade), then an ORM (Eloquent), etc...

## The idea

The concept is to create packages that are not aware of the outside world. This has several advantages:

- You can pull the package anywhere, since you follow the setup code
- The complexity is reduced because I consider dependency injection userland
- The footprint is **way** much lower because I used functional programing first to delivery the easiest developer experience

The core concept of these ready-to-pull packages is to solve one core issue the fastest possible.

For example, if you use [folded/translation](https://github.com/folded/translation), you only have to tell the library where your translations are stored:

```php
use function Folded\setTranslationFolderPath;
use function Folded\setDefaultTranslationLang;

setTranslationFolderPath("path/to/langs");
setDefaultTranslationLang("en");
```

That's all. Now you can use the library anywhere:

```php
use function Folded\setTranslationLang;
use function Folded\getTranslation;

setTranslationLang("fr");
getTranslation("Welcome to my blog"); // "Bienvenue sur mon blog"
```

If you noticed, I have to use the namespace "Folded". This is what makes the app light, because the code will only require these functions instead of loading a whole class for example.

## Results on a real app

I have built an app (that I currently do not know if I will release or no), which is about teaching about nature and science by displaying a feed of news and facts.

Using only decoupled packages (and aproximatively 80% of mine), I managed to use a maximum of 0.7 Mb of memory (and a serber latency of about 7-20 ms on an AWS free tier t2.micro server running Ubuntu 20).

For comparison, Laravel (no negatives critics intended) loads the hello world page with a memory peak usage of about 12 Mb. It's something that I expected since you got a whole lot of features, including Pipes, Validation, Eloquent and events, Queing, ... out of the box, and activated.

If I ever wanted to try to trim the maximum out of Laravel to keep on this example, I would have to dig in the provider file, and comment the services I don't use.

While this does the job, whenever you deactivate a service that you then want to use, you got to remember you commented it so you need to constantly keep track of this anytime you decide to use a new facade or so.

This is something you would never have to think of with decoupled programing since you are conscious of what you pull because you actually had to use `composer install` yourself. This offers the benefit of being more "aware" of what you got on your code base, and forces you to document yourself on what you use.

Without speaking on the fact that you are free to use whatever package you need, which is something you would not totally be able to do with frameworks that have made some choices (like using Blade for Laravel, that would make no sense to use anything else).

## The downsides

The main downside is the time you need to spend to document yourself to implement a new library to your web app. This is something that most of the time have been solved if you use a framewokr (queue management, ORM, logging, ...).

The other downside is the organisational part. Using a framework is a huge insurance for big companies since the framework is opniated on the way to organise views, models, commands, ... This downside can be a showstopper if you fear or do not have the right knowledge to organize correctly (which means the maintenance is tough).

But I have seen framework with bad code habits and wrong code organisation too, so this is something to debate. One can imagine setting a de-facto code structure and iterating on this even using decoupled programing (the proof is the people that use a `app/Model` folder, when Laravel natively put them in `app` folder, something that will change in version 8).

## Conclusions

A really fun experiment, that I think I will keep maturing and eventually propose for review to see if people show interest over this concept.

I feel in my opinion it is something quite related to functional programing, and this need to come back to the root of the algorithm itself, coming back to more simplicity.

So in the end, I think that it is another tool for a specific set of problems to solve. Not some fancy new way to develop web apps.
