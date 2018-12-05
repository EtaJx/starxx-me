---
title: react组件通讯
date: 2017-03-30 22:01:46
tags:
- react
categories:
- react

---

### react组件通讯
#### 父组件向子组件通讯
父组件向子组件用过传props的方式向子组件进行通讯。

```JavaScript
class Parent extends Component {
    state = {
        msg: 'start'
    };
    
    componentDidMount() {
        setTimeout( () => {
            this.setState({
                msg: 'end'
            });
        }, 1000);
    }
    
    render() {
        return <Child_1 msg={this.state.msg} />;
    }
}

class Child_1 extends Component {
    render() {
        return <p>{this.props.msg}</p>
    }
}
```

如果父组件与子组件之间不知一个层级，则可以用过`... 运算符`(Object 剩余和展开属性)，将父组件的信息，以更简洁的方式传递给更深层级的子组件。性能经过babel转义后与原生一直。

```JavaScript
 class Child_1 extends Component {
    render() {
        return <div>
            <p>{this.props.msg}</p>
            <Child_1_1 {...this.props}/>
            </div>
    }
 }
 
 class Child_1_1 extends Component {
    render() {
        return <p>{this.props.msg}</p>
    }
 }
```

#### 子组件向父组件通信
在子组件向父组件通讯时，同样也需要父组件向子组件传递props进行通讯，只是父组件传递的，是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数传递到父组件的作用域中。

```JavaScript
class Parent extends Component {
    state = {
        msg: 'start'
    };
    
    transferMsg(msg) {
        this.setState({
        msg});
    }
    
    render() {
        return <div>
            <p>child msg: {this.state.msg}</p>
            <Child_1 transferMsg = {msg => this.transferMsg(msg)} />
        </div>
    }
}

class Child_1 extends Component {
    componentDidMount() {
       setTimeout( () => {
            this.props.transferMsg('end')
       }, 1000); 
    }
    render() {
        return <div><p>child_1 component</p></div>
    }
}
```

#### 兄弟组件通讯
对于两个没有之间关联关系的节点，那么唯一的关联就是拥有想用的父组件。那么这个时候改两个节点的通讯，可以先用过Child_1想Parent组件通讯，再由Parent向Child_2组件通讯。

```JavaScript
class Parent extends Component {
    state = {
        msg: 'start'
    };
    
    transferMsg(msg) {
        this.setState({msg});
    }
    
    componentDidUpdate() {
        console.log('parent update');
    }
    
    render() {
        return (
            <div>
                <Child_1 transferMsg =  { msg => this.transferMsg(msg)} />
                <Child_2 msg = {this.state.msg} />
        );
    }
}
```
但是这样会出现一个问题，那就是由于Parent的state发生变化，会出发Parent及从属于Parent的子组件的生命周期，所以我们在控制台中可以看到，在各个组件中的componentDidUpdate方法都会被触发。那么更好的方法便是采用观察者模式（即 发布者-订阅者模式）。

```JavaScript
import eventProxy from '../eventProxy'

class Parent extends Component {
    render() {
        return (
            <div>
                <Child_1/>
                <Child_2/>
            </div>
        );
    }
}

class Child_1 extends Component {
    componentDidMount() {
        setTimeOut( () => {
            eventProxy.trigger('msg','end');
        }, 1000);
    }
}

class Child_2 extends Component {
    state = {
        msg: 'start'
    };
    
    componentDidMount() {
        eventProxy.on('msg', (msg) => {
            this.setState({msg});
        });
    }
    
    render() {
        return (
            <div>
            <p>child_2 component: {this.state.msg}</p>
            <Child_2_1/>
            </div>
        );
    }
}
```
我们来看看神奇的`eventProxy.js`

```JavaScript
'use strict';
const eventProxy = {
    onObj: {},
    oneObj: {},
    on: function(key, fn) {
        if(this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        
        this.onObj[key].push(fn);
    },
    one: function(key ,fn) {
        if(this.oneObj{key] === undefined) {
            this.oneObj[key] = [];
        }
        
        this.oneObj[key].push(fn);
    },
    off: function(key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger: function() {
        let key, args;
        if(arguments.length == 0) {
            return false;
        }
        key = arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));
        
        if(this.onObj[key] !== undefined && this.onObj[key].length > 0) {
            for( let i in this.onObj[key]) {
                this.onObj[key][i].apply(null, args);
            }
        }
        
        if(this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
            for( let i in this.oneObj[key] ) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }
};

export default eventProxy;
```

redux中的数据传递

```JavaScript
import {createStore} from 'redux';
/*
 *用reducer来制造一个store
 */
function reducer(state = {}, action) {
    switch(action.type) {
        case 'child_2':
            state.child_2 = action.data + 'child_2';
            return state;
        case 'child_2_1':
            state.child_2_1 = action.data + 'child_2_1';
            return state;
        default:
            return state;
    }
}

let store = createStore(reducer);

class Child_1 extends Component {
    componentDidMount() {
        setTimeout ( () => {
            store.dispatch({//发布事件
                type: 'child_2',//事件名称
                data: 'hello'//要传递的数据
            })
        }, 1000);
        
        setTimeout( () => {
            store.dispatch({//发布事件
                type: 'child_2_1',
                data: 'bye'
            })
        }, 2000);
    }
}

class Child_2 extends Component {
    componentDidMount() {
        store.subscribe( () => {//订阅事件
            let state = store.getState();
            
            if(state.hasOwnProperty('child_2')) {
                this.setState({
                    msg: state.child_2
                });
            }
        });
    }
}

class Child_2_1 extends Component {
    componentDidMount() {
        store.subscribe( () => {//订阅事件
            let state = store.getState();
            
            if( state.hasOwnProperty('child_2_1') ){
                this.setState({
                    msg: state.child_2_1
                });
            }
        });
    }
}
```

以上的代码都摘抄（其实就是抄自🙄）[淘宝前端博客——React 组件间通讯](http://taobaofed.org/blog/2016/11/17/react-components-communication/)；其实在写我自己的[demo](https://github.com/Neras/react-resume) 的时候就遇到过这个问题，在没有直接关联的节点之间传输数据，然后网上查找一番，最终也利用`事件的订阅-发布`搞定的，当时才知道redux这个东西，说实话，但是看得很迷茫，感觉有点绕，然后今天看到这篇文章，然后手抄了一遍代码😂过后，感觉其实就是这么回事。

下面是以前通过网络查找写的简陋的事件订阅-发布

```JavaScript
/*
 * 在写react中，遇到一个情况，就是在两个没有层级的组件之间传递数据
 * 在vue里面貌似有一个store这个全局的值，来存储
 * 或许在react中也可以使用一个全局变量来存值
 * 但是通过查询看到一个Signals模式
 * 下面就是一个简单的实现
 *
 * 其中存在一个事件列表_events
 * subscribe表示订阅，相当于往事件列表里面传递一个事件，其中回调函数可以穿多个
 * 然后再dispatch中来检测事件列表是否存在该事件，如果存在则依次执行在subscribe中传入的多个回调函数
 *
 * 以此可以来传递两个组件之间的值
 */
var EventEmitter = {
    _events: {},
    dispatch: function(event, data) {
        if (!this._events[event]) {
            return false;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    },
    subscribe: function(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }

        this._events[event].push(callback);
    }
}

var a = Object.create(EventEmitter);

a.subscribe('et', function(data) {
    console.log(data);
});

a.dispatch('et', 'hehe');
```

最后那几行是测试用的。在次做个记录吧（里面有些地方，比如`...`运算符还不是很理解，后面补充）。