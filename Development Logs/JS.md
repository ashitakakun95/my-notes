# JS

## 19 August 2018 - addEventListener with Parameters

With dynamic created element, you can't add function with parameter.

This will not work...
``` js
li.addEventListener('click', updateConversation(conv));
});
```
So, the correct way...

``` js
li.addEventListener('click', () => {
    updateConversation(conv);
});
```

## 24 August 2018 - Node.js passport with custom callback

[passport.js - Node.js passport custom callback - Stack Overflow](https://stackoverflow.com/questions/35280721/node-js-passport-custom-callback)

[Node.js Async Tutorial](https://justinklemm.com/node-js-async-tutorial/)

[Mongoose: write own methods with promise](https://stackoverflow.com/questions/46009991/mongoose-write-own-methods-with-promise)