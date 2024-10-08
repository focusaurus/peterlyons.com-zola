+++
title = "Paginaton for Product Managers"
slug = "2024/07/paginaton-for-product-managers/"
date = 2024-07-27T12:26:06Z
+++

## Hi product managers

This post is written primarily for product managers instead of my usual engineering audience. I want to explain why engineers may be reluctant to build traditional numbers-based pagination. By this I mean a list page featuring page numbers counting up from page 1, often including both the total number of pages and links to jump to particular pages. `1 2 3 4 5 6 7 8 9 … 537`.

## What exactly do we mean by classic numbered pages?

- The page shows some fixed small-to-medium number of items
- There's page numbers starting with 1 and integers ascending from there
- You can jump to pages by number with a click
  - You can click directly on the 5 to go to page 5
- There might be some indication of the total number of pages
- There might be a way to jump directly to the last page
  - Labeled either with its number of just the word "last"
- The URL is mostly likely shareable/bookmarkable although not necessarily

## Functional reasons engineers don't like this

**It's a poor fit for changing data**. Many data sets are now closer to a social media feed with a firehose of records being created at all times so the concept of the "page 3" is kind of stale as soon as the user sees it. If records are being bulk deleted or re-ordered, we can't easily page through them in a coherent way from both a technical and logical perspective.

**Sharing links doesn't work**. Bookmarking or sharing URLs can't easily made to show the same data. If the user intent is "ooh look at these cool widgets I found on page 4" and wants to have that be the same when sharing the link, the notion of "page 4" isn't right and creating a token-based permalink would require a fair bit of machinery.

**It's an inferior approach to discovery**. Relying heavily on paging linearly through a long list of data often means there's opportunity for better search and browse features and workflows. Maybe higher-quality free text search would work better. (Aside, is any one else stupefied by how utterly bad we are at free text search, like for anything anywhere?). Maybe category-based browsing would help. Maybe curated lists would help. If users are clicking page 8, guaging some piece of data there like the price of an items, then estimating their item might be around page 20, we could probably build a better tool to facilitate their search tactic.

**It's lazy and sad**. I get "contractors built a paginated list page with zero care or thought, emailed us a huge invoice, and bounced" vibes. Don't let agencies that don't care about user experience and quality software do work for you!

## Technical reasons engineers don't like this

**It can be catastrophically slow in most databases**. I think most of the engineering resistance originates here. Most databases cannot perform these queries efficiently. Or at least, the naive implementation cannot - see below for more technical notes. Having to know the total number of results (and therefore pages) means the database usually has to scan every single record. If there are filters in place, and there ususally are, then the database may not be able to use an index for the query and it will have to slowly scan every row and test whether it matches the filters or not. Even if the end user has not specified any filters, there might be system-level filters for things like "is not deleted" or "user has permission to see this" or "is not a draft" etc. Especially as page numbers get higher, even if computing the total number of records/pages has been taken out of scope, the DB will still have to scan every row prior to the current page and the performance nosedives. This can reduce performance across the application as the DB has fewer resources available to serve other queries. Sometimes there are clever ways to implement the queries to avoid the performance problem, but they are definitely not techniques found on the first few pages of google results. They also may not manifest until record counts hit 25K or 100K and the odds of a developer working on a net new app testing that are near zilch.

## What do we end up implementing?

We usually end up on a "load more" button, possibly the infinite scroll manifestation.

## Other technical solutions

I think there are ways to implement this with good performance by avoiding SQL `OFFSET` in favor of carefully-designed `WHERE` clause using an index, but this post is not about the technical aspect. A web search will show several varieties of alternatives that might be what you need.
