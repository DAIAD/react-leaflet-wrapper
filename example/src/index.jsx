import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Example1 from './examples/Example1';
import Example2 from './examples/Example2';
import Example3 from './examples/Example3';
import Example4 from './examples/Example4';
import Example5 from './examples/Example5';


const examples = [
  {
    path: '/example-1',
    title: 'Example 1', 
    description: 'A simple leaflet map with a marker', 
    component: Example1, 
    url: '' 
  },
  {
    path: '/example-2',
    title: 'Example 2', 
    description: 'A leaflet map with geojson features', 
    component: Example2, 
    url: '' 
  },
  {
    path: '/example-3',
    title: 'Example 3', 
    description: 'A choropleth map', 
    component: Example3, 
    url: '' 
  },
  {
    path: '/example-4',
    title: 'Example 4', 
    description: 'Layers Control', 
    component: Example4, 
    url: '' 
  },
  {
    path: '/example-5',
    title: 'Example 5', 
    description: 'Draw Control', 
    component: Example5, 
    url: '' 
  },
];

function ExampleSelector ({ items }) {
  return (
    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
      {
        items.map((item, idx) => (
          <li key={idx} style={{display: 'inline', marginLeft: 10}}>
            <Link to={item.path}><b>{item.title}</b></Link>
          </li>
          ))
      }
    </ul>
  );
}

export default class Examples extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    const selected = examples.find(ex => ex.path === window.location.pathname) || examples[0];
    return (
      <div>
        <h1>Examples</h1>
        <p>
          The following replicate some examples from Leaflet's page. <br />
          Check <a href="http://leafletjs.com/examples.html">http://leafletjs.com/examples.html</a>
        </p>
        <ExampleSelector items={examples} />
        <hr />
        <div style={{ width: '80%', margin: '0 auto' }}>
          <h2>{selected && selected.title}</h2>
          <p>{selected && selected.description}</p>
          <Switch>
            <Route exact path="/" component={Example1} />
            {
              examples.map(ex => (
                <Route 
                  key={ex.path} 
                  path={ex.path} 
                  component={ex.component} 
                  title={ex.title}
                  description={ex.description}
                />
                ))
            }
          </Switch> 
        </div>
      </div>
    );
  }
}
