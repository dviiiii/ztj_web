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
</style>
<template>
    <div class="main">
      <div class="content c1">
        <div class="c-head h1" v-show="task_quadrant_show !== 1" @click="easyAdd(1)">
          <span>很重要-很紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
        <div class="input-head" v-show="task_quadrant_show === 1">
          <Input :autofocus="true" class="i-input i1" v-model="task_data.task_name" icon="md-return-left" placeholder="输入任务，按ENTRY键完成" @on-blur="taskInputBlur" @on-enter="addTask(1)"/>
        </div>
      </div>
      <div class="content c2">
        <div class="c-head h2" @click="easyAdd(2)">
          <span>重要-不紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
      </div>
      <div class="content c3">
        <div class="c-head h3" @click="easyAdd(3)">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
      </div>
      <div class="content c4">
        <div class="c-head h4" @click="easyAdd(4)">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add"/>
        </div>
      </div>
    </div>
</template>

<script>
    import {dateFormat} from '../../libs/util'
    export default {
        name: 'tasks',
        data () {
            return {
              task_quadrant_show: 0,
              task_quadrant: 0,
              task_data: {
                task_name: '',
                task_add_rank: 0,
                task_reduce_rank: 0,
                task_mark: '',
                task_plan_complete_time: '',
                task_repeat_type: 0,
                task_repeat_point: 0,
                task_repeat_end: 0,
              }
            }
        },
        mounted () {
          this.queryTask();
          console.log(1111)
          console.log(dateFormat(new Date()).substr(0, 10) + ' 23:59:59')
        },
        methods: {
          //根据象限增加任务
          easyAdd(task_quadrant) {
            const vm = this;
            vm.task_quadrant_show = task_quadrant;
          },

          taskInputBlur() {
            const vm = this;
            vm.task_quadrant_show = 0;
          },

          //自动还原测试
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
                console.log(res)
                vm.task_quadrant_show = 0;
                vm.queryTask();
              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },

          queryTask () {
            const vm = this;
            let params = {
              begin: '2019-10-27',
              end: '2100-12-31',
            };
            vm.$api.queryTask(params)
              .then(function (res) {
                console.log(res)
              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },


        }
    };
</script>


