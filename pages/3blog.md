---
layout: page
title: R basics
description: This page is reserved for my 3d BLOG.
---

### 1. Factors
```
fct_reorder()

by_age <- gss_cat %>%
  filter(!is.na(age)) %>%
  count(age, marital) %>%
  group_by(age) %>%
  mutate(prop = n / sum(n))

fct_infreq() -- to order levels in increasing frequency.

fct_lump(relig, n = 10) --  to progressively lump together n of the smallest groups, ensuring that the aggregate is still the smallest group.
```
### 2. Pipes
`
library(magrittr)
`
Instead of
```
bop(
  scoop(
    hop(foo_foo, through = forest),
    up = field_mice
  ),
  on = head
)
```
use:
```
foo_foo %>%
  hop(through = forest) %>%
  scoop(up = field_mice) %>%
  bop(on = head)
```
The pipe won’t work for two classes of functions:

- functions that use the current environment (e.g. assign(), get() and load()).
- functions that use lazy evaluation (tryCatch(stop("!"), error = function(e) "An error")).

 %T>% works like %>% except that it returns the left-hand side instead of the right-hand side.

### 3. Data visualisation <https://r4ds.had.co.nz/data-visualisation.html>
```
ggplot(data = <DATA>) +
  <GEOM_FUNCTION>(
     mapping = aes(<MAPPINGS>),
     stat = <STAT>,
     position = <POSITION>
  ) +
  <COORDINATE_FUNCTION> +
  <FACET_FUNCTION>
```

### 4. Cheat sheet "BASICS"
![Picture](images/r-cheat-sheet-basics1.jpg)
![Picture](images/r-cheat-sheet-basics2.jpg)
