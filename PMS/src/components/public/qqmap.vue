<template>
	<div class="mapdrog">
		<div style="background: #fff; margin-top: 80px;">
			<div style="margin: 6px auto; width: 600px; position: relative;">
				<input v-model="address" id="address" type="text" style="border: 1px solid #e2e2e2;">
				<button @click="codeAddress">search</button>
				<p style="display: inline-block;">坐标点可以拖拽</p>
				<nav @click="mapnone">取消</nav>
				<section @click="givelng">确定</section>
			</div>
			<div id="container"></div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
	export default {
		name: 'qqMap',
		data() {
			return {
				latlng: '',
				address: this.addressname
			}
		},
		props: ['addressname'],
		methods: {
			givelng() {
				this.mapnone()
				this.$emit('givelng',{'lng': this.latlng, 'newaddress': this.address})
			},
			mapnone() {
				this.$emit('nomap', {})
			},
			init() {
				let _this = this;
				var map = new qq.maps.Map(document.getElementById('container'),{
					center: new qq.maps.LatLng(39.916527, 116.397128),
					zoom: 17
				})
				window.geocoder = new qq.maps.Geocoder({
					complete: function(res){
						map.setCenter(res.detail.location);
						var marker = new qq.maps.Marker({
							map: map,
							draggable: true,
							position: res.detail.location
						})
						qq.maps.event.addListener(marker, 'dragend', function(e){
							// console.log(marker.getPosition())
							_this.latlng = marker.getPosition()
						})
					}
				})
			},
			codeAddress() {
				let address = this.address      //document.getElementById('address').value;
				geocoder.getLocation(address)
			}
		},
		created() {
			//?address="+'湖南省长沙市开福区万达广场'+"&key=BJJBZ-UPLW3-IRH35-YTOYJ-TGORK-IFBIH"
			// API.get(encodeURI("http://apis.map.qq.com/ws/geocoder/v1")).then(res=>{
			// 	console.log('dsfsdfaaaaa',res)
			// })
		},
		mounted() {
			this.init()
			this.codeAddress()
		}
	}
</script>

<style lang="scss" scoped>
.mapdrog{
	position: fixed;
	top:0;right: 0;left: 0; bottom:0;
	background: rgba(0,0,0,.4);
	z-index: 100;
}
	p{
		width: 603px;
		padding-top: 3px;
		margin-top: 10px;
		overflow: hidden;
	}
	input#address{
		width: 300px;
		height: 36px;
	}
	nav,section{
		width: 100px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		position: absolute;
		top: 6px;
		cursor: pointer;
	}
	nav{
		left: 380px;
		background: red;
	}
	section{
		left: 500px;
		background: cyan;
	}
	#container{
		width: 600px;
		height: 600px;
		margin: 0 auto;
		// position: absolute;
		// z-index: 200;
	}
</style>