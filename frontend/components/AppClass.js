import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialGridPosition = [
  [1, 1], [2, 1], [3, 1],
  [1, 2], [2, 2], [3, 2],
  [1, 3], [2, 3], [3, 3]
]

const initialState = {
  gridPosition: initialGridPosition,
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super();
    this.state = { ...initialState }

  }

  getXY = (gridXY) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    return gridXY[this.state.index]
  }

  getXYMessage = (gridXYPosition) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    return `(${this.getXY(gridXYPosition)[0]}, ${this.getXY(gridXYPosition)[1]})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)

  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // 0: [1, 1], 1: [2, 1], 2: [3, 1],
    // 3: [1, 2], 4: [2, 2], 5: [3, 2],
    // 6: [1, 3], 7: [2, 3], 8: [3, 3]

    if (direction === 'left' && this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6) {
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1
      });
    } else if (direction === 'right' && this.state.index !== 2 && this.state.index !== 5 && this.state.index !== 8) {
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1
      });
    } else if (direction === 'up' && this.state.index !== 0 && this.state.index !== 1 && this.state.index !== 2) {
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps + 1
      });
    } else if (direction === 'down' && this.state.index !== 6 && this.state.index !== 7 && this.state.index !== 8) {
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    return this.getNextIndex(evt.target.id);
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.

    const { value } = evt.target
    this.setState({ ...this.state, email: value })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault();
    const payload = {
      "x": this.getXY(this.state.gridPosition)[0],
      "y": this.getXY(this.state.gridPosition)[1],
      "steps": this.state.steps,
      "email": this.state.email
    }
    axios.post(URL, payload)
      .then(res => {
        this.setState({ ...this.state, message: res.data.message })
      })
      .catch(err => {
        this.setState({ ...this.state, message: err.response.data.message })
      })
    this.setState({ ...this.state, email: '' })

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage(this.state.gridPosition)}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email" value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
