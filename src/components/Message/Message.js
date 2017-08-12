/**
 * Created by zylee on 2017/3/13.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import MessageItem from './MessageItem'
import './message.less'

let seed = 0;
const now = Date.now();


function getUuid() {
    return `message_${now}_${seed++}`;
}

class Message extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.state = {
            messages: [],
        }
    }

    add(messageProps) {
        const key = messageProps.key = messageProps.key || getUuid();

        this.setState((previousState) => {
            const messages = previousState.messages;

            if (!messages.filter(message => message.key === key).length) {
                return {
                    messages: messages.concat(messageProps)
                }
            }
        });
    }

    remove(key) {

        this.setState(previousState => {

            return {
                messages: previousState.messages.filter(message => message.key !== key),
            };
        });
    }

    render() {
        let {children, prefixCls}=this.props;
        let {messages}=this.state;
        let transtion = {
            transitionName:'message',
            transitionEnterTimeout:300,
            transitionLeaveTimeout:300,
        };
        const messageNodes = messages.map((message) => {
            const onClose = () => {
                this.remove(message.key);
                message.onClose && message.onClose();
            };

            return (
                <MessageItem prefixCls={prefixCls}  {...message} onClose={onClose}>
                    {message.content}
                </MessageItem>
            )
        });
        return (
            <div className={`${prefixCls}`}>
                <ReactCSSTransitionGroup
                    {...transtion}
                >
                    {messageNodes}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}


Message.newInstance = function (properties) {
    const {getContainer, ...props}=properties || {}
    let div;

    /**
     * 可渲染到已存在的dom，getContainer
     */
    if (getContainer) {
        div = getContainer();
    } else {
        div = document.createElement('div');
        document.body.appendChild(div);
    }
    const message = ReactDOM.render(<Message {...props}/>, div)
    return {
        create(messageProps){
            message.add(messageProps)
        },
        removeMessage(key){
            message.remove(key);
        },
        component: message,
        destroy(){
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
};

Message.defaultProps = {
    prefixCls: 'message'
};

export default Message
