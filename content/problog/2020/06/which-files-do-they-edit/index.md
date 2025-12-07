+++
title = "Which files do they edit"
date = 2020-06-05T02:02:45Z
+++

When hopping in to an unfamiliar git repo, if it's a big sprawling repo or even a monorepo, it can be hard to know which parts are relevant. Well, if you know someone on your team's name, I have a script that can give you a pretty solid clue.

Here's the pipeline and explanations.

```sh
# Show me the hash of every commit by someone named Doe
# for the last 3 months
git log --author='Doe' --pretty=format:%H --since="3 months ago"

# Now show me the files changed in each of those commits
  xargs -n 1 git diff-tree --no-commit-id --name-only -r |

# now remove duplicates and count how many commits per file
  sort |
  uniq -c |
  sort -nr
```

`--since` has pretty intuitive natural language processing so you can easily adjust that. `--author` seems to work on portions of either name or email.

For example, here's a snippet of the files Eric Dobbertin has been changing in the main reaction commerce repo the last 6 months.

```
git log --author='Dobbertin' --pretty=format:%H --since="3 months ago" |
  xargs -n 1 git diff-tree --no-commit-id --name-only -r |
  sort |
  uniq -c |
  sort -nr

     19 package-lock.json
     14 package.json
     10 plugins.json
     10 jest.config.cjs
      7 tests/integration/api/mutations/createProduct/createProduct.test.js
      6 tests/util/factory.js
      6 tests/integration/api/mutations/createProductVariant/createProductVariant.test.js
      6 src/mockTypes.graphql
      5 tests/integration/api/queries/taxServices/taxServices.test.js
      5 tests/integration/api/queries/ordersByAccountId/ordersByAccountId.test.js
      5 tests/integration/api/queries/catalogItemProduct/catalogItemProduct.test.js
      5 tests/integration/api/queries/anonymousCartByCartId/anonymousCartByCartId.test.js
```
