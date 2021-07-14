import React from 'react';
import axios from 'axios';
import './style.css';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="det">Detail No:{this.props.i + 1}</div>;
    <br />;
  }
}
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { viewFull: false };
  }

  render() {
    // if (!this.props.user) return null;
    return (
      <>
        {this.props.user.map((user, i) => (
          <div className="detail">
            {this.props.ind === i && (
              <div>
                <div
                  onMouseEnter={() =>
                    this.setState({ viewFull: !this.state.viewFull })
                  }
                  onMouseLeave={() =>
                    this.setState({ viewFull: !this.state.viewFull })
                  }
                >
                  {this.props.user[i].name}
                </div>
                <div />
                {this.state.viewFull && (
                  <div>
                    <div>Username:{this.props.user[i].username}</div>
                    <div>EMail:{this.props.user[i].email}</div>
                    <div>Website:{this.props.user[i].website}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { userArr: [], index: 1 };
  }
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.setState({ userArr: res.data }))
      .catch(err => err);
  }

  render() {
    return (
      <>
        <div className="gameinfo">
          <div className="container">
            <button
              className="left"
              onClick={() => {
                this.state.index > 0 &&
                  this.setState({ index: this.state.index - 1 });
              }}
            >
              LEFT
            </button>

            <button
              className="right"
              onClick={() => {
                this.state.index < this.state.userArr.length - 1 &&
                  this.setState({ index: this.state.index + 1 });
              }}
            >
              RIGHT
            </button>
            <div />
          </div>
          <div className="pass">
            <Show i={this.state.index} />
            <UserList user={this.state.userArr} ind={this.state.index} />
          </div>
        </div>
      </>
    );
  }
}

export default function App() {
  return <Game />;
}
