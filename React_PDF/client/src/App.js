import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import MyPDFViewer from './MyPDFViewer';

class App extends Component {
  state = { notes: [] }
  componentDidMount(){
    fetch('/notes')
    .then( res => res.json())
    .then( notes => this.setState({notes}));
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
          {this.state.notes.map(note =>
            <tr key={note._id}><th scope="row"></th>
            <td>{note.title}</td>
            <td>{note.content}</td></tr>

            // <div>
            // <h4>{note.title}</h4>
            // {note.content}
            // <hr></hr>
            // </div>
          )}
          </tbody></Table>

          </div>
        
          <button id="myBtn">Open Sample.pdf</button>

          <div id="myModal" class="modal">

            <div class="modal-content">
              <span class="close">&times;</span>
              <MyPDFViewer />
            </div>

          </div>  
         
        </div>
    );
  }
}

export default App;
