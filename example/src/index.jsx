import React from 'react';
import Example1 from './examples/Example1';
import Example2 from './examples/Example2';
import Example3 from './examples/Example3';
import Example4 from './examples/Example4';
import Example5 from './examples/Example5';


const examples = [
  {
    title: 'Example 1', 
    description: 'A simple leaflet map with a marker', 
    component: Example1, 
    url: '' 
  },
  {
    title: 'Example 2', 
    description: 'A leaflet map with geojson features', 
    component: Example2, 
    url: '' 
  },
  {
    title: 'Example 3', 
    description: 'A choropleth map', 
    component: Example3, 
    url: '' 
  },
  {
    title: 'Example 4', 
    description: 'Layers Control', 
    component: Example4, 
    url: '' 
  },
  {
    title: 'Example 5', 
    description: 'Draw Control', 
    component: Example5, 
    url: '' 
  },
];

function ExampleSelector ({ items, select, selected }) {
  return (
    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
      {
        items.map((item, idx) => (
          <li key={idx} style={{display: 'inline', marginLeft: 10}}>
            {
              idx === selected ?
                <button onClick={() => select(idx)} style={{fontWeight: 'bold'}}>{item.title}</button>
                :
                  <button onClick={() => select(idx)}>{item.title}</button>
            }
          </li>
          ))
      }
      </ul>
  );
}

export default class Examples extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selected: 0,
    }
  }

  _select(idx) {
    if (!examples[idx]) return;
    this.setState({ selected: idx });
  }

  render() {
    const selected = examples[this.state.selected];
    const Component = selected.component;
    return (
      <div>
        <h1>Leaflet examples</h1>
        <ExampleSelector items={examples} select={this._select.bind(this)} selected={this.state.selected} />
        <hr />
        <div style={{ width: '15%', float: 'left', height: '80vh', padding: 10, borderRight: '1px #000 solid' }}>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <p><b>Code:</b> <a href={selected.url}>{selected.url}</a></p>
        </div>
        <div style={{ width: '80%', float: 'left', height: '80vh', padding: 10 }}> 
          <Component />
        </div>
      </div>
    );
  }
}
