import React from 'react';
import PDF from 'react-pdf-js';

class MyPDFViewer extends React.Component {
  state = {};

  fileName = "./sample.pdf";

 

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  setFile = (PDFFileName) => {
    this.fileName = PDFFileName;
  }
  
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }
  
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <span className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></span>;
    if (page === 1) {
      previousButton = <span className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></span>;
    }
    let nextButton = <span className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></span>;
    if (page === pages) {
      nextButton = <span className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></span>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <nav>
        {pagination}
        </nav>
        <PDF
          file={this.fileName}
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    )
  }
}

export default MyPDFViewer;