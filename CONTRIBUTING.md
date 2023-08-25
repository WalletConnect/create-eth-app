# Contributing

Feel free to dive in! [Open](https://github.com/PaulRBerg/create-eth-app/issues/new/choose) an issue,
[start](https://github.com/PaulRBerg/create-eth-app/discussions/new/choose) a discussion or submit a PR.

Contributions to `create-eth-app` are welcome by anyone interested in adding support for more frameworks or DEFI templates, writing more tests, improving readability, or improving the documentation.

## Pre Requisites

You will need the following software on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.Js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)

## Set Up

1. Fork this repository by visiting https://github.com/PaulRBerg/create-eth-app/fork

2. Once the fork is created, head to the forked repo. For example, [this](https://github.com/robin-thomas/create-eth-app) is a fork of the original repo.

3. Go to `Settings` tab of the forked repo. Under `Security` subheader, click on `Secrets and variables`, and click on `Actions`.

4. Click on the `New repository secret` button, and add the following secrets:

   - `GH_OAUTH_TOKEN`: Your fine-grained personal access token

5. You can create a token by visiting: https://github.com/settings/personal-access-tokens/new

- Enter the token name as: `create-eth-app`
- Make sure `Only select repositories` option is selected, and choose your forked repo.
- Enable the `Environments` permission under `Repository permissions` section, by choosing `Read and write`
- Enable the `Secrets` permission under `Repository permissions` section, by choosing `Read-only`
- Use the token generated in the previous step as the value for `GH_OAUTH_TOKEN` secret.

6. Clone the forked repo to your local machine

7. Then, inside the project's directory, run this to install the Node.js dependencies:

```bash
$ yarn install --frozen-lockfile
```

Now you can start making changes.
