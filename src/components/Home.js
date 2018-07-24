import React, { Fragment } from 'react';

const Home = (props) => {
  return (
    <Fragment>
    <section className="hero">
      <div className="hero-inner">
        <h1>Poesie</h1>
        <button className="hero-button" onClick={() => props.history.push("/write")}>Explore</button>
        </div>
    </section>
    </Fragment>
  )
}

export default Home;
