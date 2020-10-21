<?php

return [
    'production' => true,
    'baseUrl' => '/blog',
    'title' => 'Khalyomede',
    'description' => 'My personal blog.',
    'collections' => ["post"],
    'build' => [
        'source' => 'source',
        'destination' => 'docs',
    ],
];
