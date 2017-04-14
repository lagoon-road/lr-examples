# Installing Lagoon Road
Like any other npm package you can just run
```
npm i --save lr-core
```
All the package names for the supplied packages can be found in the [reference overview](/reference).

## Following the examples
The easiest way to follow the examples is just to clone the lr-examples repo. This repo contains some build tools that help generating client side js code. So you don't have to manually setup Babel, Browserify and the likes.

If you feel more adventurous, you can just checkout the packages you need and glance over the examples, it will show you how to use the road on client and server among some other common scenarios.

To clone the repo just go to your preferred directory and run one of the two following commands:

**SSH**  
```
git clone git@github.com:lagoon-road/lr-examples.git
```

**HTTPS**  
```
git clone https://github.com/lagoon-road/lr-examples.git
```

In the repo you can find folders for all the examples. Most folders will contain a `source` folder and a `public` folder. The `source` folder is where we write our code and it is also the folder which the node server will use to serve its responses.

The `public` folder is the folder where the generated client side code will be saved. There are some `scripts` in the `package.json` file that help you do that.

```
npm run watch
```

This command will build the client side code and watches file changes.

To start the server you can simply run
```
npm run serve
```

Before you can run the code, you need to install all the npm packages, to do so run the command below, you only have to do this once.

```
npm install
```

> The Lagoon road packages contain ES6 code, for the client it will be transpiled and browserified. Server side code isn't transpiled so either install the latest node version or transpile the code to run it in an older node version.

#### Next: [Hello-world](/guide/hello-world)
