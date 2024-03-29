---
title: "Submit your recipe to ProcessWire Recipes"
seodesc: "This is how you can submit a ProcessWire recipe, code snippet, guide, and/or howto guide."
date: 2023-03-08T08:30:56.299Z
preview: "src/assets/images/processwire-snippets.jpg"
---

## Basic Recipe Markup

This guide will help you to submit your very own **ProcessWire Recipe** very soon. For the moment please use this basic markup for new recipes.

```md
---
title: "Recipe title"
version: (if available)
authors:
  - "your forum name" || or other
  - co-author
tags:
  - tags
  - matching
  - your
  - recipe
processwire: 3.0.210 (min) || 3.0.168 (tested)
dependencies:
  - AwesomeModule
  - TextformatterAwesome
  - PHP 8.0
  - Service API Key
---

## Problem:

...

## Solution 1 (old approach):

...

## Solution 2 (since PW 3.0.210):

...

## Resources:

...
```

## Clone the repo

You can find the **official repository on Github**:
https://github.com/processwire-recipes/Recipes/tree/master/src/recipes

Follow the instructions provided by Github and clone the **Recipe** Repository to commit changes and make pull requests.

### Submit Pull Request

Describe the recipe or your changes or anything that important to know. Pull requests with commit messages like `Updated recipe` and other less meaningful commit messages will be ignored.

**Don't forget**

- Add yourself to the authors list
- Change the version number or add one
