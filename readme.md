#User Interface DOM manager

There would be many developers like me, struggling to manage DOM when their javascript variable changes, or some event is fired. Well, in those conditions either you go for angular or react, or some other library. But why include complete library when you need just a small dom part management?

Here this little code may help you cope with that. below are examples given about how to use this:

## Steps

- Include js
- Use library

```html

<script src="ui-state.js"></script>

<div id="message-div"></div>
```

```javascript

// Sample usage
var messageUI = new UIState(document.getElementById('message-div'), {
	this.message = 'Initial message';
	render: function(){
        return 'Hello ' + this.message
    }
});

// now at any point, just change the variable and see the result
messageUI.state.message = 'Welcome!';

```

Also, it doesnt uses any watcher, So, you dont need to worry about performance, it will update dom only if it's changed.