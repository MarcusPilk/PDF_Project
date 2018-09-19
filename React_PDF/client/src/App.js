import React, { Component } from 'react';
import logo from './logo.png';
import preview from './eye.png';
import edit from './edit.png';
import deleteLogo from './delete.png';
import './App.css';
import { Table } from 'reactstrap';


class App extends Component {
    state = { files: [] };
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
                    <h1 className="App-title">PDF Viewer</h1>
                </header>
                <div className="App-intro">
                    <Table><thead><tr>
                        <th></th>
                        <th>PDF Name</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                    </tr></thead>
                        <tbody>
                        {this.state.files.map(file =>
                            <tr key={file._id}>
                                <th scope="row"></th>
                                <td><a href={'http://localhost:8000/file/' + file._id} target='_blank'>{file.filename}</a></td>
                                <td>{file.uploadDate}</td>
                                <td>
                                    <a href={'http://localhost:8000/file/' + file._id} target='_blank'><img src={preview} className="preview" alt="preview" /></a>
                                    <img src={edit} className="editButton" alt="edit"/>
                                    <img src={deleteLogo} className="deleteButton" alt="delete"/>

                                </td>
                            </tr>
                        )}
                        </tbody></Table>
                </div>
                <div className="App-content">
                    <form action="/upload" method="POST" encType="multipart/form-data">
                        <label for="file">Choose File</label>
                        <input type="file" name="file" id="file" className="custom-file-input"/>
                        <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </div>
    );
    }
    }

    export default App;
