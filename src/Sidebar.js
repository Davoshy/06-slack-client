import React, { Component } from "react";
import "./styles/Sidebar.css";
import axios from "axios";
class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    channels: []
  };
  // Lifecycle
  componentWillMount() {
    let token = localStorage.getItem("token");
    let head = { headers: { Authorization: `Bearer ${token}` } };
    axios.get(`${process.env.REACT_APP_API}/channels`, head).then(response => {
      response.data[0].active = true;
      this.setState({
        channels: response.data
      });
    });
  }
  // Methods
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  selectChannel = id => {
    let allChannels = this.state.channels;
    allChannels.map(channel => {
      return (channel.active = false);
    });
    let selected = allChannels.find(channel => {
      return channel._id == id;
    });
    selected.active = true;
    this.setState(
      {
        channels: allChannels
      },
      () => this.props.channel(id)
    );
  };
  // Render
  render() {
    return (
      <div id="sidebar">
        <h2>{this.state.workspace}</h2>
        <ul className="list-unstyled">
          {this.state.channels.map(channel => {
            return (
              <li
                key={channel._id}
                className={channel.active ? "active" : ""}
                onClick={() => this.selectChannel(channel._id)}
              >
                # {channel.name}
              </li>
            );
          })}
        </ul>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Sidebar;
