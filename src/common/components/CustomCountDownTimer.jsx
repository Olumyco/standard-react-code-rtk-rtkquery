import React, { Component } from 'react';

class CountDownTimer extends Component {
    
    state = {
        min: '00',
        sec: '00',
        timerIndicatorDeg: 0,
        timerIndicatorColor: '' 
    }

    getMobileByWidth = () => {
        const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        this.setState({
            isMobile: width <= 767
        });
    };

    createStyle = () => {
        const styleElement = document.createElement('style');

        const pseudoStyles = document.createTextNode(`
            .custom__timer__circle__indicator {
                width: 88px;
            }

            .custom__timer__circle__indicator .outer__circle {
                border-radius: 50%;
                padding: 6px;
                background: conic-gradient(#E1E6ED 0deg, #0275D8 0);
            }
            
            .custom__timer__circle__indicator .outer__circle .inner__circle {
                border-radius: 50%;
                background: #fff;
                padding: ${!this.state.isMobile ? '26px 20px' : '16px 10px'};
            }
            
            .on {
                color: #0275D8;
                font-weight: 600;
            }
            
            .off {
                color: #DC4437;
                font-weight: 600;
            }
        `);

        styleElement.appendChild(pseudoStyles);

        document.getElementsByTagName('head')[0].appendChild(styleElement);
    };

    timer = () => {
        const validityPeriodMins = +this.props.validityPeriodMinutes;
        const tickNum = 360 / (validityPeriodMins * 60);
        let timerIndicatorDeg = 0;
        let _360deg = 0;
        
        const endDate = new Date(+new Date() + (validityPeriodMins * 60 * 1000));
        
        window._countDownTimer = setInterval(() => {
            let currentDate = new Date();
            let difference = +endDate - +currentDate;
            let min = Math.floor((difference / 1000 / 60) % 60);
            let sec = Math.ceil((difference / 1000) % 60);
            
            if (min < 0) {
                sec = 0;
                min = 0;

                _360deg = 360;
                clearInterval(_countDownTimer);
                this.props.onComplete && this.props.onComplete();
            }

            if (sec === 60) {
                sec = 0;
                min++;
            }
            
            timerIndicatorDeg += _360deg || tickNum;

            this.setState(prevState => ({  
                ...prevState,
                min: min < 10 ? '0' + min : '' + min, 
                sec: sec < 10 ? '0' + sec : '' + sec,
                timerIndicatorDeg: timerIndicatorDeg,
                timerIndicatorColor: min === 0 ? '#DC4437' : '#0275D8'
            }));

        }, 1000);
    };

    componentDidMount() {
        this.getMobileByWidth();
        this.createStyle();
        this.timer();
    }

    componentWillUnmount() {
        clearInterval(window._countDownTimer);
    }

    render() {
        const { min, sec, timerIndicatorDeg, timerIndicatorColor } = this.state;
    
        return (
            <section>
                <section className="custom__timer__circle__indicator">
                    <section className="outer__circle" style={{background: `conic-gradient(#E1E6ED ${timerIndicatorDeg}deg, ${timerIndicatorColor} 0)`}}>
                        <section className="inner__circle">
                           <section className={timerIndicatorColor === '#DC4437' ? 'off' : 'on'}>{`${min}:${sec}`}</section>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}

export default CountDownTimer;