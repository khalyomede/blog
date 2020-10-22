---
extends: _layouts.post
section: content
title: You should probably store business logics outside your models
excerpt: Learn how Single Responsibilty Principle is so much important in a heavy business logic code base.
published_at: "2020-10-22 22:21:00"
published: true
---

If you were used to store some bits of logic in your controller, be sure that is obviously the natural way to think of the code at first.

However, you might have run into issues where one controller was doing some business logic that you partially need in another controller. So the first general rule to follow in order to keep a maintainable code base is to banish adding business logics inside your controllers.

## Models: the ideal candidate to store business logic

If it is not advised to store heavy logics inside controllers, then the most fitted candidate is your model. Indeed, the model is perfectly suited for this since this is an ideal single source of truth as it is close to the stored data.

Models plays a good role, so let's imagine we have articles. Articles have a price, and a related VAT rate. For convenience, we store VAT rates in a dedicated table to be able to managed multiple VAT rate for differents scenarios.

```php
<?php
// app/Article.php
namespace App;

use App\Vat;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
  public function vat(): Relationship
  {
    return $this->belongsTo(Vat::class);
  }

  public function priceWithTax(): float
  {
    return $this->price * (1 + $this->vat->rate);
  }
}

$article = Article::find(42);

echo $article->price; // 10
echo $article->vat->rate; // 0.2
echo $article->priceWithTax(); // 12 (10 * 1.2)
```

It works, it is centralised, it does the job, it is testable. So what is wrong with this approach?

## We mix things

Speaking of testing things. Let's check which code is required to test this.

```php
// tests/Feature/Model/ArticleTest.php
namespace Tests\Feature\Model;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTest extends TestCase
{
	use RefreshDatabase;

    public function testGetPriceWithTaxReturnsTheCorrectPrice(): void
    {
		$article = factory(Article::class)->state("with_vat")->make();

		$this->assertEquals($article->price * (1 + $article->vat->rate), $article->priceWithTax());
    }
}
```

The test if fine, it has the correct statement, nothing wrong at first sights.

If you do not see what is wrong with this test, it is absolutely normal. You have been conditioned to write this kind of code, and it naturally make sense to mix the database and the business logic.

## A matter of Single Responsibility Principle

What drives me crazy with this kind of code, is that it is trying to do everything at once.

- Why should we have to create a database record to test that our algorithm that compute prices is correct in the first place?
- If my Article field is renamed to `amount`, why this business logic has to fail?

When you ask these question, everything seems clear: we are mixing apples and bananas. The database layer should not interfer with the business logic layer. This is why today Domain Driven Development is getting such a huge success among big companies that need to save their assets and evolve their code base the easiest possible.

## Put the business logics aside from the rest

Without going too much into what DDD is, or even trying to replicate its principle, I think we need a new easy to implement paradigm to resolve this mixing issue.

To do that, let's introduce an `Entity` namespace, where we will modelize in pure OOP our business logic. Keeping our article and price example, this is what the code would look like after refactoring:

```php
// App/Entity/Article.php
namespace App\Entity;

final class Article
{
	private float $price;
	private float $vatRate;

	public function __construct(float $price, float $vatRate)
	{
		// Make sure to validate the data by throwing exceptions if the values are not correct, like a negative price...

		$this->price = $price;
		$this->vatRate = $vatRate;
	}

	public function getPriceWithTax(): float
	{
		return $this->price * (1 + $vatRate);
	}
}
```

And our model becomes something like this:

```php
namespace App;

use App\Vat;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
  public function vat(): Relationship
  {
    return $this->belongsTo(Vat::class);
  }

  public function priceWithTax(): float
  {
    return (new App\Entity\Article($this->price, $this->vat->rate))->getPriceWithTax();
  }
}

$article = Article::find(42);

echo $article->price; // 10
echo $article->vat->rate; // 0.2
echo $article->priceWithTax(); // still 12 (10 * 1.2)
```

This adds some extra complexity in the sense that now the business logic is located in another file, but it brings so much simplicity when testing. You do not have to use the `RefreshDatabaseTrait`, which was re migrating every of our tables creation. You also can play with different scenario easily, without having to creating complex factories.

Here is the refactored test:

```php
// tests/Feature/Model/ArticleTest.php
namespace Tests\Feature\Model;

use App\Entity\Article;
use Tests\TestCase;

class ArticleTest extends TestCase
{
    public function testGetPriceWithTaxReturnsTheCorrectPrice(): void
    {
		$this->assertEquals(12, (new Article(10, 0.2))->priceWithTax());
    }
}
```

As you can see, we have been able to trim some line of codes. We have also now a more straight to the point test, which do not shadows what we are trying to test withing factories that have set up default values in our models. All that complexity simply goes away because it has not its place when testing business logic.

If you want a true maintainable code base, this is where you should strive to achieve. Separating concerns like this helps to make the code base more robust, such as if we make a table update, only the table related process will be impacted, not the business logic that have been built and well tested.

## In conclusion

Achieving this kind of transition, or even adopting this habit, requires discipline, because you will be naturally tempted to either store business logic on models or controllers. It is our nature self that is asking for simplicity, getting the job done quickly.

I take this challenge as taming our "savage" self. We as human have done a huge job hiding our true nature, by applying discipline to help live in peace together. We don't do our law and let the governement do it for us because this is the framework we all agree on when living in a country.

The code is not much different than that, and to help developers live together, we have to setup rules that helps us specialize well in our own domain while interacting between each others without crossing the line or responsibilities.
