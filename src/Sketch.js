import React from 'react'
import Sketch from 'react-p5'
import { useLocation } from 'react-router-dom';

const SketchCanvas = () => {
    const location = useLocation()
    const arr = location.state.arr.arr
    console.log(arr)

    let maxwaves = arr.length;
    let xspacing = 16; // 각 도형들 간의 가로 거리
    let w; // 전체 파형의 너비
    let theta = 0.0; // 시작 각도 0
    let amplitude = new Array(maxwaves); // 파형의 높이
    let dx = new Array(maxwaves); // x 증가값
    let yvalues; // 파형의 최고 높이를 저장하기 위한 배열
    
    function setup(p, canvasParentRef) {
      p.createCanvas(1000, 800).parent(canvasParentRef);
      w = p.width + 16;

      for(let i = 0; i < maxwaves; i++){
        amplitude[i] = arr[i].amplitude
        let period = arr[i].period
        dx[i] = (p.TWO_PI / period) * xspacing;
      }
      yvalues = new Array(p.floor(w / xspacing));
    }
    
    function draw(p) {
      p.background(0);
      calcWave(p);
      renderWave(p);
    }
    
    function calcWave(p) {
      // 세타값(theta) 증가 (다른 값을 넣어 각속도를 조정해보세요)
      theta += 0.05;
    
      for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = 0;
      }

        // 파형 높이값 축적하기s
      for (let j = 0; j < maxwaves; j++) {
        let x = theta;
        if(arr[j].status === '+'){
          for (let i = 0; i < yvalues.length; i++) {
            if (j % 2 === 0) yvalues[i] += p.sin(x) * amplitude[j];
            else yvalues[i] += p.cos(x) * amplitude[j];
            x += dx[j];
          }
        } 
        else if(arr[j].status === '-'){
          for (let i = 0; i < yvalues.length; i++) {
            if (j % 2 === 0) yvalues[i] += p.cos(x) * amplitude[j];
            else yvalues[i] -= p.sin(x) * amplitude[j];
            x += dx[j];
          }
        }
      }
    }
    
    function renderWave(p) {
      p.noStroke();
      p.fill(255);
      // 각 위치에 지정된 타원형으로 파형을 그릴 수 있는 간단한 방법
      for (let x = 0; x < yvalues.length; x++) {
        p.ellipse(x * xspacing, p.height / 2 + yvalues[x], 16, 16);
      }
    }
    return <Sketch setup={setup} draw={draw} />;
};

export default SketchCanvas