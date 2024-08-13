<script setup>
const upperIconList = [
	'#icon-xiazai16',
	'#icon-yonghu',
	'#icon-gerenkongjian',
	'#icon-youxi',
	'#icon-diandiandian'
]
const bottomIconList = [
	'#icon-gengduo',
	'#icon-wenjian',
	'#icon-shoucang',
	'#icon-youxiang'
]
const showManageLeftSubWindow = () => {
	ElectronAPI.showManageLeftSubWindow()
}

</script>


<template>
	<div class="container">
		<div class="title">
			<img src="../../assets/QQ.png" alt="">
		</div>
		<div class="img">
			<img src="../../assets/user.png" alt="">
		</div>
		<div class="upper-option" v-for="(item, index) in upperIconList" :key="index">
			<el-popover placement="right" trigger="hover" width="50" :disabled="(item !== '#icon-diandiandian')"
				hide-after="60">
				<template #reference>
					<svg class="icon bg" aria-hidden="true">
						<use :xlink:href="item"></use>
					</svg>
				</template>
				<div class="popover-manage" @click="showManageLeftSubWindow">
					管理
				</div>
			</el-popover>
		</div>
		<div class="bottom-option" v-for="(item, index) in bottomIconList" :key="index"
			:style="{ bottom: index * 40 + 'px' }">
			<svg class="icon blue" aria-hidden="true">
				<use :xlink:href="item"></use>
			</svg>
		</div>
	</div>
</template>


<style scoped lang="scss">
.container {
	position: relative;
	display: flex;
	width: 60px;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	background-color: #f2f2f2;

	.upper-option {
		margin: 5px;

		:deep() {

			min-width: 10px;
		}

		.popover-manage {}
	}

	.bottom-option {
		position: absolute;
		// bottom: 10px;
		margin: 5px;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 35px;
		height: 35px;
		padding: 8px;
	}

	.bg:hover {
		background-color: #e9e9e9;
		border-radius: 10px;
	}

	.blue:hover {
		fill: blue;
	}

	.img {
		margin: 10px 5px;
		width: 35px;
		height: 35px;

		img {
			width: 100%;
			height: 100%;
			border-radius: 35px;
			object-fit: cover;
		}
	}

	.title {
		margin: 6px 10px;

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
