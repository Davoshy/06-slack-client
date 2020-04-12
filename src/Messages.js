import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";

class Content extends Component {
  // Data
  state = {
    newMessage: {
      text: "",
      file: null
    },
    messages: [],
    channelId: "5e574be79a119e2a7a166e2a"
  };
  // Lifecycle
  componentWillMount() {
    let token = localStorage.getItem("token");
    let head = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get(`${process.env.REACT_APP_API}/messages`, head).then(res => {
      this.setState({ messages: res.data });
    });
  }
  componentWillReceiveProps(props) {
    let channel = props.channelId;
    let token = localStorage.getItem("token");
    let head = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    this.setState({ channelId: channel }, () =>
      axios
        .get(
          `${process.env.REACT_APP_API}/messages?channel=${this.state.channelId}`,
          head
        )
        .then(res => {
          this.setState({ messages: res.data });
          let element = document.querySelector("#content");
          element.scrollTop = element.scrollHeight;
        })
    );
  }
  // Methods
  changeText = e => {
    let newMessage = this.state.newMessage;
    newMessage.text = e.target.value;
    this.setState({ newMessage });
  };
  createMessage = e => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let data = new FormData();
    data.append("file", this.state.newMessage.file);
    data.append("channel", this.state.channelId);
    data.append("text", this.state.newMessage.text);
    console.log(this.state.newMessage);
    // let body = {
    //   user: "",
    //   channel: this.state.channelId,
    //   text: this.state.newMessage.text,
    // };
    axios
      .post(`${process.env.REACT_APP_API}/messages`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let messages = this.state.messages;
        messages.push(response.data);
        this.setState({
          messages: messages,
          newMessage: {
            text: ""
          }
        });
        let element = document.querySelector("#content");
        element.scrollTop = element.scrollHeight;
      });
  };
  addFile = e => {
    let filedata = e.target.files[0];
    let newMessage = this.state.newMessage;
    newMessage.file = filedata;
    this.setState({
      newMessage: newMessage
    });
  };
  // Render
  render() {
    return (
      <div id="messages">
        <div id="content">
          {this.state.messages.map(message => {
            return (
              <div className="message" key={message._id}>
                <span className="user">{message.user.name}</span>
                <span className="date">{message.date}</span>
                <div className="body">{message.text}</div>
                <img src={message.file} />
              </div>
            );
          })}
        </div>
        <div id="new-message">
          <form
            id="inputMessage"
            onSubmit={e => {
              this.createMessage(e);
            }}
          >
            <input type="file" name="file" onChange={this.addFile} />
            <input
              type="text"
              placeholder="New Message..."
              value={this.state.newMessage.text}
              onChange={e => this.changeText(e)}
            />
            <button type="submit" className="positive">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Content;
