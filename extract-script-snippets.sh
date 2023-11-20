#!/bin/bash
# using https://github.com/earldouglas/codedown to extract php code from recipes
for f in $PWD/src/recipes/*.md
do
    [ -e "$f" ] || continue
    filename=$(basename -s .md "$f")
    dest="$PWD/codesnippets/$filename.php"
    echo processing "$dest"
    echo "<?php
    " > "$dest"
    cat "$f" | codedown php >> "$dest"
done
