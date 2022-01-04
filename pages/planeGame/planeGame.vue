<template>
	<view class="content">

		<view class="chooseBox" v-show="showFlg==0">
			<view class="chooseBtn" v-for="item in levelAry" :key="item.id"
				@click="setDifficulty(item.bulletSpeed,item.planeSpeed)">{{item.title}}</view>
		</view>
		<view class="game-box" v-show="showFlg==1">
			<!-- <view class="scoreBoard">{{score}}</view>
		<image v-show="{{myPlaneInfo.showFlg}}" :style="myPlaneStyle" src="../../static/planeGame/plane.png" alt="" />
		<view v-for="item in planeList" :key="key">
			<image style=""
				src="../../static/planeGame/enemy.png"></image>
		</view>
		<view v-for="item in bulletList" :key="key">
			<image style="position: absolute; top:{{item.top}}px;left:{{item.left}}px;width: 6px;height: 22px;"
				src="../../static/planeGame/bullet.png"></image>
		</view>
		<view v-for="item in boomList" :key="key">
			<image v-show="{{item.type == 1}}"
				style="position: absolute; top:{{item.top}}px;left:{{item.left}}px;width: 23px;height: 30px;"
				src="../../images/airplaneGame/boom1.png"></image>
			<image v-show="{{item.type == 2}}"
				style="position: absolute; top:{{item.top}}px;left:{{item.left}}px;width: 60px;height: 36px;"
				src="../../images/airplaneGame/boom2.png"></image>
		</view> -->
			<canvas style="width: 100vw; height: 100vh;" canvas-id="myCanvas" id="firstCanvas" disable-scroll="false"
				@touchstart="touchStart" @touchmove="touchMove"></canvas>
			<view v-if="overFlg === true" class="overBoard">
				<text class="title">游戏结束</text>
				<text>最终得分：{{score}}</text>
				<button @click="gameAgain">再来一次</button>
			</view>
		</view>
	</view>
</template>

<script>
	let canvas = null
	export default {
		data() {
			return {
				showFlg: 0, // 游戏界面显示 0 选择难度  1 canvas游戏界面
				score: 0, // 分数
				overFlg: false, // 游戏结束标志
				// 游戏难度数据
				levelAry: [{
						id: 0,
						title: "简单",
						bulletSpeed: 100,
						planeSpeed: 400
					},
					{
						id: 1,
						title: "中等",
						bulletSpeed: 200,
						planeSpeed: 300
					},
					{
						id: 2,
						title: "困难",
						bulletSpeed: 300,
						planeSpeed: 200
					},
					{
						id: 3,
						title: "地狱",
						bulletSpeed: 400,
						planeSpeed: 100
					},
					{
						id: 4,
						title: "神降",
						bulletSpeed: 20,
						planeSpeed: 40
					}
				],
				// 我方飞机数据
				myPlaneInfo: {
					x: 0,
					y: 0,
					showFlg: true
				},
				// 敌方飞机数据
				planeList: [],
				windowWidth: 0, // 窗口宽度
				windowHeight: 0, // 窗口高度
				bulletList: [], // 子弹数据
				boomList: [], // 爆炸图数据
				gameTimer: 0, // 游戏计时器
				bulletTimer: 0, // 子弹生成计时器
				planeTimer: 0, // 敌方飞机生成计时器
			};
		},
		onReady() {


			canvas = uni.createCanvasContext("myCanvas", this)
			let _this = this
			uni.getSystemInfo({

				success(res) {
					console.log(res)
					// canvas.beginPath()
					_this.myPlaneInfo.x = res.windowWidth / 2 - 30
					_this.myPlaneInfo.y = res.windowHeight - 60
					_this.windowWidth = res.windowWidth
					_this.windowHeight = res.windowHeight

				}
			})

		},
		methods: {
			// 设置游戏难度
			setDifficulty(bulletSpeed, planeSpeed) {
				this.showFlg = 1
				this.gameTimer = setInterval(() => {
					this.gameBegin()
				}, 17)
				this.bulletTimer = setInterval(() => {
					this.createBullet()
				}, bulletSpeed)
				this.planeTimer = setInterval(() => {
					this.createPlane()
				}, planeSpeed)
			},
			// 触屏拖动事件
			touchMove(e) {
				this.setMyPlanePosition(e)
			},
			// 触屏开始事件
			touchStart(e) {
				this.setMyPlanePosition(e)
			},
			// 设置我方飞机的位置
			setMyPlanePosition(e) {
				this.myPlaneInfo.x = (e.touches[0].x || e.touches[0].pageX) - 30
				this.myPlaneInfo.y = (e.touches[0].y || e.touches[0].pageY) - 18

			},
			// 再来一次按钮
			gameAgain() {
				this.overFlg = false
			},
			// 开始游戏
			gameBegin() {
				canvas.drawImage('/static/planeGame/plane.png', this.myPlaneInfo.x, this.myPlaneInfo.y, 60, 36)

				this.draw()

				// canvas.beginPath()
				// canvas.setFillStyle('#007AFF')
				// canvas.arc(this.myPlaneInfo.x, this.myPlaneInfo.y, 20, 0, 2 * Math.PI)
				// canvas.fill()
				canvas.draw()
			},
			// 绘制图形
			draw() {
				this.bulletList = this.bulletList.map((e) => {
					if (e.y - 12 >= 0) {
						e.y = e.y - 12
						return e
					}
				}).filter(e => e)

				this.planeList = this.planeList.map((e) => {
					if (e.y + e.speed <= this.windowHeight) {
						e.y = e.y + e.speed
						return e
					}
				}).filter(e => e)


				for (let s of this.planeList) {
					canvas.drawImage('/static/planeGame/enemy.png', s.x - 11.5, s.y - 15, 23, 30)
				}
				for (let s of this.bulletList) {
					canvas.drawImage('/static/planeGame/bullet.png', s.x - 3, s.y - 11, 6, 22)
				}
				for (let s of this.boomList) {
					canvas.drawImage('/static/planeGame/boom1.png', s.x - 11.5, s.y - 15, 23, 30)
				}
			},
			// 生成子弹
			createBullet() {
				this.bulletList.push({
					x: this.myPlaneInfo.x + 30,
					y: this.myPlaneInfo.y
				})
			},
			// 生成敌机
			createPlane() {
				this.planeList.push({
					x: (this.windowWidth - 23) * Math.random(),
					y: -30,
					speed: Math.random() * 3 + 2
				})
			},

		},
		computed: {
			myPlaneStyle() {
				return `left: ${this.myPlaneInfo.left}px; top: ${this.myPlaneInfo.top}px`
			}
		},
		onUnload() {
			clearInterval(this.gameTimer)
			clearInterval(this.bulletTimer)
		}

	}
</script>

<style lang="scss">
	/* pages/airplaneGame/index.wxss */
	.chooseBox {
		display: flex;
		width: 100%;
		height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.chooseBtn {
		margin: 20px;
		width: 100px;
		height: 30px;
		border-radius: 6px;
		line-height: 30px;
		text-align: center;
		border: 1px solid black;
	}

	.btn-touch {
		/* background: black; */
		box-shadow: 0px 0px 25px 0px #000000;
	}

	.game-box {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.game-box image {
		position: absolute;
		width: 60px;
		height: 36px;
	}

	.game-box .scoreBoard {
		position: absolute;
		top: 0;
		left: 0;

	}

	.game-box .overBoard {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		left: 15%;
		top: 15%;
		width: 70%;
		height: 60%;
		margin: auto;
		border-radius: 5px;
		background-color: black;
		color: white;
	}

	.game-box .overBoard .title {
		font-size: 30px;
		font-weight: bold;
	}

	.game-box .overBoard button {
		color: white;
		border: 1px solid white;
	}

	.game-box .overBoard .btn-touch {
		background: white;
		color: black;
	}
</style>
