<?php
    
function expensiveStuff($name, $someOtherParam, $forceNew = false)
{
    // This static $cache is scoped to the function and will be created only
    // once despite called multiple times
    static $cache = null;
    if (is_null($cache)) $cache = array();

    // Generate a unique ID here, this is just an example
    $id = "{$name}-{$someOtherParam}";

    // Return the cached result if it exists _and_ it should not be recalculated
    if (!$forceNew && array_key_exists($id, $cache)) return $cache[$id];

    $result = '... expensive code here ...';

    // Save the result in the cache and return it
    return $cache[$id] = $result;
}
