<template lang="pug">
	Layout
		h1.text-3xl.mb-4 {{ $page.post.title }}
		VueRemarkContent
</template>

<script>
export default {
	
}
</script>

<style lang="sass">
@import "prismjs/themes/prism"
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap')

code[class*="language-"],
pre[class*="language-"],
pre,
code,
kbd,
samp
	font-family: "Fira Code", monospace
</style>

<page-query>
query post ($id: ID!) {
  post(id: $id) {
    title
    excerpt
  }
}
</page-query>