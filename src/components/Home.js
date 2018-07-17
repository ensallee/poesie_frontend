import React, { Fragment } from 'react';

const Home = (props) => {
  return (
    <Fragment>
    <section class="hero">
      <div class="hero-inner">
        <h1>Poesie</h1>
        <button onClick={() => props.history.push("/write")}>Explore</button>
        </div>
    </section>
    </Fragment>
  )
}

export default Home;
