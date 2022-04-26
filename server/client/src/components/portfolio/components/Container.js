import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  margin: 0 10%;
  padding: 0 1rem;
  h1 {
    display: inline-block;
    margin: 1rem 0;
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    line-height: 70px;
  }
  h4 {
    color: #425bb5;
    position: relative;
    margin: 1rem 0 1rem 40px;
    vertical-align: bottom;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    text-transform: capitalize;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    ::before {
      background: #425bb5;
      display: block;
      position: absolute;
      width: 30px;
      height: 2px;
      top: 13px;
      left: -40px;
      content: '';
    }
  }
`;
export default Container