#apolopena
/install-core-packages.sh/
express-react-starter.js

Code
Issues
3
Pull requests
Actions
Projects
Security
Insights
Owner avatar
express-react-starter
Public
apolopena/express-react-starter
 Branches
 Tags
Latest commit
@apolopena
apolopena 🐛 FIX: shellcheck directive
…
on Feb 3, 2022
Git stats
#`##".$_-0/"
"85
Files
Type
Name
Latest commit message
Commit time
.github/ISSUE_TEMPLATE
📦 NEW: initial commit
2 years ago
.gp
🐛 FIX: shellcheck directive
last year
.theia
📦 NEW: initial commit
2 years ago
.vscode
📦 NEW: initial commit
2 years ago
client
🐛 FIX: deps
2 years ago
server
🐛 FIX: be verbose about server type
last year
.gitattributes
Create .gitattributes
last year
.gitignore
🐛 FIX: simplfy ignores
2 years ago
.gitpod.Dockerfile
🤖 TEST: force docker image build
last year
.gitpod.yml
🐛 FIX: open preview on default express server port 7777
last year
.npmrc
📦 NEW: initial commit
2 years ago
README.md
Update README.md
2 years ago
mysql.sh
📦 NEW: mysql startup and shutdown
2 years ago
starter.ini
👌 IMPROVE: default to gitpodlatest for PHP
last year
README.md
express-react-starter
A full stack express/react starting point. Implements express, react, mysql, phpMyAdmin, mocha and supertest. A basic integration test for the server and the database is also included.

Run/develop your starter project on Gitpod
Gitpod allows you to develop in the cloud. To use the Gitpod platform you will need to login to Github using your Github credentials.

Try it out on on Gitpod.io to sample this project with a single click.
If you would like to change and add files to this project but don't care about changing the name of the repository, you can fork this project and then run it on Gitpod.
Fork this project and copy that forked repository url <repo_url>
Paste the URL into your browser where <repo_url> is your forked repository URL: https://gitpod.io/#/<repo_url>
If you would use this project as a starting point along with the name of your choice you can copy this repository in a new repository of your own.
Create a new repository on Github.
Use this handy bash function to copy this repository in your new repository with a clean history.
Make note of your new repository URL <repo_url>
Paste the URL into your browser where <repo_url> is your new repository URL: https://gitpod.io/#/<repo_url>
Run/develop your project locally
You will need a proper installation of Node and MySQL before you get started. phpMyAdmin will not be installed.

Create a new repository on Github.
Use this handy bash function to copy this repository in your new repository.
Clone your new repository, something like this: git clone https://github.com/myusername/mynewrepo.git
Move into your new repository: cd mynewrepo
Install dependencies for the server: cd server && yarn install; cd ..
You may run the server on its own by running the following command from the ./server directory: yarn run start_dev
Install dependencies for the client and build the client: cd client && yarn install; yarn run build; cd ..
You may run the client on its own running the following from the ./client directory: yarn run start
Run integration tests locally
Start MySql and wait until it is ready. A script has been provided for easy starting and stopping of mysql.
Ensure you have a database to connect to for the test.
Create an .env file with valid credentials (including the proper database name) in ./server using .env.template as your guide.
Run tests: cd server && yarn run test"`
