
	import API from "@/store/API"
	export default{
		name: 'login',
		data() {
			return {
        autoplay: 1
			}
		},
    methods: {
      getMobileCode() {
        API.post("/pms/mobile/code",{mobile: '18607454757'}).then(res =>{
          console.log(res)
        })
      },
      setauto() {
        setInterval(() => {
          this.autoplay++
          if(this.autoplay == 4){
            this.autoplay = 1
          }
        }, 3000)
      }
    },
    mounted() {
      this.setauto()
    }
	}
