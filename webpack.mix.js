const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss')
const discardComments = require("postcss-discard-comments")
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');

mix.jigsaw()
    .js('source/_assets/js/main.js', 'js')
    .js('source/_assets/js/post.js', 'js')
    .sass('source/_assets/sass/main.scss', 'css')
    .sass('source/_assets/sass/page.scss', 'css')
    .sass('source/_assets/sass/post.scss', 'css')
    .options({
		processCssUrls: false,
		postCss: [
			tailwindcss('./tailwind.config.js'),
			discardComments({
				removeAll: true
			}),
		],
    })
    .version();
