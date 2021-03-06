import React from 'react';
import './styles.css'

class Counter extends React.Component {
    
    constructor (props) {
        super(props);

        this.state = {
            points: 0
        }

        this.stage      = 'Malas';
        this.lineLength = 90;
        this.offsetX    = 5;
        this.offsetY    = 7;
        this.box        = 0;

        this.mask = [
            { 
                x1: 0, y1: 0, 
                x2: this.lineLength, y2: 0 
            },
            { 
                x1: 0, y1: 0, 
                x2: 0, y2: this.lineLength 
            },
            { 
                x1: 0, y1: this.lineLength, 
                x2: this.lineLength, y2: this.lineLength 
            },
            { 
                x1: this.lineLength, y1: 0, 
                x2: this.lineLength, y2: this.lineLength 
            },
            { 
                x1: 0, y1: 0, 
                x2: this.lineLength, y2: this.lineLength }
        ];

        this.renderLine     = this.renderLine.bind(this);
        this.renderLines    = this.renderLines.bind(this);
        this.addPoint       = this.addPoint.bind(this);
        this.subtractPoint  = this.subtractPoint.bind(this);
    }

    addPoint () {
        this.setState(state => {
            if (this.stage === 'Buenas' && state.points === 15) return null;

            let nextPoints = state.points + 1;

            if(nextPoints === 16) {
                this.stage = 'Buenas';
                nextPoints = 1;
            }   

            if (nextPoints === 15 && this.stage === 'Buenas') setTimeout(this.props.onWin, 200);

            return { points: nextPoints }
        });
    }

    subtractPoint () {
        this.setState(state => {
            if (this.stage === 'Malas' && state.points === 0) return null;

            let nextPoints = state.points - 1;

            if (nextPoints === 0 && this.stage === 'Buenas') {
                this.stage = 'Malas';
                nextPoints = 15;
            }

            return { points: nextPoints }
        });
    }

    renderLines () {
        const lines = [];
        let box = 0;
        for (let i = 0; i < this.state.points; i++) {
            if (i / 5 === ( 1 + box )) ++box;
            lines.push(this.renderLine(this.mask[i % 5], box, i));
        }

        return lines;
    }

    renderLine ({ x1, y1, x2, y2 }, box, key) {
        return <line 
        x1={ x1 + this.offsetX } 
        y1={ y1 + this.offsetY + (box * (this.offsetY + this.lineLength)) } 
        
        x2={ x2 + this.offsetX } 
        y2={ y2 + this.offsetY + (box * (this.offsetY + this.lineLength)) } 
        
        key={ key }
        stroke="#000000" 
        strokeWidth="5"
        strokeLinecap="round"
        />
    }


    render () {
        const stageIndicatorColorStyle = { color: this.stage === 'Buenas' ? '#4287f5' : '#d92c16' }

        return (
            <div
            className="counter-body"
            >
                <h2>{ this.props.title }</h2>
                <h3 
                style={ stageIndicatorColorStyle } 
                >{ this.stage }</h3>
                <svg
                className="svg-canvas"
                viewBox="0 0 100 300"
                width="100px" 
                height="300px"
                >
                    { this.renderLines() }
                </svg>
                <div
                className="counter-buttons-container">
                    <button 
                    className="counter-button"
                    onClick={ this.addPoint }
                    > + </button>
                    <button 
                    className="counter-button"
                    onClick={ this.subtractPoint }
                    > - </button>
                </div>
            </div>
        );
    }
}

export default Counter;