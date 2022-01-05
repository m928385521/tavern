<template>
	<view class="content">
		<view class="option">
			<button class="opt_item" hover-class="btn-hover" type="default" size="default" v-for="item in itemList"
				:key="item.id" @click="handlerGoPage(item.url)">
				{{item.text}}
			</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				nickName: "",
				itemList: [{
						id: 1,
						text: "还有多久下班？",
						url: "/pages/countdown/countdown"
					},
					{
						id: 2,
						text: "打飞机",
						url: "/pages/planeGame/planeGame"
					}, {
						id: 3,
						text: "书店地图",
						url: ""
					}, {
						id: 4,
						text: "待开发。。。",
						url: ""
					}
				],
				messageAry: ["功能待开发。。。", "说了没做完呢。。。", "别点了。。。", "你慢慢点吧。"]
			}
		},
		onLoad() {
			this.nickName = store.state.nickName
			if(this.nickName){
				uni.showToast({
					title:`欢迎${this.nickName}`,
					duration:2000,
					icon:"none"
				})
			}
		},
		methods: {
			handlerGoPage(url) {
				if (url == "") {
					if (this.messageAry.length > 0) {

						uni.showToast({
							title: this.messageAry[0],
							duration: 2000,
							icon: "none"
						})
						this.messageAry.shift()
					}
				} else {

					uni.navigateTo({
						url: url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {

		display: flex;
		padding: 50rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.opt_item {
			width: 80vw;
			height: 80rpx;
			margin: 40rpx;
			font-size: inherit;
			font-weight: bold;
			color: rgb(27, 28, 29);
			background: linear-gradient(rgb(255, 255, 255), rgb(237, 237, 237));
			box-shadow: 5rpx 5rpx 5rpx 0px #8288A0;
			border-radius: 10rpx;
		}

		.btn-hover {
			background: linear-gradient(rgb(237, 237, 237), rgb(255, 255, 255));
		}

	}
</style>
