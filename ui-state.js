/**
 * UIState manager at simplest form
 * @param element
 * @param initialState
 * @constructor
 */
function UIState(element, initialState){
    initialState = initialState || {};
    this.element = element;
    this.state = new Proxy(initialState, {
        set: function(target, property, value){
            if(initialState[property] == value) {
                return false;
            }
            initialState[property] = value;
            if(typeof this.render == 'function') {
                this.render.apply(this, [initialState]);
            }
        }.bind(this)
    });
    this.render.apply(this, [initialState]);
}
UIState.prototype = {
    setState: function(property, value) {
        this.state[property] = value;
        return this;
    },
    getState: function(property) {
        return this.state[property];
    },
    render: function(initialState){
        if(typeof this.state.render == 'function') {
            this.element.innerHTML = '';
            var content = this.state.render.apply(initialState, [this.element]);
            if(typeof content == 'object') {
                if(typeof content.length == 'undefined') {
                    // it is actual object
                    this.element.appendChild(content.cloneNode(true));
                } else {
                    // it is an array
                    var el;
                    for( el = 0; el < content.length; el++) {
                        if(content[el] instanceof Node) {
                            this.element.appendChild(content[el].cloneNode(true));
                        }
                    }
                }
            } else {
                if(typeof content !== 'undefined') {
                    // when something is returned, and not undefined
                    this.element.innerHTML = content;
                }
            }

            if(typeof this.state.onrendered == 'function') {
                this.state.onrendered.apply(initialState, [this.element, content]);
            }
        }
    }
};