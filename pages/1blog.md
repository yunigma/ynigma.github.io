---
layout: page
title: Data preparation
description: This page is reserved for my 1st BLOG.
---

:shipit:

#### 1. Open the data
Reading the data from a file:
```
readr:
read_csv()
read_csv2() -- reads semicolon separated files.
read_tsv()
read_delim()

read_fwf() -- reads fixed width files. You can specify fields either by their widths with fwf_widths() or their position with fwf_positions().
read_table() -- reads a common variation of fixed width files where columns are separated by white space.
read_log() -- reads Apache style log files.
```

Change the IV columns to a factor type:
```
data <-
  read_csv("data/knobology_synthetic.csv", col_types = "cccd") %>%
  mutate(
    device = as.factor(device),
    vision = as.factor(vision))
```
#### 2. Parsing a vector

Using parsers is mostly a matter of understanding what’s available and how they deal with different types of input.

```
str(parse_logical(c("TRUE", "FALSE", "NA")))
str(parse_integer(c("1", "2", "3")))
parse_integer(c("1", "231", ".", "456"), na = ".")
str(parse_date(c("2010-01-01", "1979-10-14")))
parse_double("1,23", locale = locale(decimal_mark = ","))
parse_number("$100") -- ignores non-numeric characters before and after the number.
parse_number("123'456'789", locale = locale(grouping_mark = "'"))

parse_factor()
parse_character()

charToRaw("Hadley") -- encoding ASCII.
parse_character(x1, locale = locale(encoding = "Latin1")) -- to specify the encoding.
guess_encoding(charToRaw(x1)) -- detect the used encoding.

parse_date("1 janvier 2015", "%d %B %Y", locale = locale("fr")) -- French
```
#### 3. Other type of data
- **haven** reads SPSS, Stata, and SAS files.

- **readxl** reads excel files (both .xls and .xlsx).

- **DBI**, along with a database specific backend (e.g. **RMySQL**, **RSQLite**, **RPostgreSQL** etc) allows you to run SQL queries against a database and return a data frame.

- For hierarchical data: use **jsonlite** (by Jeroen Ooms) for json, and xml2 for XML.



