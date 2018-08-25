import React from 'react';

import config from '../data/minion-config'; // Temp var in order to get content on the page.

function WorldView(props) {
  return (
    <section className="world__content">
      { config.storyline.events.intro }
    </section>
  );
}

export default WorldView;
