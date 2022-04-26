import React, { Fragment } from 'react';
import Header from '../components/portfolio/Header';
import LandingPage from '../components/portfolio/LandingPage';
import About from '../components/portfolio/About';
import Experience from '../components/portfolio/Experience';
import Project from '../components/portfolio/Project';
import Contact from '../components/portfolio/Contact';

export default function Portfolio() {
  return (
    <Fragment>
      <Header />
      <LandingPage />
      <About />
      <Experience />
      <Project />
      <Contact />
    </Fragment>
  );
}
