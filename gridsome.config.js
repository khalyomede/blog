// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Khalyomede",
  siteUrl: 'https://khalyomede.github.io',
  pathPrefix: '/blog',
  outputDir: "docs",
  port: 3000,
  
  plugins: [
	  "gridsome-plugin-tailwindcss",
	  "gridsome-plugin-pug",
	//   "gridsome-plugin-robots-txt",
	  "gridsome-plugin-webpack-size",
	  {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Post",
        baseDir: "./posts",
        pathPrefix: "/post",
		template: "./src/templates/Post.vue",
		plugins: [["@noxify/gridsome-remark-classes", {
			"heading[depth=2]": "mb-4 mt-2 text-2xl",
			":not(blockquote) > paragraph": "mb-2",
			"blockquote > paragraph": "block text-right text-gray-500 text-lg my-4",
			"list" : "list-disc list-inside mb-2",
			"link": "text-blue-600 hover:underline"
		}], "@gridsome/remark-prismjs"]
      }
    }
  ],
}
