import React, { useState, Component } from 'react';
import RocketCore from './RocketCore';

const TEN_SECONDS_IN_MS = 10000; // In milliseconds

export function FunctionalRocket() {
  // Launch time is 10 seconds in past, so never launches
  const [initialLaunchTime] = useState(Date.now() - TEN_SECONDS_IN_MS);

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

export class ClassRocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Launch time is 10 seconds in past, so never launches
      initialLaunchTime: Date.now() - TEN_SECONDS_IN_MS
    };
  }

  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
