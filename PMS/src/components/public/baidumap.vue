<template>
	<div class="dialog">
		<div class="mapsize">
			<div id="allmap">
			
		</div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
	export default {
		name: 'baiduMap',
		data() {
			return {

			}
		},
		methods: {
			TMap(key) {
        return new Promise(function (resolve, reject) {
             window.init = function () {
            resolve(qq)//注意这里
        }
	      var script = document.createElement("script");
	      script.type = "text/javascript";
	      script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key="+key;
	      script.onerror = reject;
	      document.head.appendChild(script);
	      })
    	}
		},
		mounted() {
			this.TMap('BJJBZ-UPLW3-IRH35-YTOYJ-TGORK-IFBIHyshotel').then(qq => {
            var map = new qq.maps.Map(document.getElementById("allmap"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(39.916527, 116.397128),
                 zoom: 18
            });
        });
		}
	}
</script>

<style lang="scss" scoped>
.dialog{
	position: fixed;
	top: 0;left: 0;right: 0;bottom: 0;
	backgrouund: rgba(0,0,0,.3);
	z-index: 1000;
	.mapsize{
		position: absolute;
		width: 600px;
		height: 600px;
		top: 50%;left: 50%;
		transform: translate(-300px, -300px);
	}
	#allmap{
		width: 600px;
		height: 600px;
		position: absolute;
	}
}
</style>