+++
title = "Practices and Values"
+++
# Practices

## General Orientation

- Pragmatic Craftsmanship (see The Pragmatic Programmer, Code Complete)
- The #1 primary mandate of the software engineer is managing complexity
- Correctness and clarity are king
  - readability and maintainability are more important than brevity
- Clever is bad. Period.
  - Remove all magic (see [Django Pony](http://djangopony.com/))
- Libraries over frameworks
  - My code invokes library methods
  - No "your code goes here" boilerplate
- Slow, calm, and correct
  - I build working software that is well-crafted
- Components Should Be Focused, Independent, Reusable, Small & Testable ([FIRST](http://addyosmani.com/first/))

See also my [code conventions](/code-conventions/)

## Data Modeling

- Integrity-first
  - Default attitude is traditional referential integrity with schema, transactions, and strict expectations of data consistency and durability
  - Sacrifice consistency, integrity or durability to get performance or convenience when warranted
    - Spoiler alert: it's rarely warranted
  - Properly coding for collections of data where individual records can vary greatly is difficult. Stick with consistent records.
  - Disciplined data migrations should be part of the normal development process
- Minimalism
  - Each field and record has perpetual maintainance cost
  - Only add more data when clearly driven by current features
  - Prune stale data as early as possible
  - [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
- Conform to common system model in end-user terms
  - Avoid abstractions
  - Keep naming clear and consistent with the system model and user interface
  - Model collections based on semantics as opposed to raw data similarity

## Programming Paradigm

- Multi-paradigm taking the best elements of functional, procedural, object oriented
- Functional programming is the dominant paradigm in my mind these days
- Pure functional with no side effects has great testability
- I think more about data and functions being separate these days as opposed to Object Oriented coupling of the two
- Use built-in data structures (lists, maps) for simple cases, but go to objects as soon as it is non-trivial
- Prefer basic procedural conditions and loops when they are clearer than complex functional or object oriented patterns

## Testing

- Lots of thorough pure unit tests. Fast (no I/O). High code coverage.
- Modular code. Judicious use of mock objects. Dependency injection.
- Factories as opposed to fixtures
- Test only the first-party code written for this application
- A small handful of end to end system tests
- If running tests gets slow, it's probably time to split the project into smaller modules

## Configuration

- I agree with [this research](http://neverworkintheory.org/2016/06/09/too-many-knobs.html) that most configuration settings go unchanged and therefore are unnecessary. [This article](http://ometer.com/preferences.html) is also a good read.
- Good design that does not require configuration is superior to "flexible" code that comes with many confusing settings
- The end user is usually much less likely to be in a position to understand and specify a good configuration value than the software development team
- For basic environment-specific settings, configuration can be mostly unavoidable. These settings are fine just keep it simple.

## Process

- I don't subscribe entirely to any specific methodology
    - There are good ideas and practices in Agile, Scrum, KanBan, Lean, etc
    - Most of my projects don't lend themselves to a formal methodology
- Key things I focus on
  - Working, deployed software as the core deliverable
    - Avoid shipping partial features, use separate mock-ups for that
    - Avoid shipping in any not-ready-for-prime-time state
  - Small sprints (usually weekly)
  - Some reasonable project management tool other than email
  - Stakeholder prioritizes the work to be done in conversation with developers
  - Modern Async
      - Read [The Async Manifesto](http://asyncmanifesto.org/)
      - Note in this context the word "async" means something very different from "async" in terms of node.js non-blocking programming.
- Estimates
  - Avoid them as much as possible
  - Build trust based on past performance instead
  - When unavoidable, keep it simple: small, medium, large
    - Call BS on Story Points
  - Work items must be decomposed until they fit in a single sprint (there is no extra large)
  - See also [What's Wrong With Estimates](https://medium.com/@gsaslis/whats-wrong-with-estimates-7af6d188a132)
- Lean Startup/Minimum Viable Product. Launch and learn. Rinse and repeat.

## Deployment and Operations

- Clear and fully independent development, QA, stage, production environments from day one
- Should be able to rebuild entire app infrastructure with code and docs in the main source code repository
- [Semantic Versioning](http://semver.org/)
- Modified [12-Factor](http://www.12factor.net/) principles
  - See also my talk: [12-Factor Apps in node.js](/twelve-factor-nodejs)

### Definition and purpose of a stage environment

- Reduce risk that new releases will disrupt production
  - In order to deliver this, stage must be entirely separate from production. No sharing of any resources whatsoever with production.
- Create high confidence that new releases will deploy and function correctly
  - If it deploys and runs OK on stage, we have very high confidence that it will deploy and run OK on prod.
  - In order to deliver this, stage must be nearly-identical to production
- Provide safe environment to reproduce and troubleshoot production issues
  - Ideally this would be a third environment dedicated to troubleshooting, but in practice resolving production issues takes priority over testing new releases thus both are conducted in a single stage environment.
  - Need to be able to reproduce issues to have hope of resolving them. However, attempting to reproduce in production creates wreckless risk of further issues.
  - In order to deliver high probability of reproducing issue off production, stage must be nearly-identical to production
  - Want to know if it happens in production, it can be reproduced in staging, and if a change fixes an issue in stage, that same change will fix the issue in production.
  - In order to deliver this, staging must nearly-always be available in a state exactly matching production. Thus stage must not be used for functional testing or QA of releases. Stage should only be used as a final quick verification that the release is deployed to stage and the new features are passing quick smoke tests. Thorough testing and QA should be done in a dedicated enironment distinct from stage.
- Further reading: [Center Stage](https://increment.com/development/center-stage-best-practices-for-staging-environments/) by Alice Goldfuss
