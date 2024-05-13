import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useReducer } from 'react';

// 1. import useReducer
// 2. reducer that alignts with initial State
const _reducer = (state, action) => {
  // switch statement
  switch (action.type) {
    case "INCREMENT":
      return { 
        count: state.count + 1, 
        toggleText: state.toggleText
      };
    // Think of this as Each Play to be executed
    case "DECREMENT":
      return { 
        count: state.count - 1, 
        toggleText: state.toggleText 
      };
    case "toggleText":
      return { 
        count: state.count, 
        toggleText: !state.toggleText };
    default:
      return state;
  }
};

const getRandomColor = () => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet'
  ];
  
  const randomIndex = Math.floor(Math.random()*colors.length);
  const randomColor = colors[randomIndex];

  return randomColor;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ONMOUSEOVER':
      return {...state, addGradient: true};
    case 'ONMOUSELEAVE':
      return {...state, addGradient: false};
    case 'ONCLICK':
      return {...state, style: {backgroundColor: getRandomColor()}};
    default:
      return state;
  }
}



//  basically on mouseover of blob element apply class gradient
function App() {
  const [state, dispatch] = useReducer(_reducer, {
    count: 0, 
    toggleText: true,
  });

  const [newState, newDispatch] = useReducer(reducer, {
    style: {
      backgroundColor: 'rgb(198, 198, 218)'
    }
  });
  
  //connects reducer function to the dispatch action

  const buttonContainerStyle = {
    border: 'solid black',
    margin: '1em'
  }

  return (
    <div className='by'>


<div className="blob-parent" onMouseLeave={()=> {newDispatch({type: 'ONMOUSELEAVE'})}}>
  <div 
    className={ newState.addGradient ? 'blob gradient' : 'blob' } 
    style={newState.style}
    onMouseOver={() => {newDispatch({type: 'ONMOUSEOVER'})}}
    onClick={() => {newDispatch({type: 'ONCLICK'})}}
  ></div>
</div>

    
            <div className='code-along'>
              
            <div>Current Count: {state.count}</div>
            <div>
              <button onClick={()=>{
                dispatch({type:"DECREMENT"})
              }}> - </button>
              <button onClick={()=>{
                dispatch({type:"INCREMENT"})
              }}> + </button>
            </div>
            <hr />
            <button onClick={()=>{
              dispatch({type: "toggleText"})
            }}>Hide</button>
            <div>{state.toggleText && <p> This Text is Visible</p>}</div>
            </div>
  </div>
  )
}

export default App
