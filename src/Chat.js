import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  state = {
    channelId: ""
  };
  getChannel = id => {
    this.setState({
      channelId: id
    });
  };
  // Render
  render() {
    return (
      <>
        <div id="wrap">
          <div id="leftGrid">
            <Sidebar history={this.props.history} channel={this.getChannel} />
          </div>
          <div>
            <Messages channelId={this.state.channelId} />
          </div>
        </div>
      </>
    );
  }
}

export default Chat;
