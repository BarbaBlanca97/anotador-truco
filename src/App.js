import React from 'react';
import './App.css';

import Counter from './counter';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      finished: false,
      winner: ''
    }

  }

  handleWin (winner) {
    this.setState({ finished: true, winner });
  }

  render () {
    return (
    <div
    className="app"
    >
      <h1> Anotador de truco </h1>
      <div
      className="board"
      >
        { this.state.finished ?
        <div
        className="finished-message"
        >
          <h3>{ `Ganador: ${ this.state.winner }` }</h3>
          <button
          className="restart-button"
          onClick={ () => { this.setState({ finished: false }) } }
          >
            Reiniciar
          </button>
        </div>
        :
        <>
          <Counter
          title="Nosotros"
          onWin={ () => { this.handleWin('Nosotros') } }
          />

          <Counter
          title="Ellos"
          onWin={ () => { this.handleWin('Ellos') } }
          />
        </>
        }
      </div>
      <div
      className="footer"
      >
        <span> @barbablanca97 - jere.chiosso@gmail.com.ar </span>
      </div>
    </div>
    );
  }
}

export default App;
