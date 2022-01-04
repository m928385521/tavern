<template>
	<view class="content">
		<view class="btn_grp">
			<button type="primary" size="default" @click="gotonext">匿名进入</button>
			<button type="primary" size="default" @click="getuserinfo">身份验证</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {},
		methods: {

			getuserinfo() {
				let _this = this
				uni.getUserProfile({
					desc: "需要你的信息",
					lang: "zh-CN",
					success(res) {
						console.log(res, "返回结果")
						store.commit('setNickName', res.userInfo.nickName)
						console.log(store.state.nickName, "store结果")
						_this.gotonext()
					}
				})
			},
			gotonext() {
				uni.navigateTo({
					url: '/pages/navigation/navigation',
					complete(res) {
						console.log(res)
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.btn_grp {
			button {
				margin: 100rpx;
				width: 200rpx;
				height: 200rpx;
				line-height: 200rpx;
				border-radius: 100rpx;
				box-shadow: 0px 0px 20px 0px #000;

			}
		}
	}
</style>
