<style lang="less" scoped="">
  .main {
    height: 100%;
    width: 100%;
  }
  .content {
    width: 50%;
    height: 50%;
    float: left;
    padding-top: 15px;
    overflow: hidden;
  }

  .c1 {
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .c2 {
    border-bottom: 1px solid #d9d9d9;
  }

  .c3 {
    border-right: 1px solid #d9d9d9;
  }

  .c-head {
    cursor: pointer;
    margin: 0 20px;
    padding: 10px 0 10px 10px;
    font-size: 16px;
    height: 42px;
    position: relative;
  }

  .h1 {
    background-color: #FFEDE7;
    color: #F76333;
  }

  .h2 {
    background-color: #FFEFCB;
    color: #FEAE6A;
  }

  .h3 {
    background-color: #D6F4FE;
    color: #3FB6DA;
  }

  .h4 {
    background-color: #EFD;
    color: #89C557;
  }

  .task-add {
    float: right;
    font-size: 41px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }

  .input-head {
    margin: 0 20px;
  }

  .c-body {
    padding: 0 30px 42px 30px;
    overflow: auto;
    height: 100%;
  }

  .c-body .list+.list {
    border-top: 1px dashed #d9d9d9;
  }

  .c-body .list {
    line-height: 40px;
    height: 40px;
    position: relative;

  }

  .c-body .list .text {
    display: block;
    float: left;
    height: 40px;
    overflow: hidden;
    margin-top: -40px;
    padding-left: 30px;
    padding-right: 20px;
    width: 100%;
  }

  .c-body .list .time {
    color: #BCC3C5;
    font-size: 14px;
    font-weight: lighter;
    position: absolute;
    background: #fff;
    height: 39px;
    padding-left: 6px;
    right: 26px;
  }

  .date-btn {
    display: inline-block;
  }

  .main-head {
    margin: 0 30px;
    height: 40px;
    border-bottom: 1px solid #ededed;
    line-height: 40px;
  }
  .main-head-left {
    float: left;
  }

  .main-head-right {
    float: right;
  }

  .r-add {
    font-size: 32px;
    padding: 0 10px;
    position: relative;
    top: 6px;
    color: #00C0EE;
    cursor: pointer;
  }

  .main-head .date {
    display: inline-block;
    width: 100px;
  }

  .m-next, .m-pre {
    font-size: 20px;
    cursor: pointer;

  }

  .m-next:hover, .m-pre:hover {
    color: #00C0EE;
  }

  .btn {
    color: #444;
    background-color: #fff;
    display: inline-block;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 0 6px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .btn.active,.btn:hover {
    color: #fff;
    background-color: #2BBFF3;
    border-color: #2BBFF3;
    box-shadow: none;
  }

  .main-head-left>.btn {
    margin: 0 15px;
  }

  .c-body .list .time.timeout {
    color: red;
  }
</style>

<style>
  .content-wrapper {
    background: #ffffff;
  }
  .i-input input {
    border-radius: 0;
    height: 42px;
  }

  .i-input .ivu-input-icon {
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
  }

  .i1 input, .i1 input:hover, .i1 input:focus{
    border: 1px solid #F76333;
    background-color: #FFEDE7;
    box-shadow: none;
  }

  .i2 input, .i2 input:hover, .i2 input:focus{
    /*border: 1px solid #F76333;*/
    /*background-color: #FFEDE7;*/
    border-color: #FEAE6A;
    background-color: #FFEFCB;
    box-shadow: none;
  }

  .i3 input, .i3 input:hover, .i3 input:focus{
    /*border: 1px solid #F76333;*/
    /*background-color: #FFEDE7;*/
    border-color: #3FB6DA;
    background-color: #D6F4FE;
    box-shadow: none;
  }

  .i4 input, .i4 input:hover, .i4 input:focus{
    /*border: 1px solid #F76333;*/
    /*background-color: #FFEDE7;*/
    border-color: #89C557;
    background-color: #EFD;
    box-shadow: none;
  }
</style>
<template>
    <div class="main">
      <div class="main-head clearfix">
        <div class="main-head-left">
          <span class="date">{{selectDate}}</span>
          <Icon class="m-pre" @click="preDate" type="ios-arrow-back" />
          <Icon class="m-next" @click="nextDate" type="ios-arrow-forward" />

          <span class="btn" @click="toToday">今天</span>
          <div class="date-btn">
            <span @click="selectDateModel('day')" class="btn" :class="{'active': dateModel === 'day'}">日</span>
            <span @click="selectDateModel('week')" class="btn" :class="{'active': dateModel === 'week'}">周</span>
            <span @click="selectDateModel('month')" class="btn" :class="{'active': dateModel === 'month'}">月</span>
          </div>

        </div>
        <div class="main-head-right">
          <Select @on-change="queryTask" size="small" v-model="select_status" style="width:80px">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Icon type="md-add" class="r-add" />
        </div>
      </div>
      <div class="content c1">
        <div class="c-head h1" v-show="task_quadrant_show !== 1" @click="easyAdd(1)">
          <span>很重要-很紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
        <div class="input-head" v-show="task_quadrant_show === 1">
          <Input ref="task_input1" class="i-input i1" v-model="task_data.task_name" icon="md-return-left" placeholder="输入任务，按ENTRY键完成" @on-blur="taskInputBlur" @on-enter="addTask(1)"/>
        </div>
        <div class="c-body list1">
          <div class="list" v-for="item in task_list" v-if="item.task_quadrant === 1">
            <Radio @on-change="completeTask(item)"  size="large" class="radio" v-model="item.task_status === 1" ></Radio>
            <span class="text">{{item.task_name}}</span>
            <span class="time" :class="{'timeout': nowDate > new Date(item.task_plan_complete_time)}">{{item.task_plan_complete_time.split('T')[0]}}&nbsp;&nbsp;{{item.task_plan_complete_time.split('T')[1]}}</span>
          </div>
        </div>
      </div>
      <div class="content c2">
        <div class="c-head h2" @click="easyAdd(2)">
          <span>重要-不紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
        <div class="input-head" v-show="task_quadrant_show === 2">
          <Input ref="task_input2" class="i-input i2" v-model="task_data.task_name" icon="md-return-left" placeholder="输入任务，按ENTRY键完成" @on-blur="taskInputBlur" @on-enter="addTask(1)"/>
        </div>
        <div class="c-body list2">
          <div class="list" v-for="item in task_list" v-if="item.task_quadrant === 2">
            <Radio @on-change="completeTask(item)"  size="large" class="radio" v-model="item.task_status === 1" ></Radio>
            <span class="text">{{item.task_name}}</span>
            <span class="time" :class="{'timeout': nowDate > new Date(item.task_plan_complete_time)}">{{item.task_plan_complete_time.split('T')[0]}}&nbsp;&nbsp;{{item.task_plan_complete_time.split('T')[1]}}</span>
          </div>
        </div>
      </div>

      <div class="content c3">
        <div class="c-head h3" @click="easyAdd(3)">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
        <div class="input-head" v-show="task_quadrant_show === 3">
          <Input ref="task_input3" class="i-input i3" v-model="task_data.task_name" icon="md-return-left" placeholder="输入任务，按ENTRY键完成" @on-blur="taskInputBlur" @on-enter="addTask(1)"/>
        </div>
        <div class="c-body list3">
          <div class="list" v-for="item in task_list" v-if="item.task_quadrant === 3">
            <Radio @on-change="completeTask(item)"  size="large" class="radio" v-model="item.task_status === 1" ></Radio>
            <span class="text">{{item.task_name}}</span>
            <span class="time" :class="{'timeout': nowDate > new Date(item.task_plan_complete_time)}">{{item.task_plan_complete_time.split('T')[0]}}&nbsp;&nbsp;{{item.task_plan_complete_time.split('T')[1]}}</span>
          </div>
        </div>
      </div>

      <div class="content c4">
        <div class="c-head h4" @click="easyAdd(4)">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
        <div class="input-head" v-show="task_quadrant_show === 4">
          <Input ref="task_input4" class="i-input i4" v-model="task_data.task_name" icon="md-return-left" placeholder="输入任务，按ENTRY键完成" @on-blur="taskInputBlur" @on-enter="addTask(1)"/>
        </div>
        <div class="c-body list4">
          <div class="list" v-for="item in task_list" v-if="item.task_quadrant === 4">
            <Radio @on-change="completeTask(item)"  size="large" class="radio" v-model="item.task_status === 1" ></Radio>
            <span class="text">{{item.task_name}}</span>
            <span class="time" :class="{'timeout': nowDate > new Date(item.task_plan_complete_time)}">{{item.task_plan_complete_time.split('T')[0]}}&nbsp;&nbsp;{{item.task_plan_complete_time.split('T')[1]}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {dateFormat} from '../../libs/util'
    import moment from 'moment';
    export default {
        name: 'tasks',
        data () {
            return {
              task_quadrant_show: 0,
              task_quadrant: 0,
              select_status: '0',
              task_data: {
                task_name: '',
                task_add_rank: 0,
                task_reduce_rank: 0,
                task_mark: '',
                task_plan_complete_time: '',
                task_repeat_type: 0,
                task_repeat_point: 0,
                task_repeat_end: 0,
              },
              statusList: [
                {
                  label: '全部',
                  value: '-1'
                },
                {
                  label: '未完成',
                  value: '0'
                },
                {
                  label: '已完成',
                  value: '1'
                },
              ],
              task_list: [],
              nowDate: new Date(),
              selectDate: moment().format('YYYY-MM-DD'),
              dateModel: 'day'
            }
        },
        mounted () {
          this.queryTask();

        },
        methods: {

          //查询今天
          toToday() {
            this.selectDate =  moment().format('YYYY-MM-DD');
            this.dateModel = 'day';

            this.queryTask();
          },

          //查询时间
          selectDateModel(model) {
            const vm = this;
            if(model === 'day') {
              this.selectDate =  moment().format('YYYY-MM-DD');
              this.dateModel = 'day';
            }

            if(model === 'week') {
              this.selectDate =  moment().weekday(1).format('YYYY-MM-DD') + '~' + moment().weekday(7).format('YYYY-MM-DD').substr(8, 10);
              this.dateModel = 'week';
            }

            if(model === 'month') {
              this.selectDate =  moment().format('YYYY-MM');
              this.dateModel = 'month';
            }

            this.queryTask();
          },

          //上一个日期
          preDate() {
            const vm = this;
            if(vm.dateModel === 'day') {
              this.selectDate =  moment(vm.selectDate).subtract(1, 'd').format('YYYY-MM-DD');
            }

            if(vm.dateModel === 'week') {
              let netweek = moment(vm.selectDate.split('~')[0]).subtract(7, 'd')
              this.selectDate =  moment(netweek).weekday(1).format('YYYY-MM-DD') + '~' + moment(netweek).weekday(7).format('YYYY-MM-DD').substr(8, 10);
            }

            if(vm.dateModel === 'month') {
              this.selectDate =  moment(vm.selectDate).subtract(1, 'month').format('YYYY-MM');
            }

            this.queryTask();
          },

          //下一个日期
          nextDate() {
            const vm = this;
            if(vm.dateModel === 'day') {
              this.selectDate =  moment(vm.selectDate).add(1, 'd').format('YYYY-MM-DD');
            }

            if(vm.dateModel === 'week') {
              let netweek = moment(vm.selectDate.split('~')[0]).add(7, 'd')
              this.selectDate =  moment(netweek).weekday(1).format('YYYY-MM-DD') + '~' + moment(netweek).weekday(7).format('YYYY-MM-DD').substr(8, 10);
            }

            if(vm.dateModel === 'month') {
              this.selectDate =  moment(vm.selectDate).add(1, 'month').format('YYYY-MM');
            }

            this.queryTask();
          },

          //根据象限增加任务
          easyAdd(task_quadrant) {
            const vm = this;
            vm.task_quadrant_show = task_quadrant;

            setTimeout(() => {
              console.log(vm.$refs['task_input' + task_quadrant])
              vm.$refs['task_input' + task_quadrant].focus()
            }, 500)

          },

          //任务输入框失去焦点
          taskInputBlur() {
            const vm = this;
            vm.task_quadrant_show = 0;
          },

          //新增任务
          addTask (task_quadrant) {
            const vm = this;

            if(!vm.task_data.task_name) {
              vm.$Message.warning('任务名称不能为空!');
              return false
            }

            let params = {
              task_name: vm.task_data.task_name,
              task_add_rank: vm.task_data.task_add_rank || 0,
              task_reduce_rank: vm.task_data.task_reduce_rank || 0,
              task_mark: vm.task_data.task_mark || '',
              task_plan_complete_time: vm.task_data.task_plan_complete_time || dateFormat(new Date()).substr(0, 10) + ' 23:59:59',
              task_quadrant: task_quadrant,
              task_repeat_type: vm.task_data.task_repeat_type || 0,
              task_repeat_point: vm.task_data.task_repeat_point || 0,
              task_repeat_end: vm.task_data.task_repeat_end || 0,
            };

            vm.$api.addTask(params)
              .then(function (res) {
                vm.task_quadrant_show = 0;
                vm.queryTask();
              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },

          //查询任务
          queryTask () {
            const vm = this;
            let params = {};
            if(vm.dateModel === 'day') {
              params = {
                begin: '1990-01-01',
                end: vm.selectDate,
              };
            }

            if(vm.dateModel === 'week') {
              params = {
                begin: vm.selectDate.split('~')[0],
                end: moment(vm.selectDate.split('~')[0]).weekday(7).format('YYYY-MM-DD'),
              };
            }

            if(vm.dateModel === 'month') {
              params = {
                begin: moment(vm.selectDate).startOf('month').format('YYYY-MM-DD'),
                end: moment(vm.selectDate).endOf('month').format('YYYY-MM-DD'),
              };
            }

            params.task_status = vm.select_status;
            vm.$api.queryTask(params)
              .then(function (res) {
                vm.task_list = res.data.list;
              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },

          //完成任务
          completeTask(item) {
            const vm = this;
            let params = {
              id: item.id
            }
            vm.$api.completeTask(params)
              .then(function (res) {
                vm.queryTask();
              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },

        }
    };
</script>


