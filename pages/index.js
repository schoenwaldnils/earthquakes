import React, { PureComponent } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Graph from '../app/components/Graph/Graph';
import '../app/css/index.css';

class Page extends PureComponent {
  constructor() {
    super();
    this.state = {
      minmagnitude: 6,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ minmagnitude: selectedOption.value });
  }

  render() {
    const { minmagnitude } = this.state;
    const options = [
      { value: 6, label: 'Magnitude >= 6' },
      { value: 7, label: 'Magnitude >= 7' },
      { value: 8, label: 'Magnitude >= 8' },
      { value: 9, label: 'Magnitude >= 9' },
    ];

    return (
      <div className="Page">
        <h1>Erdbeben pro Jahr Weltweit</h1>
        <label className="Input-label">
          {'Wähle Stärke: '}
          <Select className="Input-select" onChange={this.handleChange} options={options} value={minmagnitude} />
        </label>
        <Graph minmagnitude={minmagnitude} />
      </div>
    );
  }
}
export default Page;
