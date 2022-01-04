<template name="clock">
	<view class="clock_box">
		<view class="clock_border">
			<view class="clock_dial">
				<view class="scale scale_one"></view>
				<view class="scale scale_two"></view>
				<view class="scale scale_three"></view>
				<view class="scale scale_four"></view>
			</view>
			<view class="clock_mask">
				<view class="clock_pointer pointer_hours" :style="hoursStyle"></view>
				<view class="clock_pointer pointer_minute" :style="minuteStyle"></view>
				<view class="clock_pointer pointer_second" :style="secondStyle"></view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "clock",
		data() {
			return {
				hoursAge: 0,
				minuteAge: 0,
				secondAge: 0,
				// hoursStyle: `transform: rotate(0deg);`,
				// minuteStyle: `transform: rotate(0deg);`,
				// secondStyle: `transform: rotate(0deg);`,
				nowTime: "",
				intervarId: 0
			};
		},
		created() {
			this.intervarId = setInterval(() => {
				this.nowTime = new Date().toLocaleTimeString('chinese', {
					hour12: false
				})
			}, 1000)
			this.initClockData()
		},
		methods: {
			initClockData() {
				this.hoursAge = new Date().getHours() / 12 * 360 + new Date().getMinutes() / 2 + 90;
				this.minuteAge = new Date().getMinutes() / 60 * 360 + new Date().getSeconds() / 10 + 90;
				this.secondAge = new Date().getSeconds() / 60 * 360 + 90;
				// this.hoursStyle = `transform: rotate(${this.hoursAge}deg);`
				// this.minuteStyle = `transform: rotate(${this.minuteAge}deg);`
				// this.secondStyle = `transform: rotate(${this.secondAge}deg);`
			},
			timeChange() {
				this.secondAge += 6
			}
		},
		watch: {
			nowTime: {
				handler: 'timeChange',
				immediate: true
			}
		},
		computed:{
			hoursStyle(){return `transform: rotate(${this.hoursAge}deg);`},
			minuteStyle(){return `transform: rotate(${this.minuteAge}deg);`},
			secondStyle(){return `transform: rotate(${this.secondAge}deg);`}
		},
		destroyed() {
			clearInterval(intervarId)
		}
	}
</script>

<style>
	.clock_box {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 10px;
	}

	.clock_border {
		position: relative;
		width: 10rem;
		height: 10rem;
		border: 7px solid #fff;
		box-shadow: -4px -4px 10px rgba(67, 67, 67, 0.5),
			inset 4px 4px 10px rgba(0, 0, 0, 0.5),
			inset -4px -4px 10px rgba(67, 67, 67, 0.5),
			4px 4px 10px rgba(0, 0, 0, 0.3);
		border-radius: 50%;
	}

	.clock_dial {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 100%;
		background: #282828;
	}

	.clock_dial::after {
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.clock_dial::before,
	.clock_dial::after,
	.clock_dial .scale {
		position: absolute;
		content: "";
		width: 3px;
		height: 100%;
		background: #1dcaf5;
		z-index: 0;
		left: 49%;
	}

	.clock_dial .scale {
		width: 1px;
		background: white;
	}

	.clock_dial .scale_one {
		-webkit-transform: rotate(30deg);
		-moz-transform: rotate(30deg);
		transform: rotate(30deg);
	}

	.clock_dial .scale_two {
		-webkit-transform: rotate(60deg);
		-moz-transform: rotate(60deg);
		transform: rotate(60deg);
	}

	.clock_dial .scale_three {
		-webkit-transform: rotate(120deg);
		-moz-transform: rotate(120deg);
		transform: rotate(120deg);
	}

	.clock_dial .scale_four {
		-webkit-transform: rotate(150deg);
		-moz-transform: rotate(150deg);
		transform: rotate(150deg);
	}

	.clock_mask {
		position: absolute;
		width: 80%;
		height: 80%;
		left: 10%;
		top: 10%;
		border-radius: 100%;
		background: #282828;
		z-index: 1;
	}

	.clock_mask::before {
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		left: 50%;
		top: 50%;
		margin-top: -4px;
		margin-left: -4px;
		border-radius: 100%;
		background: #4b4b63;
		z-index: 11;
	}

	.clock_pointer {
		position: absolute;
		top: 50%;
		right: 50%;
		width: 50%;
		height: 3px;
		background: #61afff;
		border-radius: 2px;
		transform-origin: 100%;
		transform: rotate(90deg);
		transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
	}

	.pointer_hours {
		width: 30%;
		z-index: 3;
	}

	.pointer_minute {
		width: 40%;
		height: 2px;
		z-index: 2
	}

	.pointer_second {
		height: 1px;
		width: 45%;
		z-index: 1;
		background: yellow;
	}
</style>
