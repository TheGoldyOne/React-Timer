import React, { Component } from 'react';
import './Timer.css';

import { GoSync } from "react-icons/go";

interface PropsInterface {
	minutes: number;
}

interface StateInterface {
	minutes: number;
	seconds: number;
	play: boolean;
}

export default class Timer extends Component<PropsInterface, StateInterface> {
	constructor(props: PropsInterface) {
		super(props);

		this.state = {
			minutes: this.props.minutes,
			seconds: 0,
			play: false,
		};
	}

	audio = new Audio('http://waw01-01.ic.smcdn.pl:8000/3990-1.aac');

	togglePlay = () => {
		this.setState({ play: !this.state.play }, () => {
			this.state.play ? this.audio.play() : this.audio.pause();
		});
	};

	updateTime = () => {
		if (this.state.seconds === 0 && this.state.minutes > 0) {
			this.setState({
				minutes: this.state.minutes - 1,
				seconds: 59,
			});
		} else if (this.state.seconds > 0) {
			this.setState({
				seconds: this.state.seconds - 1,
			});
		} else {
			if (!this.state.play) {
				this.audio.volume = 0.2;
				this.audio.play();
				this.setState({ play: true });
			}
		}
	};

	resetTime = () => {
		this.audio.pause();
		this.setState({ play: false });
		this.setState({
			minutes: this.props.minutes,
			seconds: 0,
		});
	};

	componentDidMount() {
		setInterval(() => {
			this.updateTime();
		}, 1000);
	}



	render() {
		return (
			<div className="container">
				<div className="timer">
					<p id="time">
						{this.state.minutes}:{this.state.seconds}
					</p>
					<button onClick={this.resetTime}> <GoSync className="icon"/> RESET</button>
					{/* <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button> */}
				</div>
			</div>
		);
	}
}
