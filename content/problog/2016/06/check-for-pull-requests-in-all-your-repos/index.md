+++
title = "Check for Pull Requests in All Your Repos"
slug = "2016/06/check-for-pull-requests-in-all-your-repos/"
date = 2016-06-09T15:11:35.099Z
+++
My current work involves many microservice (ish) node.js projects. Each has its own git repository hosted on github. My team follows a pull request workflow requiring all code to hit our main branch via pull request. We have slack chat integration so we can see when a new pull request is created, but even with that I found myself confused about whether or not there were any pending pull requests that I needed to review.

Scripting to the rescue! Here's what I did to quickly see a list of each repository and the title of each pending pull request. I hacked this together with cURL, an npm command line module named [json](https://www.npmjs.com/package/json),  and a few lines of shell scripts. Here's the breakdown:

- Log in to your github account and visit the [personal access tokens](https://github.com/settings/tokens) settings page
- Click the button to generate a new access token. Give it a clear name like "Pull Request Status Script". Check the "repo" scope checkbox
  - I believe this is the most specific/limited/correct permission, but if you know a way to grant read-only access to pull requests in a private repo, please let me know via disqus comment below.
- Click "Generate Token", copy it, and save it to a file. You can do this on OS X with the command line `pbpaste` utility. For example: `pbpaste > ~/.github-pr-status-token.txt`
- Tighten permissions on that: `chmod 400 ~/.github-pr-status-token.txt`
- Install the npm module json: `npm install -g json`

Now you're ready to add this shell script to your shell profile:

```sh
check_pull_requests() {
  local organization="YourGithubOrg" # Edit this
  for repo in repo-1 repo-2 repo-3 repo-4; do # Edit this repo list
    echo "* ${repo}"
    curl \
      --silent \
      --header "Authorization: token $(cat ~/.github-pr-status-token.txt)" \
      "https://api.github.com/repos/${organization}/${repo}/pulls" \
      | json -a title html_url
  done
}
```

The output will look something like this:

```
* repo-1
Update config for Heroku https://github.com/YourGithubOrg/repo-1/pull/13
* repo-2
* repo-3
Fix Bug #42 https://github.com/YourGithubOrg/repo-3/pull/42
* repo-4
```

I hope you find this useful. Get those PRs reviewed quickly!
