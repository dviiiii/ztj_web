<style lang="less" scoped="">
  .main {
    padding: 0 20%;
    background-color: #ffffff;
  }

  .head {
    height: 40px;
  }

  .head .radio {
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
  }

  .target-c {
    display: inline-block;
  }

  .fh-content {
    margin-top: 40px;
  }

  .fh_img {
    padding: .25rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    width: 200px;
    margin: 0 auto;
    display: block;
  }

  .fh-info {
    padding: 0 20px;
  }

  .fh-date {
    display: block;
    font-size: 16px;
  }

  .fh-code {
    display: block;
    font-size: 16px;
    font-weight: 600;
  }

  .fh-name {
    display: block;
    font-size: 20px;
    font-weight: 600;
    color: #2d8cf0;
  }

  .fh_bt {
    font-size: 14px;
    border-bottom: 1px solid #f2dcdc;
    cursor: pointer;
    margin-top: 5px;
  }

  .fh_bt span+span {
    margin-left: 30px;
  }

  .page {
    padding: 15px 0;
  }

  .page-c {
    float: right;
  }

</style>
<template>
    <div class="main">
      <Row class="head">
        <Col span="12">
          <Input v-model="name" @on-enter="queryList" search enter-button placeholder="Enter something..." />
        </Col>
        <Col span="12">
          <RadioGroup v-model="ismsk" class="radio">
            <Radio label="all">全部</Radio>
            <Radio label="0">yes</Radio>
            <Radio label="1">no</Radio>
          </RadioGroup>
        </Col>

      </Row>
      <Row class="target">
        <div class="target-c" v-for="item in targetDataRandom">
          <Tag checkable @on-change="clickTarget(item.target_name)" color="magenta">{{item.target_name}} ({{item.num}})</Tag>
        </div>
      </Row>
      <Row class="target">
        <Collapse simple>
          <Panel name="1">
            更多标签
            <div slot="content">
              <div class="target-c" v-for="item in targetData">
                <Tag checkable @on-change="clickTarget(item.target_name)" color="magenta">{{item.target_name}} ({{item.num}})</Tag>
              </div>
            </div>
          </Panel>
        </Collapse>

      </Row>
      <Row class="fh-content" v-for="item in fh_list">
        <Col span="12">
          <img class="fh_img" :src="'fh_jpg/' + item.fh_code + '.jpg'">
        </Col>
        <Col span="12" class="fh-info">
          <span class="fh-date">发行日期: {{item.fh_date}}</span>
          <span class="fh-code">{{item.fh_code}}</span>
          <span class="fh-name">{{item.fh_name}}</span>

          <div class="target-c" v-for="targetlist in item.fh_target">
            <Tag checkable @on-change="clickTarget(targetlist)"  color="magenta">{{targetlist}}</Tag>
          </div>

          <div v-for="magent_list in item.fh_magent" class="fh_bt" @click="openbt(magent_list)">
            <span >{{magent_list.magnet_name}}</span>
            <span>{{magent_list.magnet_size}}</span>
            <span>{{magent_list.magnet_date}}</span>
          </div>
        </Col>
      </Row>

      <Row class="page">
        <Page class="page-c" :current="pagenum" :page-size="pagesize" :total="total" @on-change="pageChage"/>
      </Row>
    </div>
</template>

<script>
    import {dateFormat} from '../../libs/util'
    export default {
        name: 'tasks',
        data () {
            return {
                fh_list: [],
                targetData: [],
                targetDataRandom: [],
                pagesize: 100,
                pagenum: 1,
                target: '',
                name: '',
                ismsk: 'all',
              total: 0

            }
        },
        mounted () {
          this.queryList();
          this.queryTarget();
        },
        methods: {

          queryList() {
            const vm = this;

            let params = {
              pagesize: vm.pagesize,
              pagenum: vm.pagenum,
              target: vm.target,
              name: vm.name,
              ismsk: vm.ismsk,
            }
              vm.$api.get_emmm_list(params)
                .then(function (res) {
                  vm.total = res.data.total;
                  vm.fh_list = res.data.list;
                  vm.getRandomTarget();
                })
                .catch(function (err) {
                  console.log(err.response);
                  vm.$Message.error('服务器错误！');
                })
          },

          // get_emmm_target
          queryTarget() {
            const vm = this;
            vm.$api.get_emmm_target()
              .then(function (res) {
                vm.targetData = res.data.list;
                vm.getRandomTarget();

              })
              .catch(function (err) {
                console.log(err.response);
                vm.$Message.error('服务器错误！');
              })
          },

          getRandomTarget() {
            const vm = this;
            if(vm.targetData.length !== 0) {
              vm.targetDataRandom = [];
              for(let i = 0; i < 20; i++) {
                let index = Math.floor(Math.random()*vm.targetData.length)
                vm.targetDataRandom.push(vm.targetData[index])
              }
            }

          },

          openbt(item) {
            window.open(item.magnet_url, '_self')
          },

          pageChage(n) {
            const vm = this;
            vm.pagenum = n;
            vm.queryList();
          },

          clickTarget(name) {
            const vm = this;
            vm.target = name;
            vm.queryList();
          }
          // //根据象限增加任务
          // easyAdd(task_quadrant) {
          //   const vm = this;
          //   vm.task_quadrant_show = task_quadrant;
          //
          //   setTimeout(() => {
          //     vm.$refs['task_input' + task_quadrant].focus()
          //   }, 500)
          //
          // },
          //
          // taskInputBlur() {
          //   const vm = this;
          //   vm.task_quadrant_show = 0;
          // },
          //
          // //自动还原测试
          // addTask (task_quadrant) {
          //   const vm = this;
          //
          //   if(!vm.task_data.task_name) {
          //     vm.$Message.warning('任务名称不能为空!');
          //     return false
          //   }
          //
          //   let params = {
          //     task_name: vm.task_data.task_name,
          //     task_add_rank: vm.task_data.task_add_rank || 0,
          //     task_reduce_rank: vm.task_data.task_reduce_rank || 0,
          //     task_mark: vm.task_data.task_mark || '',
          //     task_plan_complete_time: vm.task_data.task_plan_complete_time || dateFormat(new Date()).substr(0, 10) + ' 23:59:59',
          //     task_quadrant: task_quadrant,
          //     task_repeat_type: vm.task_data.task_repeat_type || 0,
          //     task_repeat_point: vm.task_data.task_repeat_point || 0,
          //     task_repeat_end: vm.task_data.task_repeat_end || 0,
          //   };
          //
          //   vm.$api.addTask(params)
          //     .then(function (res) {
          //       console.log(res)
          //       vm.task_quadrant_show = 0;
          //       vm.queryTask();
          //     })
          //     .catch(function (err) {
          //       console.log(err.response);
          //       vm.$Message.error('服务器错误！');
          //     })
          // },
          //
          // queryTask () {
          //   const vm = this;
          //   let params = {
          //     begin: '2019-10-27',
          //     end: '2100-12-31',
          //   };
          //   vm.$api.queryTask(params)
          //     .then(function (res) {
          //       console.log(res)
          //     })
          //     .catch(function (err) {
          //       console.log(err.response);
          //       vm.$Message.error('服务器错误！');
          //     })
          // },
          //

        }
    };
</script>


