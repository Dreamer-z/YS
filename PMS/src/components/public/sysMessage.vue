<template>
	<div class="sysMsg">
		<div class="pane-title-box">
			<div class="pane-title">
				<div class="pane-title-cont">消息内容</div>
				<div class="pane-title-source">消息来源</div>
				<div class="pane-title-time">时间</div>
			</div>
			<div class="empty"></div>
		</div>
		<el-collapse accordion @change="read" :value="pagination.init">
			<el-collapse-item v-for="(item,index) in list" :key="index" :name="item.id">
				<template slot="title">
					<div class="item-title" :class="[item.status == 0?'no-read':'']">
						<div class="cont elli">{{item.title}}</div>
						<div class="source elli">{{item.type_name}}</div>
						<div class="time elli">{{item.create_time}}</div>
					</div>
				</template>
				<div class="item-content">{{item.content}}</div>
			</el-collapse-item>
		</el-collapse>
    <el-pagination v-show="list.length>0?true:false" class="pagination" :page-size='pagination.num' background layout="prev, pager, next" :total="pagination.total" @current-change="current"></el-pagination>
	</div>
</template>

<script>
export default {
  props: {
    list: Array,
    pagination:{},
  },
  data () {
    return {
      init:-1
    }
  },
  methods:{
    read(activeNames){
      this.$emit('fn',activeNames);
    },
    current(n){
      this.$emit('changePage',n);
    }
  },
}
</script>

<style lang="scss" scoped>
.pane-title-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #f4f9ff;
  .pane-title {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    width: 100%;
    flex: 1;
    padding: 0 30px;
    .pane-title-cont {
      width: 40%;
    }
    .pane-title-source {
      width: 20%;
    }
    .pane-title-time {
      width: 30%;
    }
  }
  .empty {
    width: 21px;
    height: 100%;
  }
}
.item-title {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  &.no-read::after {
    content: '·';
    font-weight: bold;
    position: absolute;
    left: 12px;
    width: 10px;
    color: #dc4233;
  }
  .cont {
    height: 100%;
    width: 40%;
  }
  .source {
    height: 100%;
    width: 20%;
    text-align: center;
  }
  .time {
    height: 100%;
    width: 30%;
    text-align: center;
  }
}
.item-content {
  box-sizing: border-box;
  padding-left: 30px;
  width: 40%;
}
</style>
