<template>
	<view class="content">
		<clock></clock>
		<view class="timeComponent">
			<view class="t-title">
				距离下班还有
			</view>
			<view class="t-time">
				<view class="t-time-num">
					{{hours}}
				</view>
				时
				<view class="t-time-num">
					{{minute}}
				</view>
				分
				<view class="t-time-num">
					{{second}}
				</view>
				秒
			</view>
		</view>
		<view class="setComponent">
			<view class="uni-title">{{dateInfo}}</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						设定下班时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" :value="workOffTime" start="00:00" end="23:59" @change="bindTimeChange">
							<view class="uni-input">{{workOffTime}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import clock from '../../components/clock.vue'
	import store from '@/store/index.js'
	export default {
		components: {
			clock
		},

		data() {
			return {
				countdownTime: "", // 倒计时显示的时间
				dateInfo: "", // 显示今天的日期内容
				hours: "00",
				minute: "00",
				second: "00",
				workOffTime: "18:00",
				workOffTimeToMillisecond: 0,
				timeIntervalId: 0
			};
		},
		created() {
			this.dateInfo = this.formateweek(new Date().getUTCDay())
			this.workOffTime = store.state.workOffTime || "18:00"
		},
		methods: {
			bindTimeChange: function(e) {
				this.workOffTime = e.detail.value
				store.commit('setWorkOffTime', this.workOffTime)
				
			},
			workOffTimeChange() {
				clearInterval(this.timeIntervalId)
				let time = new Date()
				let workOffTimeArray = this.workOffTime.split(":")
				time.setHours(workOffTimeArray[0])
				time.setMinutes(workOffTimeArray[1])
				time.setSeconds(0)
				this.workOffTimeToMillisecond = time.getTime() - new Date().getTime() > 0 ? time.getTime() - new Date()
					.getTime() : 0;
				this.startInterval()
			},
			workOffTimeToMillisecondChange() {
				this.hours = this.formate(Math.floor(this.workOffTimeToMillisecond / 1000 / 60 / 60 % 24))
				this.minute = this.formate(Math.floor(this.workOffTimeToMillisecond / 1000 / 60 % 60))
				this.second = this.formate(Math.floor(this.workOffTimeToMillisecond / 1000 % 60))
			},
			startInterval() {
				this.timeIntervalId = setInterval(() => {
					if (this.workOffTimeToMillisecond > 0) {

						this.workOffTimeToMillisecond -= 1000
					} else {
						clearInterval(this.timeIntervalId)
					}
				}, 1000)
			},
			formateweek(number) {
				let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				return "今天" + week[number]
			},
			formate(num) {
				if (num < 10) {
					return "0" + num
				} else {
					return num + ""
				}
			},
		},
		watch: {
			workOffTime: {
				handler: "workOffTimeChange",
				immediate: true
			},
			workOffTimeToMillisecond: {
				handler: "workOffTimeToMillisecondChange",
				immediate: true
			}
		},
		computed: {

		}

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		padding: 40rpx;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.timeComponent {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 80rpx;

			.t-title {
				font-size: 28rpx;
			}

			.t-time {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				.t-time-num {
					font-size: 52rpx;
				}
			}
		}
		.setComponent{
			display: flex;
			margin-top: 200rpx;
			flex-direction: column;
			align-items: center;
		}

	}
</style>
