<template lang="pug">
	Layout
		div.text-center.mb-8
			h1.text-3xl Welcome to my blog
			p This is where I save my thoughts about programming. Make yourself comfortable.
		p.home-links
			g-link(v-for="post in $page.allPost.edges" :key="post.node.id" :to="post.node.path") 
				div
					.text-xl.font-bold {{ post.node.title }}
					span.text-gray-500 {{ post.node.published_at | ago }} • {{ post.node.content | reading }}
						.text-gray-5
					.text {{ post.node.excerpt }}
</template>
<script>
import { ago } from "time-ago";
import readingTime from "reading-time";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  filters: {
	  ago(value) {
		  return ago(value);
	  },
	  reading(value) {
		  const { text } = readingTime(value ?? "");

		  return text;
	  }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

<page-query>
query posts {
  allPost(sortBy: "published_at", filter: {published: {eq: true}}) {
    edges {
      node {
		id,
        path,
        title,
		excerpt,
		published_at,
		content
      }
    }
  }
}
</page-query>