<?php
    
$limit = 12; // the "limit"-setting used on this page
$children = $page->children("limit=" . $limit);
$totalpages = ceil($children->getTotal() / $limit);

if ($input->pageNum) {
    if ($input->pageNum < $totalpages) {
        echo "<a rel='next' href='" . $page->url . $config->pageNumUrlPrefix . ($input->pageNum + 1) . "' />";
    }
    if ($input->pageNum > 1) {
        echo "<a rel='prev' href='" . $page->url . $config->pageNumUrlPrefix . ($input->pageNum - 1) . "' />";
    }
}

// Output:
foreach($children as $child): ?>

...

<?php endforeach; ?>

<?php echo $children->renderPager(); ?>
