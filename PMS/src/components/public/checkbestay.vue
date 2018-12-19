<template>
  <div class="check-be-stay">
    <div class="text">
      <header class="clearfix">
        <p class="fl">到店入住</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <p style="marginTop:40px;marginBottom:8px;textAlign:center;fontSize:12px;">请仔细核实对方预订单信息，</p>
      <p style="marginBottom: 40px;textAlign:center;fontSize:12px;">确认是否继续操作入住吗？</p>
      <div style="width:200px;margin: 14px auto;textAlign:center;" class="foot">
        <div class="middle">
          <el-button type="primary" @click="givePost">确认</el-button>
          <!-- <p @click="givePost" style="background:#437ff8;color:#fff;" class="middle btn">确认</p>
          <p @click="setNone" class="middle btn">取消</p> -->
          <el-button @click="setNone">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
export default {
  name: 'checkBeStay',
  props: ['val'],
  methods: {
    givePost() {
      API.post("/pms/preorder/miniapp_checkin", {preorder_id: this.val}).then(res =>{
        if (res.error_code == 0) {
          this.$message.success('操作成功')
          this.$emit('checkBeStayNone', 'hhahahaha')
        } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
      })
    },
    setNone() {
      this.$emit('checkBeStayNone')
    }
  }
}
</script>

<style lang="scss" scoped>
  .check-be-stay{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 12px;
		z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    .text{
      width: 350px;
      background: #fff;
      border-radius: 4px;
    }
    .btn{
      width: 78px;height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #437ff8;
      color: #437ff8;
      border-radius: 4px;
      cursor: pointer;
    }
    header{
      font-size: 14px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 30px;
      line-height: 40px;
      background: #437ff9;
      color: #fff;
      .spa{
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
</style>


