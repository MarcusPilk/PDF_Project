import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from 'reactstrap';


class App extends Component {
  state = { files: [] }
  componentDidMount(){
    fetch('http://localhost:8000/')
    .then( res => res.json())
    .then( files => this.setState({files}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notes</h1>
        </header>
        <div className="App-intro">
        <Table><thead><tr><th></th><th>Title</th><th>Contents</th></tr></thead>
        <tbody>
          {this.state.files.map(file =>
            <tr key={file._id}><th scope="row"></th>
            <td>{file.filename}</td>
            <td>{file.uploadDate}</td></tr>
          )}
          </tbody></Table>
        </div>
      </div>
    );
  }
}

export default App;
