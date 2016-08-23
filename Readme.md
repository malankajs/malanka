# Malanka [![Build Status](https://travis-ci.org/malankajs/malanka.svg?branch=master)](https://travis-ci.org/malankajs/malanka)

## Install

    npm install --save malanka

## Quick start

To quick start you can use [Malanka Skeleton](https://github.com/malankajs/malanka-skeleton). 
It is already configured to server side rendering

## Basics

Malanka is full stack framework with [handlebars](https://github.com/wycats/handlebars.js/) like template engine.
It is compile into virtual dom with output to string or DOM tree. Data model pretty
like to [backbone](https://github.com/jashkenas/backbone), but with data streams like in
[baconjs](https://github.com/baconjs/bacon.js).

Then main goal of framework is to create universal components, which must render on server and client
and provide easy way to restore their state to continue work.

## Template render pragma

Malanka supports special pragma for rendering components. It is use only during compilation and 
control rendering process

### #bundle

It is extract component to separate module with webpack `promise-loader`:

```handlebars
<div class="test">
    <Sidebar #bundle=true>
        <Navigation items=navigationItems>
            ...
        </Navigation>
    </Sidebar>
</div>
```

In this example `Sidebar` and `Navigation` will be extracted in separate module and will be
rendered on server as normal components, but will be initialize in Browser only after module loading.
If rendering on client side only, then component appears on screen only after module loading.

### #async

If component want to make async operations before rendering you can specify #async pragma,
which tells to Malanka wait until process complete:

```handlebars
<Avatar model=user #async=loadAvatar>
    ...
</Avatar>
```

```js
import {Component} from 'malanka';

export class Avatar extends Component {
    
    loadAvatar() {
        return new Promise((resolve, reject) => {
            let image = new Image();

            image.onload = resolve;
            image.onerror = reject;
            image.src = this.user.getAvatar();
        });
    }
    
}
```

Server rendering and client initialization will be waiting until process complete. 
Component appears only after promise resolve, if rendering starts on client side.
 
### #match

If component must be rendered only on server or only on client, you can specify `#match` 
pragma, which creates components only if matches `define` params on `ComponentScanner`:

```js
// webpack.config.js

modules.exports = {
    // ...
    plugins: [
        new ComponentsScanner({
            define: {
                is_server: false,
                is_client: true
            }
        })
    ],
};
```

```handlebars
<ServerInfo #match="is_server">
    ...
</ServerInfo>

<BrowserInfo #match="is_client">
    ...
</BrowserInfo>
```

In example above only `BrowserInfo` will be rendered, `ServerInfo` will not work.


### Conclusion

You can combine pragmas with each other to create logic you want. 
For exmple, if you want render component on client only, after bundle and data loading you can
write something like:


```handlebars
<UserStats 
    model=user 
    #bundle=true 
    #async=loadStats 
    #match="is_client"
>
    ...
</UserStats>
```

It will appear on user screen only after bundle loading and will resolve promise in `loadStats` method
of `UserStats` component.
