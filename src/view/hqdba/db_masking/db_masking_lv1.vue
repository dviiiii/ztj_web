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

</style>
<template>
  <div class="content" :style="{minHeight: contentH+'px'}">
    <Row>
      <Col span="24" >
      <div class="head clearfix">
        <div class="floatL">
          <Badge status="success" text="简单数据脱敏" />
        </div>
        <div class="floatR">
          <Button type="info" @click="selectMasking">选择脱敏规则</Button>
        </div>
      </div>
      </Col>
      <Col span="4">
      <div style="background:#eee;">
        <Card :bordered="true" >
          <p slot="title">选择实例 <span class="title-tips">共{{tableLength}}张表</span></p>

          <div class="table-name-row">
            <Select v-model="selectedDB" filterable @on-change="changeSelectedDB">
              <Option v-for="item in config_data" :value="item.id" :key="item.id">{{ item.db_name }}</Option>
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
      <Col span="20">
      <Table :loading="loading" :height="tableH" :show-header="false" ref="tableData_table" border :columns="tableCols" :data="tableData" style="width: 100%">
        <div slot="header">
          <RadioGroup v-model="maskCol" type="button" class="col-head" ref="RadioG">
            <Radio style="width:150px;" :label="col.key" v-for="col in tableCols"></Radio>
          </RadioGroup>
        </div>
      </Table>
      </Col>
    </Row>

    <Modal
      class="masking-modal"
      v-model="masking_modal"
      title="选择脱敏规则"
    @on-ok="toMasking">
      <Row>
        <Col span="24" class="row-col">
          <span class="col-text">依赖主键: </span><Select v-model="params.masking_key" style="width:200px;">
          <Option v-for="item in tableCols" :value="item.key" :key="item.key">{{ item.key }}</Option>
        </Select>
        </Col>
        <Col span="24" class="row-col">
        <span class="col-text">脱敏规则: </span><Select v-model="params.masking_type" style="width:200px;">
        <Option v-for="item in masking_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
        </Col>
        <Col span="24" class="row-col">
        <span class="col-text">可选参数: </span><Input v-model="params.other"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
        <span >当可选参数为随机数时，在可选参数填写三个参数【最小值，最大值，小数位数】</span>
        </Col>
        <Col span="24" class="row-col">
        <span>当可选参数为枚举时，在可选参数填写枚举的选项，如【男，女】</span>
        </Col>
        <Col span="24" class="row-col">
        <span>用逗号隔开</span>
        </Col>
        <Col span="24" class="row-col">
          <span >当可选参数为固定值时，在可选参数填写数值即可</span>
        </Col>
      </Row>
    </Modal>
  </div>



</template>
<script>
  export default {
    name: 'db_masking_lv1',
    data () {
      return {
        loading: false,
        tableLength: 0,
        tableH: '',
        contentH: '',
        cardH:'',
        tbody: '',
        masking_modal: false,
        selectedDB: '',
        tableNames: [],
        tableName_active: '',
        tableCols: [],
        tableData: [],
        maskCol:'',
        params: {
          masking_key: '',
          masking_type: '',
          other: '',

        },
        masking_type: [{
          value: 'get_phone_num',
          label: '手机号',
        },{
          value: 'getName',
          label: '姓名',
        },{
          value: 'getGennerator',
          label: '身份证号',
        },{
          value: 'getEmail',
          label: '邮箱',
        },{
          value: 'getRandomNumber',
          label: '随机数',
        },{
          value: 'getEnum',
          label: '枚举',
        },{
          value: 'getFixedValue',
          label: '固定值',
        }],
        config_data: [],
      }
    },
    mounted () {
        const vm = this;

      vm.tbody = vm.$refs.tableData_table.$refs.body;
      vm.tbody.addEventListener('scroll', this.handleScroll);

      console.log(vm.$refs.tableData_table.$refs.body)
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
      const vm = this;
      vm.tbody.removeEventListener('scroll', this.handleScroll)
    },
    computed: {
    },
    methods: {

        //监听滚动条
      handleScroll() {
          const vm = this;
        let offsetLeft = vm.tbody.scrollLeft;
        vm.$refs.RadioG.$el.style.right = offsetLeft + 'px';
      },

      selectMasking() {
        this.masking_modal = true;
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
            vm.tableLength = res.data.list.length;
        });
      },

      //选择表
      clickTableName(tableName) {
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

      //开始脱敏
      toMasking() {
        const vm = this;
        let par = {
            tableName: vm.tableName_active,
            tableCol: vm.maskCol,
            masking_type: vm.params.masking_type,
            masking_key: vm.params.masking_key,
            masking_other: vm.params.other,
        };


        par.masking_other = vm.params.other.split(',');


        if(!par.tableName) {
            vm.$Message.warning('请先选择表！');
            return false;
        }

        if(!par.tableCol) {
          vm.$Message.warning('请先选择列！');
          return false
        }

        if(!par.masking_type) {
          vm.$Message.warning('请先选择脱敏规则！');
          return false
        }

        vm.$api.toMasking(par).then(res => {

          vm.queryOneTable();
        });
      }
    }
  }
</script>
