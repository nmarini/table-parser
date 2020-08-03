import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './App.css';
import ReactHtmlParser from 'react-html-parser';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(
      'https://www.sec.gov/Archives/edgar/data/1020569/000102056920000029/R2.htm'
    )
      .then((res) => res.text())
      .then((res) => {
        setData(res);
      });
  }, []);

  function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  function exportTableToCSV(filename) {
    let csv = [];
    let rows = document.querySelectorAll('table tr');
    for (let i = 0; i < rows.length; i++) {
      let row = [],
        cols = rows[i].querySelectorAll('td, th');

      for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

      csv.push(row.join(','));
    }

    // Download CSV file
    downloadCSV(csv.join('\n'), filename);
  }

  return (
    <div 
    style={{textAlign: 'center', padding: 20}}
    >
      <h1>HTML Table to CSV</h1>
      <button style={{color: 'red', margin: 15}} onClick={() => exportTableToCSV('table.csv')}>Export HTML Table To CSV File</button>
      <br />
      {ReactHtmlParser(data)}
      {console.log(data)}
    </div>
  );
}

export default App;
