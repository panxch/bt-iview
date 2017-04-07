// 基础配置类

export var setting = {
	home : {
		menu_icons : [
			{key : 'food', name : '美食',style : 'background-color:#fd9d21',icon : 'ion-android-restaurant'},
			{key : 'movie', name : '猫眼电影',style : 'background-color:#ff6767',icon : 'ion-android-film'},
			{key : 'hotel', name : '酒店',style : 'background-color:#8a90fa',icon : 'ion-android-bar'},
			{key : 'game', name : '休闲娱乐',style : 'background-color:#fed030',icon : 'ion-android-color-palette'},
			{key : 'out_food', name : '外卖',style : 'background-color:#fd9d21',icon : 'ion-android-cart'},
			{key : 'ktv', name : 'KTV',style : 'background-color:#fed030',icon : 'ion-android-microphone'},
			{key : 'ctrip', name : '周边游',style : 'background-color:#4dc6ee',icon : 'ion-android-globe'},
			{key : 'girl', name : '丽人',style : 'background-color:#ff80c2',icon : 'ion-android-contact'},
			{key : 'fast_food', name : '小吃快餐',style : 'background-color:#fd9d21',icon : 'ion-android-restaurant'},
			{key : 'train', name : '火车票',style : 'background-color:#599eec',icon : 'ion-android-train'}
		],
		list_api : 'api.php?act=home_list&callback=flightHandler'
	},
	footer : {
		menu : [
			{name : '首页' ,icon : 'ion-home',path : '/'},
			{name : '精选' ,icon : 'ion-star',path : '/hot'},
			{name : '我的' ,icon : 'ion-gear-a',path : '/account'},
		]
	}
};