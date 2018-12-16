+++
title = "A Tale of Two Nows"
slug = "2016/10/a-tale-of-two-nows"
date = 2016-10-14T20:55:35.804Z
+++
I recently endeavored to use an analytics database called [pipelindb](https://www.pipelinedb.com/) to build a leaderboard type feature for a client. Pipelinedb is a fork-and-enhance project built on postgresql and most the of magic is presented to the developer in the form of a `CONTINUOUS VIEW` construct, which is similar to a regular relational table/view but has the ability to efficiently do sliding window queries on big-data data sets.

The sliding window query I needed was along the lines of "show me the players on team X with the highest score in the last day". I'm changing the subject matter here to make it generic, but my requirements were basically that. I had to keep track of daily, weekly, and all-time player scores and be able to find the top N players in combination with some `WHERE` clauses like `WHERE team_id = 42`.

This was my first exposure to pipelinedb and working with my team and the docs, I was able to build the feature based on the following structures in pipelinedb:

- a stream where rows are inserted as players score

```sql
INSERT INTO score_stream
  (player_id, team_id, timestamp)
  VALUES
  (23, 47, '2016-10-13 20:08:17.505233+00');
```

- a continuous view built upon that stream:

```sql
CREATE CONTINUOUS VIEW score_by_team_1d AS
  SELECT player.player_id, team.team_id, count(*) AS score
  FROM score_stream ss
  JOIN players ON ss.player_id::integer = players.player_id
  JOIN players_teams pt ON players.player_id = pt.player_id
  WHERE ss.timestamp > current_timestamp - interval '1 day'
  GROUP BY pt.term_id, pt.player_id;
```

We got it built and deployed and all seemed to be well. But after a while, we started to have some doubts about the resulting data we were getting. The daily high score players weren't changing as much as we would have intuitively expected.

I dug into this a bit using some ad-hoc tooling, dumping results into spreadsheets, and comparing and I also started to see patterns that looked like instead of our sliding windows tracking scores over specific periods like daily and weekly, it looked like they were just accumulating total scores. But it was particularly weird because it wasn't all-time total scores, just totals since some particular date.

With this hypothesis in mind, I went back to the pipelinedb docs and did the classic slow, long facepalm when I found this clause:


>PipelineDB exposes the current_date, current_time, and current_timestamp values to use within queries, but by design these don’t work with sliding-window queries because they remain constant within a transaction and thus don’t necessarily represent the current moment in time.

When we had prototyped our queries, they were based upon a function called `clock_timestamp()` which works properly with pipelindb continuous views. As we finalized the code and switched from proof-of-concept structures to our real structures, I changed that to `current_timestamp` based on my reading of the postgresql documentation. I thought that was the more appropriate function.

But it turns out I had this wrong. The `current_timestamp` had only ever evaluated to a single moment in time, specifically when we first launched the feature and ran the `CREATE CONTINUOUS VIEW` statement. Thus it wasn't computing daily scores, it was computing scores since that specific, fixed moment in the past. Our sliding windows weren't sliding. The query's notion of "now" was not always being re-evaluated to the current moment in time.

The proper fix involved "just" dropping the errant `CONTINUOUS VIEW` definition and recreating it with the only change being to use `clock_timestamp()` instead of `current_timestamp`. This also discarded our current data for 1 day and 1 week intervals, meaning we'd have to wait a week before we could rely on that data again.

However, the realities of production data meant this fix out would take the better part of 2 weeks. Compounding the problem was the fact that a feature such as this that requires careful testing of data results over relatively long periods of time (days, weeks) meant that a severe but easy-to-miss bug such as this could get through dev, QA, and product management and escape detection. It's also a challenge to write automated tests for this. It's not impossible, it's just a lot more involved that testing basic CRUD functionality.
