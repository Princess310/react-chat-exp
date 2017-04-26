/**
*
* Grid: try to debug for UI things
*
*/

import React from 'react';
import Gtx from '../../utils/gtx';
// import styled from 'styled-components';

class Grid extends React.Component {
  destoryGrid = () => {
    this.system.style.display = 'none';
  }

  drawGrid = () => {
    this.system.style.display = 'block';

    const unitWidth = 8;
    const unitHeight = 8;
    const gtx = new Gtx(this.canvas);

    gtx.fitParent();

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    gtx.setStrokeStyle('#ddd');
    gtx.lineWidth(1);
    for (let i = 0; i * unitWidth < width; i += 1) {
      gtx.beginPath();
      gtx.moveTo((i + 1) * unitWidth, 0);
      gtx.lineTo((i + 1) * unitWidth, height);
      gtx.stroke();
    }

    for (let i = 0; i * unitHeight < height; i += 1) {
      gtx.beginPath();
      gtx.moveTo(0, (i + 1) * unitHeight);
      gtx.lineTo(width, (i + 1) * unitHeight);
      gtx.stroke();
    }
  }

  render() {
    return (
      <div className="grid-system">
        <div className="grid-canvas" style={{ display: 'none' }} ref={(r) => (this.system = r)}>
          <canvas ref={(r) => (this.canvas = r)} onClick={this.destoryGrid}></canvas>
        </div>
        <i className="toggle-grid mdi mdi-grid" onClick={this.drawGrid}></i>
        <span className="toggle-grid-des">V1.0.0 - SnapShot</span>
      </div>
    );
  }
}

export default Grid;
