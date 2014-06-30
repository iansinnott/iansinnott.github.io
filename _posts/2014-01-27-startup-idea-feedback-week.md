---
title: From Startup Idea to (In)validation in a Week
author: Ian
layout: post
permalink: /blog/startup-idea-feedback-week/
dsq_thread_id:
  - 2180211560
categories:
  - development
  - goals
  - tech
---
This is the brief story of and reflection on me and a friend&#8217;s idea for a startup. We went from product idea, to super minimal prototype to finding out our product probably wasn&#8217;t going to make money all in a week. This is what happened.

## The Idea

A good friend of mine, [Nick Budden][1], had an idea for a product, and after talking about it over the course of a few days we decided to build it. The product would be a unified solution to many of the problems we face as freelance developers. Problems may be the wrong word actually, more like annoyances. The parts of our job that just serve to get in the way and take up valuable time that could be spent creating cool new things. Let&#8217;s call the combined sum of these annoyances &#8220;Freelance Minutia.&#8221;

Here was our initial definition of Freelance Minutia, and thus the problems we wanted to solve:

1.  Finding work
2.  Getting design feedback from clients
3.  Managing projects and client relations
4.  Bookkeeping

Our big idea was to create **a freelance dashboard that would automate all the annoying aspects of our job.**

## The Motivation

It sounded great at first. In my own dat-to-day work as a freelancer I most often encounter points (1) and (3) above. Finding work sucks, not because it&#8217;s necessarily difficult but because it usually takes a bit of time, say two weeks to land a new client I didn&#8217;t know at all beforehand. Then once I landed a client, I would need to keep track of all the various emails we sent back and forth. This is a hassle. Even with separate work and personal email accounts it&#8217;s easy for emails to get lost in the mix when you have more than one client, or are working on more than one project for the same client.

## The Competition

There are currently no shortage of &#8216;solutions&#8217; to either of these problems in the market. The first problem can be solved to some degree with online job boards. This is after all where me and Nick have both found a significant portion of our past work. But all those various job boards aren&#8217;t centralized, which makes it a hassle to sift through them all. The other friction point is that far too many of the jobs are complete and utter crap. I could write a whole post on what makes a &#8216;crap&#8217; job listing, so I&#8217;ll try to stay focused on the post at hand.

Then in the realm of the second problem mentioned above, client management, there are endless software & services that pitch themselves as project management software. Basecamp is possibly the most prominent example of such competition.

The issue with Basecamp-esque project management software in my opinion is that it introduces new friction into one&#8217;s workflow. As the developer, I must enter new clients in the system, and new clients need to sign up for an account before we can collaborate and discuss the project. If there is anything I have found that clients truly hate, it&#8217;s changing the way they already work. So introducing this new friction into a projects workflow isn&#8217;t ideal. The exception is of course clients that already use some sort of software solution, but in my experience they are the exception.

## The Solution

Given what we knew so far, we figured our ideal solution would be divided into a number of &#8216;modules&#8217;, each providing different functionality in the end product. The modules were as follows:

*   Job Board: An aggregator that would scrape jobs from a ton of sources on the web and display them to our users in a clean, easy to digest format. They would all be tagged with keywords of relevant skills such as *wordpress*, *javascript*, *rails*, etc. They we would only show each user jobs relevant to the skills they had indicated on their profile. Simple.
*   Design Annotation: A portion of the site where users could upload a design mockup, as a simple image file, and clients could add annotation boxes along with text on any area they liked.
*   Client Feeds / Inbox: An area where any emails with clients would be aggregated into simple, digestible feeds that users could review quickly. No more client emails lost in a mountain of other stuff.

## Product Validation

So, with our product idea relatively clear in our heads and our belief that the competition was missing something we set out to build a prototype. There&#8217;s no point building this thing if no one wants it after all. We gave ourselves a one-week timebox to get something out to a group of ten beta testers. So we created the &#8216;initial version&#8217;, if you can even call it that, which was prototype of the Job Board. This was actually just a simple Rails app that would display job titles, how to apply, and a brief job description. All the jobs were added by hand by me and Nick. We created this initial version and sent it out to our testers in three days.

The feedback on this first part wasn&#8217;t great. It was all very constructive, but it wasn&#8217;t overly positive. The recurring theme we kept on hearing was that other people found the majority of their work offline, usually at networking events or by referral. This meant that to them the job board was all but useless. The feedback wasn&#8217;t all negative, but it wasn&#8217;t positive enough for us to spend a ton of time creating a scraper and algorithm to find jobs and bring them into our dashboard. This would have to wait.

## Validation Phase 2

Now that we knew the Job Board module wasn&#8217;t as important as we initially thought, it was time to focus on the Client Feeds / Inbox module. This time, to save even more time spent coding we decided it would be best to just mock it up and send out images of what the finished product would look like. So for the next two days Nick created the mockups while I read up on Rails (neither of us new anything about Rails before starting this project). We sent out the mockups and waited for responses.

**This morning, we reviewed that feedback and came to the conclusion that we need to reconsider the whole project.** All of our beta testers gave long, insightful feedback and suggestions as to how we might move forward along with features they thought would be useful. However, one theme was consistent across all testers: They **wouldn&#8217;t** pay for this &#8212; Not yet at least. Since what they had seen in the mockups was pretty much what we imagined the finished product looking like, this was a big hit to the validity of our idea. So, as I said before, we&#8217;ve decided to go in a different direction.

## Take Aways

All things considered, we are both very happy with the past week and what we accomplished. We may not have a valid SaaS product yet, but we know that our initial idea wasn&#8217;t going to work and it took us only a week to figure this out. It would have been very easy to spend a month or two actually creating this product only to find out no one wanted to use it, so spending a week to come to this conclusion is good time in my mind.

Furthermore, I learned Rails this past week. This is an excellent side-effect of actually trying to build something with a new technology. Unlike tutorials which take you step by step through a process and assume you will be able to replicate it later, actually building something forces you to think through a problem, consult documentation, implement and revise. I may not yet be an expert in Rails but I can already tell it will become the mainstay of my back-end development from here on out.

We accomplished all of this while keeping up with our individual client projects as well.

## What now?

In the end, I both don&#8217;t feel surprised by our testers&#8217; responses but I also feel there is value in our original idea. My problems that I mentioned in the beginning of this post haven&#8217;t yet been solved, so there&#8217;s clearly room for value to be created. I think the Client Inbox module discussed above hold great promise, and I still intend to build some version of it for my own use if nothing else.

As for me and Nick as a team, we have decided to take this week for ourselves. We both have more client work to finish up, and I personally have something I want to build before moving on the the next project. We have an idea of the next big product we want to create, but if you want to know more about that I recommend checking out [Nick&#8217;s post about this experience.][2]

Cheers from Taiwan, Ian

 [1]: http://nickbudden.com/
 [2]: http://nickbudden.com/27/01/2014/the-1-week-startup-validation