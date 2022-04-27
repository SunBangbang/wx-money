let timer = null
let timer2 = null
let movedistance = 0;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		windowHeight: 1000,
		windowWidth: 0,
		// prevList: [],
		list: [],
		// start: 4,
		orwindowHeight: 0,
		// imgList: [{
		//     url: '../../images/1.png',
		//     width: 100,
		//     height: 100,
		//   },
		//   {
		//     url: '../../images/1.png',
		//     width: 100,
		//     height: 100
		//   },
		//   {
		//     url: '../../images/r.png',
		//     width: 40,
		//     height: 40
		//   }
		// ],
		distance: 0
	},

	onLoad() {
		var windowHeight = wx.getSystemInfoSync().windowHeight
		var windowWidth = wx.getSystemInfoSync().windowWidth
		this.data.windowHeight = windowHeight * 0.65
		this.data.windowWidth = windowWidth
		this.setData({
			windowHeight: this.data.windowHeight,
			orwindowHeight: wx.getSystemInfoSync().windowHeight,
			windowWidth: this.data.windowWidth,
		})

	},
	// randomNum() {
	//   return Math.ceil(Math.random() * 2) + 2
	// },
	loopInit() {
		// timer2 && clearTimeout(timer2)
		// timer2 = setTimeout(() => {
		// console.log(123);
		// this.randomPostion(this.randomNum())
		//   this.loopInit()
		// }, 5000)
		this.randomPostion();
	},
	/**
	 * 随机生成一定数量的位置
	 * 而且位置不能重叠
	 * @param {*} num 
	 */
	randomPostion() {
		// let width = this.data.windowWidth;
		// let height = this.data.windowHeight;
		// let el = {
		//   top: 0,
		//   left: 0,
		//   width: 0,
		//   height: 0
		// }
		// 位置不能重复 则 (newtop-newHeight) < top || newtop > top+height 
		// newleft - newWidth < left || newLeft > left+width 
		let arr = [];
		// let loop = 0

		// let start = this.data.start
		// let index = start
		// let oldList = []
		// while (arr.length < num && loop < 500) {
		//   // console.log(1,this.data.loop);
		//   loop = loop + 1
		//   let left = Math.random() * width
		//   let top = Math.random() * 100
		//   // let top = 0
		//   // let ccc = Math.ceil(Math.random() * (this.data.imgList).length - 1)
		//   // let elW = (this.data.imgList)[ccc].width;
		//   // let elH = (this.data.imgList)[ccc].height;
		//   let elW = 40;
		//   let elH = 40;

		//   let status = true
		//   for (let i = 0; i < arr.length; i++) {
		//     let old = arr[i]
		//     let leftStatus = ((left + elW) < old.left) || (left > (old.left + old.width))
		//     // let topStatus = ((top + elH) < old.top) || (top > (old.top+old.height))
		//     if (!leftStatus) {
		//       status = false
		//       break
		//     }
		//   }
		//   // console.log(status);
		//   if (status) {
		//     if ((left + elW) < width && (top + elH) < height) {
		//       arr.push({
		//         id: index,
		//         left: left,
		//         top: -300 - top,
		//         width: elW,
		//         height: elH,
		//         img: '../../images/r.png', //(this.data.imgList)[ccc].url
		//         speed: Math.random() * 2500 + 3000
		//       })
		//       oldList.push(index)
		//       index = index + 1
		//     }
		//   }
		// }
		let list = this.data.list
		// if (flag) {
		arr = [{
				id: 0,
				left: 30,
				top: -100,
				width: 80, // 图片的宽
				height: 80, // 图片的高
				img: "../../images/1.png",
			},
			{
				id: 1,
				left: 350,
				top: -300,
				width: 80,
				height: 80,
				img: "../../images/2.png",
			},
			{
				id: 2,
				left: 150,
				top: -500,
				width: 80,
				height: 80,
				img: "../../images/3.png",
			},
			{
				id: 3,
				left: 550,
				top: -700,
				width: 80,
				height: 80,
				img: "../../images/4.png",
			}
		];
		// } else {
		//   obj = [];
		// }
		list.push(...arr);
		// flag = false;
		this.setData({
			list: list,
		}, () => {
			this.animation(arr)
			// this.data.start = index + 1
			// this.an()
		})

	},
	// delectEl() {
	//   // console.log(888);
	//   timer && clearTimeout(timer)
	//   timer = setTimeout(() => {
	//     let list = (this.data.list).filter((item) => {
	//       if (item.status) {
	//         return false
	//       } else {
	//         return true
	//       }
	//     })
	//     this.setData({
	//       list: list
	//     })
	//     this.delectEl()
	//   }, 20000)
	// },
	/**
	 * 动画
	 */
	animation(list) {
		for (let i = 0; i < list.length; i++) {
			let item = list[i]
			// let time = 5000 + (Math.random()*6000)
			let time = 9000 // 控制下落速度
			// let left = Math.random() * this.data.windowWidth;
			this.animate(`.an${item.id}`, [{
						top: `${item.top}px`,
						ease: 'linear'
					},
					{
						top: `${this.data.windowHeight+200}px`,
						ease: 'linear' //ease-out
					}
				], time
				/*, (e) => {
				        (this.data.list) = (this.data.list).map((c) => {
				          if (c.id == item.id) {
				            c['status'] = true
				          }
				          return c
				        })
				      }*/
			)
		}


	},
	// 手指触摸动作开始
	touchstartX(e) {
		// 获取触摸X坐标
		this.recordY = e.touches[0].clientY;
	},
	// 手指触摸后移动
	touchmoveX(e) {
		let currentY = e.touches[0].clientY;
		movedistance = currentY - this.recordY; // 获取移动距离
		// console.log(movedistance);
		if (movedistance <= -40) {
			movedistance = 0
			this.setData({
				cssStatus: false
			})
		} else {
			this.slideAnimation(movedistance, 300);
		}

	},
	// 手指触摸动作结束
	touchendX() {
		let recordY;
		if (movedistance >= this.data.windowHeight / 3) { // 移动未达到距离即还原
			recordY = this.data.windowHeight;
			// this.randomPostion(this.randomNum())
			this.loopInit()
			// this.delectEl()
			setTimeout(() => {
				this.setData({
					cssStatus: true
				})
			}, 300)
			this.slideAnimation(recordY, 300, 'px');
		} else {
			this.close()
		}
		// console.log(recordY);

	},
	// 滑动动画
	slideAnimation(recordY, time, d) {
		if (recordY < 0) {
			recordY = this.data.windowHeight + recordY
		}
		let animation = wx.createAnimation({
			duration: time,
			timingFunction: 'ease'
		});
		d = d || 'rpx'
		animation.translate(0, recordY + d).step()
		this.setData({
			animation: animation.export()
		})
	},
	close() {
		this.slideAnimation(0, 300, 'px');
		// timer2 && clearTimeout(timer2)
		// timer && clearTimeout(timer)
		movedistance = 0
		this.setData({
			cssStatus: false,
			list: []
		})
	}
})
