# Installing Lagoon Road
Like any other npm package you can just run:
```
npm i --save lr-core
```
For all other packages that are supplied, look at the [reference](/reference).

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

The `public` folder is the folder where the generated client side will be saved. There are some `scripts` in the `package.json` file that help you do that.

```
npm run watch
```

This command will build the client side code and takes care of file changes.

To start the server you can simply run:
```
npm run serve
```

When you want to run the code for the first time you need to install the node packages first.

```
npm install
```

You only have to run that command once.

#### Next: [Hello-world](/guide/hello-world)
