# Update and middleware stack

As you have seen by now in the examples within this guide, there is a common pattern that we follow in Lagoon road. We listen to update events and match them with the `updateType` and `matchValue`. So what does happen in the core whenever a update event is fired?

Each time the update event is triggered the core looks up all the middleware that matches that specific update. If it can find matches for the update it will add the middleware that is added via the `run` method to the stack. If there is no match, `noMatch` will be added to the stack.

Next the `done` middleware will be concatenated with the stack that just has been created. Once we have a final array of all the middleware that we need, we start to thunkify the middleware functions to get the typical `next()` function. Everytime the `next()` function is called it will merge the `relay` data with the data that already exist and a check is performed to see if the middleware signature should be traditional or not.

It can happen that during the execution of the stack an error occurs within a middleware function. If this is the case then the stack will be cleared and the `error` middleware will be added together with the `done` middleware.

Once all the middleware functions on the stack have been executed the core waits for new update events to come in...

In an ideal world the stack is completely finished before a new update event is triggered. In the real world this is not the case. It can happen that a middleware function in the stack is executing and a new update event is triggered. This can cause all sorts of nasty race conditions.

To mitigate this problem, Lagoon road not just stacks its middleware, but also the update events. So every time an update event happens and the stack is still processing its middleware we wait before triggering a new update event and call that middleware. No more race conditions so you can be sure that, if you want to do some state management, your data is correct.

Because there might be a multitude of update events being added to the stack the last call in a middleware stack is not persee the last middleware function to be called. Therefore **you must always add the `next()` method in each middleware function.** The last `next()` function tells the core to handle stacked update events that might be waiting to be executed.

Having all the data synchronized is nice, but there are cases where there is no dependency between update events, so they could run in parallel to speed up execution. This is the case when you want to serve static content. This is another reason to start using a reverse proxy to take care of your statics.

Finally there are cases where a middleware function does some actions which result in the fact that all the following middleware should not be executed. You want to tell the core that you are done with the current middleware stack so that potential new update stack records can be set in motion. This scenario happens in our statics example. We call the `response.end` method when a file is considered a static. In that case we don't want to go through the rest of the middleware stack because we have already send back the response. In order to tell the core that we want to terminate the current middleware stack we can call the `relay.exit()` method.

> It is good practice to try and do your responses in the `.done()` method and avoid using the `.exit()` method when possible. It has mainly been added to do stuff like static middleware, but again, better do that with a reverse proxy.

Next: [Writing extensions](/guide/writing-extensions)
