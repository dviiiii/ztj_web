<style scoped>
  .content {
    background: #ffffff;
  }
  .head {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
  }

  .col-text {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    text-align: right;
  }

  .row-col {
    margin-bottom: 10px;
  }

  .table-name {
    overflow-y: auto;
  }

  .table-name-row {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }

  .table-name-row:hover {
    background-color: #f0faff;
    color: #2d8cf0;
    cursor: pointer;
  }

  .table-name-row.active {
    background-color: #f0faff;
    color: #2d8cf0;
  }

  .col-head {
    width: max-content;
    position: relative;
  }

  .masking-modal .ivu-row {
    overflow: inherit;
  }

  .title-tips {
    font-size: 12px;
    font-weight: 100;
    margin-left: 70px;
  }

  .filtterInput{
    width: 150px;
    margin-left: 15px;
  }

  .btn-content {
    padding: 15px;
  }

</style>
<template>
  <div class="content" :style="{'min-height': contentH+'px'}">
    <Row>
      <Col span="24" >
      <div class="head clearfix">
        <div class="floatL">
          <Badge status="success" text="特殊数据脱敏" />
          <Input class="filtterInput" v-model="searchData.tableName" placeholder="查找表名" style="width: 150px" @on-change="toSearch" />
        </div>
        <div class="floatR">

        </div>
      </div>
      </Col>
      <Col span="4">
      <div style="background:#eee;">
        <Card :bordered="true" >
          <p slot="title">选择实例 <span class="title-tips">共{{tableLength}}张表</span></p>

          <div class="table-name-row">
            <Select v-model="selectedDB" filterable @on-change="changeSelectedDB">
              <Option v-for="item in config_data" :value="item.id" :key="item.id">{{ item.db_describe }}</Option>
            </Select>
          </div>
          <div :style="{height: cardH+'px'}" class="table-name">
            <div @click="clickTableName(tableName)" class="table-name-row" v-for="tableName in tableNames" :class="{'active': tableName_active === tableName}">
              <span>{{tableName}}</span>
            </div>
          </div>

        </Card>
      </div>
      </Col>
      <Col span="10">
        <div class="btn-content" :style="{'min-height': tableH+'px'}">
          <Button type="info" @click="mask_01_queryNum">NC财务脱敏</Button>
        </div>
      </Col>
      <Col span="10">
      <div class="btn-content" :style="{'min-height': tableH+'px'}">
        <ul>
          <li v-for="msg in msgArr">{{msg}}</li>
        </ul>
      </div>
      </Col>
    </Row>
  </div>



</template>
<script>
  export default {
    name: 'db_masking_lv2',
    data () {
      return {
        loading: false,
        tableLength: 0,
        tableH: '',
        contentH: '',
        cardH:'',
        tbody: '',
        selectedDB: '',
        tableNames: [],
        tableNameClone: [],
        tableName_active: '',
        tableCols: [],
        tableData: [],
        maskCol:'',
        config_data: [],
        searchData: {
            tableName: ''
        },
        msgArr: [],
        maskPage: {
            pageSize: '1',
            pageNum: '100'
        },
        count: 0,
      }
    },
    filters: {
      TableName: function (value) {
        return value
      }
    },
    mounted () {
        const vm = this;

      //根据屏幕设置背景图高度
      vm.tableH = window.innerHeight - 200;
      vm.cardH = window.innerHeight - 325;
      vm.contentH = window.innerHeight - 140;
      window.onresize = () => {
        return (() => {
          vm.tableH = window.innerHeight - 200;
          vm.cardH = window.innerHeight - 325;
          vm.contentH = window.innerHeight - 140;
        })()
      };
    },
    activated() {
      this.queryConfig();
    },
    destroyed () {//离开该页面需要移除这个监听的事件

    },
    computed: {
    },
    methods: {

      //查询过滤方法
      search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            });
            dataClone = res;
          }
        }
        return res;
      },

      toSearch () {
          const vm = this;
          vm.tableNames = vm.tableNameClone.filter(d => {
            return d.toLowerCase().indexOf(vm.searchData.tableName.toLowerCase().trim()) > -1;
          });
      },

      //选择实例
      changeSelectedDB() {
          const vm = this;
        vm.queryAllTables();
      },

      //查询选择的实例中所有的表
      queryAllTables() {
          const vm = this;
        vm.$api.queryAllTables({id: vm.selectedDB}).then(res => {
            vm.tableNames = res.data.list;
          vm.tableNameClone = JSON.parse(JSON.stringify(res.data.list));
            vm.tableLength = res.data.list.length;
        });
      },

      //特殊脱敏01---NC财务
      mask_01_queryNum() {
        const vm = this;
        //查询需脱敏总条数
        vm.$api.mask_01_queryNum().then(res => {
          vm.mask_01_toMasking(res.data.list);
        });
      },

      mask_01_toMasking(sum) {
          const vm = this;
          const pageSize = 100;
          const pageSum = Math.ceil(sum/pageSize);
          vm.msgArr.push('待脱敏总条数为'+sum+'条!');
          vm.msgArr.push('需脱敏'+pageSum+'次!');

          for(let i =0; i < 10; i++) {
            vm.ms_01_dg(pageSum);
          }
      },

      ms_01_dg(pageSum) {
          const vm = this;
          vm.count += 1;

          vm.$api.mask_01_toMasking({count: vm.count}).then(res => {
            if(vm.msgArr.length>10) {
              vm.msgArr.shift();
            }
            vm.msgArr.push('第'+res.data.list+'页脱敏完成!还剩' + (pageSum-res.data.list) +'页待脱敏！');
            if(vm.count < pageSum) {
                vm.ms_01_dg(pageSum);
            }else{
              vm.msgArr.push('任务完成！');
            }

          }).catch((err)=> {
              const vm = this;
              vm.count += 1;
              if(vm.msgArr.length>10) {
                vm.msgArr.shift();
              }
              vm.msgArr.push('超时跳过等待!');
              vm.ms_01_dg(pageSum)
          })
      },

      //选择表
      clickTableName(tableName){
        const vm = this;
        vm.tableName_active = tableName;

        vm.queryOneTableCol();
      },

      //根据表名查询表字段
      queryOneTableCol() {
        const vm = this;
        vm.$api.queryOneTableCol({tableName: vm.tableName_active}).then(res => {
          vm.tableCols = [];
          res.data.list.forEach(e => {
              let obj = {};
              obj.key = e.Field;
              obj.title = e.Field;
              obj.minWidth = '150px';
              vm.tableCols.push(obj);
          });

          vm.queryOneTable();
        });
      },

      //根据表名查询表数据
      queryOneTable() {
        const vm = this;
        vm.loading = true;
        vm.$api.queryOneTable({tableName: vm.tableName_active}).then(res => {
          vm.tableData = res.data.list;
          vm.loading = false;
        }).catch(err => {
          vm.loading = false;
        });
      },


      //查询实例
      queryConfig() {
        const vm = this;

        vm.$api.queryConfig().then(res => {
          vm.config_data = res.data.list;
        });
      },

    }
  }
</script>
