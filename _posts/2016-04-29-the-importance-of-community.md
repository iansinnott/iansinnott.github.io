---
layout: post
title: "The Importance of Community"
comments: true
---

Specifically, when making technical decisions.

Community his hugely important any many areas of life, but lately I've found
that it's particularly pertinent in making technical decisions.

## An example

Recently at [Trustar][] we started using a [graph database][]. We have a lot of
interrelated data so the graph model has made conceptual sense for a long time.
So this year when we decided to implement a graph database in production we had
a technical decision to make: Which database do we use?

We're a small team (currently ~5 engineers) so we definitely don't have the
bandwidth to build our own implementation. That means we need to choose among
the existing solutions. There are currently several graph database providers
in the wild, and they all seem to do pretty much the same thing. Technically
speaking, the usual points they hit in differentiating themselves are ones of
how they handle scalability and replication.

But technical points are not the only ones to consider when making a decision
like this. We also wanted a strong community around the company we chose. Being
in San Francisco, it should come as no surprise that one of these
companies—Neo4j—not only has an office hear but they also host [a meetup][] near
our office.

I went to their meetup once and was quite happy with what I found. Everyone on
their team was friendly and helpful. That was all we needed. Now we're running
Neo4j in production and it's the backing data-store on top of our visualization
product, Constellation:

![Constellation Demo](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202016-04-29%20at%2011.42.03%20AM.png)

On top of that, I also got a chance to do an interview with the Neo4j which is
now live on their blog: http://neo4j.com/blog/ian-sinnott-software-engineer-trustar/

Then earlier this week two Neo4j team members came to our office and had a long discussion with us about our graph database architecture. All of this while **we're still on the _free teir_ of their product**. That's excellent.

## Community Matters

That was just one example in my own life, but if you look at other projects with significant communities the same is clear:

* React
  React is some amazing tech, but imagine how much _less_ useful it would be without the plethora of learning materials, examples and premade components all created by the community?
* Redux
  Same as above. Redux is an excellent state-management solution on it's own but how much _less_ useful would it be without the fanatic community that surrounds it?

The point being, if you're ever struggling with a decision between two technical solutions opt for the one with the larger community.

[Trustar]: https://www.trustar.co/
[graph database]: https://en.wikipedia.org/wiki/Graph_database
[a meetup]: http://www.meetup.com/graphdb-sf/
[blog post]: http://neo4j.com/blog/ian-sinnott-software-engineer-trustar/
