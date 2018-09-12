import React, {Component} from 'react';
import logo from './logo.png';
import preview from './eye.png';
import edit from './edit.png';
import deleteLogo from './delete.png';
import './App.css';
import {Table} from 'reactstrap';


class App extends Component {
    state = {notes: []}

    componentDidMount() {
        fetch('/notes')
            .then(res => res.json())
            .then(notes => this.setState({notes}));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                <div className="App-nav">
                    <button class="button add"> Add PDF </button>
                </div>
                <div>
                    <br/>
                </div>

                <div className="tableFile">
                    <Table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>File Name</th>
                            <th>Uploaded Date</th>
                            <th>Modified Date</th>
                            <th colSpan="3">

                            </th>


                        </tr>
                        </thead>
                        <tbody>
                        {this.state.notes.map(note =>
                                <tr key={note._id}>
                                    <th scope="row"> </th>
                                    <td>{note.title}</td>
                                    <td>{note.content}</td>
                                    <td> uploaded date contents </td>
                                    <td> <img src={preview} className="preview" alt="preview"/> </td>

                                    <td>  <img src={edit} className="editButton" alt="edit"/> </td>
                                    <td> <img src={deleteLogo} className="deleteButton" alt="delete"/> </td>

                                </tr>




                            // <div>
                            // <h4>{note.title}</h4>
                            // {note.content}
                            // <hr></hr>
                            // </div>
                        )}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default App;
