<?php

$news = $pages->find('template=news');

foreach($news as $teaser): ?>

    <article>
        <!-- The title -->
        <h3><a href="<?= $teaser->url ?>"><?= $teaser->title ?></a></h3>

        <!-- The excerpt or summary -->
        <p><?= $teaser->summary ?></p>

        <!-- The link, extended -->
        <a href="<?= $teaser->url ?>">Read more <span class="visually-hidden"> about <?= $teaser->title ?></a>
    </article>

<?php endforeach; ?>
