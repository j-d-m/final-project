* GitHub Team Workflow


(IMPORTANT !!!)
-dev branch is the source to initiate a new branch and has the project folder structure (Step 0).
-dev branch needs to be updated often to minimize conflicts (Step 1)
-dev branch needs to be merged into your branch often to minimize conflicts (Step 2)
-dev branch is the developers branch
-paul-navbar-search branch is a normal branch example
-GitHub maintainers are born3am (Pedro) or j-d-m (Joshua)


(VS CODE)
Step 0: Creating a branch from updated dev 
$ git checkout dev
$ git pull (fetch and merge remote dev into local dev) 
New branch using kebap-case (your name plus feature) - example:  paul-navbar-search
$ git checkout paul-navbar-search

Step 1: Pull code from Github remote dev to your local VS CODE
Daily before start coding and specially before push a commit
#git fetch can fetch the latest branches from github when needed
$ git checkout dev
$ git pull (merge included)

Step 2: Merge dev into paul-navbar-search (dev is our developers branch)
$ git checkout paul-navbar-search
$ git merge dev

Step 3 : Solve conflicts locally
*A comparison is shown. 2 versions of each file: (current/vs-code/our version and incoming/remote/their version)
* Your version will always be the current version.
Go to VS CODE lateral bar SOURCE CONTROL 

Check files in “Merge Changes”. In the example below server.js has 3 conflicts, resolver.js has 6 conflicts.


Right click at the file to Accept:
All current/vs-code/our version or to Accept all incoming/remote/their version

You can do the same individually for each code block, just clicking at the top 4 options  
(Accept Current Change / Accept Incoming Change / Accept Both Changes / Compare Changes ). 

Scroll down to find each conflict block - it will be highlighted with different colors)


Step 4: Stage/commit/Push
Make sure you are on your branch paul-navbar-search
$ git branch (start “*” indicates the current branch)
$ git status (check if you have changes to stage/commit)
$ git add .
$ git commit -m “your own commit message”
$ git push

(GITHUB)

Step 5: “PR” – initiate a pull request on GitHub

Your branch paul-navbar-search should point into dev : “base: dev” ←“paul-navbar-search”

Developer leave a comment

Developer creates a pull request and wait GitHub maintainer approval.


Step 6-a: Conflict found (easy/simple)

GitHub maintainer solves conflict directly on Github

GitHub maintainer approves merge request and closes it.

GitHub maintainer deletes online branch (merged into dev)


Step 6-b: Conflict found (complex)

GitHub maintainer replies pull request with a comment

Developer fixes conflicts locally and commits again to the same branch.

Developer can write a new comment on the pull request as well.
*No need to create a new pull request.
*Once the previous pull request for the branch was not closed yet, it will store all the messages.

Conflicts solved, GitHub maintainer approves merge request and closes it.

GitHub maintainer deletes remote branch paul-navbar-search (merged into dev)


(Branch process finished. Start a new process again from Step 0)







