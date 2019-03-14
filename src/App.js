import React, {
  Component
} from "react";
import "./App.css";
import {
  connect
} from "react-redux";
import Plot from 'react-plotly.js';
class App extends Component {

  componentDidMount() {
    this.interval = setInterval(this.fetchDrone, 4e3)
  }

  updateChart() {

  }

  fetchDrone = ()=> {
    this.props.onRequestDroneData()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const {
      droneData,
      error
    } = this.props;
    let options = {data:[]};
    if (droneData) {
      options = {
        data: [{
          x: droneData.map(function (e) {
            return new Date(e.timestamp)
          }),
          y: droneData.map(function (e) {
            return e.metric
          }),
          type: "lines"
        }]
      };
    }

    return ( 
      <div className = "App" >
                <header className="App-header">
        </header>
      { options.data.length >0 && <Plot
          data={options.data}
          layout={ { title: "Sample Drone Temperature",
          autosize: true
          } } 
        />}
        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    droneData: state.droneData,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDroneData: () => dispatch({
      type: "API_CALL_REQUEST"
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);