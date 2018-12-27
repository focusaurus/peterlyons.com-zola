+++
title = "Right tool for the job"
slug = "2017/02/right-tool-for-the-job/"
date = 2017-02-18T20:28:04.554Z
+++
"Use the right tool for the job" is an oft-repeated aphorism in the tech world. In my experience, I have found this aphorism to be said a lot but actually implemented rarely and to also omit the reality of how technology choices are made. So this post will be calling bullshit on this phrase. I hear "Use the right tool for the job", but what is see is more like:

- We are unable to learn new tools, so everything is built in the tools we already know
  - My point here is not "and this is bad and we are bad because of this", it's just the actual reality on the ground, and it's fine.
  - Learning new programming languages is hard and takes time, money, effort, and determination. Even then many developers never achieve a level of capability and confidence that matches their primary language.
  - New databases almost by definition are harder to develop against and operate than one you are already competent with, so you end up with slow development speed, slow queries, or operational issues and the project is deemed a failure and you abandon it and move back to the old database
- Any new tool is inherently "right" because ignorance biases positive
  - We have a thorough understanding of the shortcomings of our current tools due to our operational experience with them. The marketing materials for the new tool clearly indicate all of these problems are solved in the new tool. We have no operational experience with the new tool so we don't know that it comes with its own different set of shortcomings, so we are constantly switching to new tools assuming they are better. Sometimes they are, often they are worse, often they are essentially on par with the old tools.
- We have an 8x8 tool shed
  - There's only so much staff and time we have, and we do a lot of "jobs". If we actually used the right tool for each job, we'd have an unmanageable number of tools and expertise in none of them.
  - So what happens is you use a core set of tools that does most of what you need well and if something can be done with this core set of tools adequately but not "the right way", you just do it adequately because just like physical tools, software tools take space to store, maintain, repair, etc.

In my world, the specific tool being considered when this phrase is repeated is usually a programming language, framework, library, database, or SaaS product. My TL;DR for each of these would probably be:

- **Programming language**: There are teams that can add or switch programming languages and there are projects that can only accomplish this with new staff. Safe to assume your team is not the kind that can switch programming languages unless you have solid evidence indicating you can.
- **library/framework**: In my experience these projects often do "succeed". I usually feel the end state is not significantly better than the start state and a lot of libraries/frameworks are at the end of the day basically the same tool. However, if your developers enjoy the switch and have more fun in the new framework, it might be worth the business cost, but I'd urge you to be clear with yourself that you are allowing the team X months to port to a framework basically as a job perk for retention purposes.
- **databases**: The switching cost tends to be very high. This can work out if the problems with the current database are crystal clear and the new database's ability to relieve them well-known. But most of the time when I see a project running 8 or 9 different databases, they'd probably be better off overall sticking to 2 or 3 and having real expertise in them.
- **SaaS Products**: I think developers don't advocate "right tool" to promote switching between competing SaaS products that often because there's credit cards involved in comparing/contrasting. Thus I don't see as much spurious swapping of these. I think if you stick to products with well-defined functions you'll be OK and won't end up using them for the wrong job. If you use more "platform" type things (think Salesforce, CMSes, CRM) there's more potential to get into wrong tool for the job territory.

Overall I think this in an interesting topic for me. Please share you experiences and thoughts using the comments below (this blog does have disqus comments but they are rarely used) or on twitter, etc.
