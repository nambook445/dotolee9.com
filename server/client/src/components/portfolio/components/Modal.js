import React from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  console.log(props);
  let VisibleProps = props.visible;
  return (
    <MyModal open={VisibleProps}>
      <div className="modal-container">
        <h2>마감일기</h2>
        <div className="close-button">
          <img
            src="static/icons/close.svg"
            alt="close"
            onClick={() => {
              props.onChangeState();
            }}
          />
        </div>
        <div className="modal-item">
          <div>
            <p>기능</p>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
          <img className="item-image" src="static/01.jpg" alt="" />
        </div>
        <div>
          기술스택
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </div>
        <div>
          <button>깃허브</button>
          <button>서비스</button>
        </div>
      </div>
    </MyModal>
  );
};

const MyModal = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: ${(props) => (props.open ? 'all 0.2s ease-in-out 0.2s' : null)};
  transform: ${(props) => (props.open ? 'translateY(-100%)' : null)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  z-index: ${(props) => (props.open ? 1050 : 0)};

  .modal-container {
    display: grid;
    position: relative;
    justify-items: center;
    align-items: center;
    background: #f3f3f3;
    border-radius: 5px;
    border: 2px solid #ddd;
    width: 80%;
    margin: 0 5rem;
    padding: 1rem;
    height: 100%;
    z-index: 1080;
  }
  .close-button {
    position: absolute;
    top: 1em;
    right: 1em;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .modal-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .item-image {
    width: 100%;
    height: 100%;
  }
`;

export default Modal;
