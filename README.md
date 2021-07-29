# express-react-starter
A full stack express/react starting point. Implements express, react, mysql, phpMyAdmin, mocha and supertest. A basic integration test for the server and the database is also included.

## Run/develop your starter project on Gitpod
Gitpod allows you to develop in the cloud. To use the Gitpod platform you will need to login to Github using your Github credentials.
 - [![Try it out on on Gitpod.io](https://gitpod.io/button/open-in-gitpod.svg)](http://gitpod.io/#/https://github.com/apolopena/express-react-starter) to sample this project with a single click.
 - #### If you would like to change and add files to this project but don't care about changing the name of the repository, you can fork this project and then run it on Gitpod.
   1. [Fork](https://github.com/apolopena/express-react-starter) this project and copy that forked repository url `<repo_url>`
   2. Paste the URL into your browser where `<repo_url>` is your forked repository URL: `https://gitpod.io/#/<repo_url>`
 - #### *If you would use this project as a starting point along with the name of your choice you can copy this repository in a new repository of your own.*
   1. Create a new repository on Github.
   2. Use this [handy bash function](https://gist.github.com/apolopena/2d7995e5e8bfcfa9287d74d16b14aafe) to copy this repository in your new repository with a clean history.
   3. Make note of your new repository URL `<repo_url>`
   4. Paste the URL into your browser where `<repo_url>` is your new repository URL: `https://gitpod.io/#/<repo_url>`
   
   
## Run/develop your project locally
You will need a proper installation of Node and MySQL before you get started. phpMyAdmin will not be installed.
1. Create a new repository on Github.
2. Use this [handy bash function](https://gist.github.com/apolopena/2d7995e5e8bfcfa9287d74d16b14aafe) to copy this repository in your new repository.
3. Clone your new repository, something like this: `git clone https://github.com/myusername/mynewrepo.git`
4. Move into your new repository: `cd mynewrepo`
5. Install dependencies for the server: `cd server && yarn install; cd ..`
   - You may run the server on its own by running the following command from the `./server` directory: `yarn run start_dev`
6. Install dependencies for the client and build the client: `cd client && yarn install; yarn run build; cd ..`
   - You may run the client on its own running the following from the `./client` directory: `yarn run start`
  
### Run integration tests locally
7. Start MySql and wait until it is ready. A [script](https://github.com/apolopena/express-react-starter/blob/main/mysql.sh) has been provided for easy starting and stopping of mysql.
8. Ensure you have a database to connect to for the test.
9. Create an .env file with valid credentials (including the proper database name) in `./server` using `.env.template` as your guide.
10. Run tests: `cd server && yarn run test`
