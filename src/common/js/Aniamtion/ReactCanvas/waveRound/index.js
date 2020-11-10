import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
import init from "./init";
import blue from "./images/shadow-blue.png";
import green from "./images/shadow-green.png";
import orange from "./images/shadow-orange.png";
import purple from "./images/shadow-purple.png";
function WaveRound(props, ref) {

  let { className,type, name,data, id, width, height, ...other } = props;//type:blue,green,orange
	let CanvasRef = useRef();
	let ClearRef = useRef();

  useEffect(() => {
    let canvas = CanvasRef.current;

    let Re = ()=>{};

    try {
      Re = init(canvas,{type,text:data});
    } catch (e) {

    }
	ClearRef.current =Re

  }, [data,type]);

  return (
    <div
      ref={ref}
      className={`waveRound ${className ? className : ""}`}
      {...other}
    >
      <canvas
        ref={CanvasRef}
        width={width ? width : 114}
        height={height ? height : 130}
      >
        <img alt="green" src={green} id="green" />
        <img alt="blue" src={blue} id="blue" />
        <img alt="orange" src={orange} id="orange" />
        <img alt="purple" src={purple} id="purple" />
        
      </canvas>
      {name?<p className={"round-name"} title={name}>
        {name}
      </p>:''}
    </div>
  );
}
export default memo(forwardRef(WaveRound));
