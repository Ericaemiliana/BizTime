### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  using the async and await keywords

- What is a Promise?

  A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.
  Promises are eager, meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked.

- What are the differences between an async function and a regular function?
  When a normal function is executed, it runs sequentially . That is, if you have two functions A () and B () and execute them in that order, the B () function will only be called when the A () function finishes its execution.

  By contrast, if you have an asynchronous function A () (for example, that performs an I / O operation or other blocking operation), it can be called and while the operation is performed you can execute another function B () ( asynchronous or not) in the main context. Later, the A () function will return its value when the operation is finished and the main thread is available for that.

- What is the difference between Node.js and Express.js?
  Express is built on top of Node. Express adds more features. Node is just a Javascript environment with libraries to make it easy to write software, where Express extends Node specifically to make webservers easy to write.

  Express adds the concept of middleware, a simplified way of managing different routes, automated integration with several templating engines and a bunch more.

- What is the error-first callback pattern?
  The error-first pattern consists of executing a function when the asynchronous operation ends (such as an incoming AJAX response) which takes as first argument an error, if one occurred, and the result of the request as extra arguments.

- What is middleware?
  Middleware is software that provides common services and capabilities to applications outside of what’s offered by the operating system. Data management, application services, messaging, authentication, and API management are all commonly handled by middleware.

  Middleware helps developers build applications more efficiently. It acts like the connective tissue between applications, data, and users.

  For organizations with multi-cloud and containerized environments, middleware can make it cost-effective to develop and run applications at scale.

- What does the `next` function do?
  The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```
