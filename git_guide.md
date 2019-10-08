# Introduction to Git

## Setup

### Install Git

Download at <https://git-scm.com/downloads>

### Create Gitlab account

Since a GitHub account can be used to sign into GitLab, I suggest first visiting <https://github.com> and creating a GitHub account. Then, proceed to sign into [GitLab](https://gitlab.com/) with GitHub.

### Link GitHub account to Git

Enter the following commands with your GitHub username and email.

```batch
git config --global user.name "Your name here"
git config --global user.email "your_email@example.com"
```

At this point, your GitHub account is linked to Git and you can begin to push code to GitHub; however, git will require you to enter your password during every interaction with the repository. To fix this issue, we set up an SSH key.

### Set up an SSH key

We create a private and public SSH key and give the public key to GitHub. If you run into any problems setting up the SSH key, refer to [this article](https://help.github.com/en/articles/connecting-to-github-with-ssh).

#### Check for existing SSH keys

First check to see if you have already generated a key pair. SSH keys are typically stored within a hidden folder in the home directory. List the items in this folder with the following command.

```batch
ls ~/.ssh
```

If you do not see a file containing ssh keys (usually a file ending in `.pub`), the next step is to generate a pair.

#### Create an SSH Key

Generate an SSH key pair with the following command.

```batch
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### Upload SSH key to Git hosting service

With an SSH key in hand, navigate through the site's settings to find a tab to add SSH keys. Then, copy the key located in `id_rsa.pub` to the text box on the site.

#### Check everything worked

```batch
ssh -T git@gitlab.com
```

## Getting started

We can run git commands through its command line interface (CLI). The first step we want to do is create a new repository.

The first thing we want to to is either create a new repository, or [clone an existing one](https://help.github.com/en/articles/cloning-a-repository).

### Create a new Repository

```batch
git init
```

Run this to verify that you have successfully authenticate.

This command will create a hidden folder named `.git` in the current working directory. This hidden folder contains all data regarding your project's version history. Note that initializing a repository does not start tracking for any of your files yet. See the next step to add your files.

### Add files

When you run `git init`, it creates an empty git tracking file. You need to add the files you want to track manually. This process of adding files is called staging. You are staging for a commit.

```batch
git add myfile.cpp
```

Or select and add all of the files in the directory with the following command.

```batch
git add *
```

Note: This command adds all of the current

#### Ignore files

Another optional, but great feature of git is the use of a `.gitignore` file. Simply create an empty file with the name `.gitignore` in your working directory and list any files that you do not wish to track within it. Why would you not want to track everything? Certain files such as `a.out` or any other executables should never be tracked as they can be recompiled by another user. Most files that do not contain human-readable code should not be tracked.

#### Commit changes

Once you are ready to formally save your staged files to the version control software, you can run the following.

```batch
git commmit -m "Your commit message"
```

This basically stores the difference of your previous commit and your current commit in the hidden `.git` folder in your working directory.

Everything we have learned so far can be used offline. Next, we should push our changes to the remote repository.

### Sync with a Remote Server

#### Add remote repository to Git

If you just initialized a new repository, we will need to tell Git where to push our changes.

```batch
git remote add origin ssh_url
```

#### Push changes to repository

Once you have made a commit, it is best practice to push it to your remote repository soon after.

If you have cloned your repository, Git will already know the location of your remote repository.

```batch
git push
```

## Branches

Create a new branch when you start working on a fix or feature with

```batch
git checkout -b branchname
```
