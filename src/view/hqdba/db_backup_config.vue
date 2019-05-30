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

  .page {
    margin: 10px;
    float: right;
  }
</style>
<template>
  <div class="content">
    <Row>
      <Col span="24">
        <div class="head clearfix">
          <div class="floatL">
            <Badge status="success" text="实例列表" />
          </div>
          <div class="floatR">
            <Button type="info" @click="addConfigModel">新增实例</Button>
          </div>
        </div>
      </Col>
      <Col span="24">
      <Spin size="large" fix v-if="spinShow"></Spin>
        <Table border :columns="config_columns" :data="config_data"></Table>
      </Col>

      <Col span="24">
      <Page show-total @on-change="pageNumChange" class="page"  :total="page.total" :page-size="page.pageSize" :current="page.pageNum" />
      </Col>
    </Row>

    <Modal
      v-model="config_modal"
      title="新增实例"
      @on-ok="addConfig">
      <Row>
        <Col span="24" class="row-col">
        <span class="col-text">描述名称: </span><Input v-model="config_params.db_describe"  clearable style="width: 200px" />
        </Col>
        <!--<Col span="24" class="row-col">-->
        <!--<span class="col-text">实例名称: </span><Input v-model="config_params.db_name"  clearable style="width: 200px" />-->
      <!--</Col>-->
        <Col span="24" class="row-col">
          <span class="col-text">实例类型: </span><Select v-model="config_params.db_type" style="width:200px">
          <Option v-for="item in db_type_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">IP地址/HOST: </span><Input v-model="config_params.db_host"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">VIP: </span><Input v-model="config_params.db_vip"  clearable style="width: 200px" />
        </Col>
        <!--<Col span="24" class="row-col">-->
          <!--<span class="col-text">用户/USER: </span><Input v-model="config_params.db_user"  clearable style="width: 200px" />-->
        <!--</Col>-->
        <!--<Col span="24" class="row-col">-->
          <!--<span class="col-text">密码/PASSWORD: </span><Input v-model="config_params.db_password"  clearable style="width: 200px" />-->
        <!--</Col>-->
        <!--<Col span="24" class="row-col">-->
          <!--<span class="col-text">端口号/PORT: </span><Input v-model="config_params.db_port"  clearable style="width: 200px" />-->
        <!--</Col>-->
        <!--<Col span="24" class="row-col">-->
          <!--<span class="col-text">SID: </span><Input v-model="config_params.db_sid"  clearable style="width: 200px" />-->
        <!--</Col>-->
        <Col span="24" class="row-col">
          <span class="col-text">备份地址: </span><Input v-model="config_params.db_bk_addr"  clearable style="width: 200px" />
        </Col>
      </Row>
    </Modal>
  </div>



</template>
<script>
export default {
  name: 'db_config',
  data () {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      spinShow: true,
      config_modal: false,
      config_params: {
        db_describe: '',
        db_name: '',
        db_type: '',
        db_host: '',
        db_vip: '',
        db_user: '',
        db_password: '',
        db_port: '',
        db_sid: '',
        db_bk_addr: ''
      },
      db_type_data: [{
        value: 'mysql',
        label: 'mysql',
      },{
        value: 'sqlserver',
        label: 'sqlserver',
      },{
        value: 'oracle',
        label: 'oracle',
      },],
      config_columns:[{
        title: '系统名称',
        key: 'db_describe'
      },
        {
        title: '数据库名称',
        key: 'db_name'
      },
        {
        title: '实例类型',
        key: 'db_type'
      },{
        title: 'IP地址/HOST',
        key: 'db_host'
      },{
        title: 'VIP',
        key: 'db_vip'
      },
//        {
//        title: '用户/USER',
//        key: 'db_user'
//      },{
//        title: '密码/PASSWORD',
//        key: 'db_password'
//      },{
//        title: '端口号/PORT',
//        key: 'db_port'
//      },{
//        title: 'SID',
//        key: 'db_sid'
//      },

        {
        title: '备份地址',
        key: 'db_bk_addr'
      },{
          title: '备份文件标志',
          key: 'db_bk_mark'
        },{
        title: '操作',
        key: '',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  const vm = this;
                  vm.$Modal.confirm({
                      title: '删除',
                      content: '<p>是否确认删除实例信息？</p>',
                      onOk: () => {
                        vm.removeConfig(params.row.id);
                      },
                      onCancel: () => {

                      }
                    });
                  //   console.log(params)
                  // this.removeConfig(params.row.id)
                }
              }
            }, '删除')
          ]);
        }
      },],
      config_data: [],
    }
  },
  mounted () {
    this.queryConfig();
  },
  computed: {
  },
  methods: {

    addConfigModel() {
      this.config_modal = true;
    },

    //新增实例
    addConfig() {
      const vm = this;
      vm.$api.addConfig(vm.config_params).then(res => {
        vm.$Message.success('新增成功！');
        vm.queryConfig();
      });
    },

    //删除实例
    removeConfig(id) {
      const vm = this;
      vm.$api.removeConfig({id: id}).then(res => {
        vm.$Message.success('删除成功！');
        vm.queryConfig();
      }).catch((err) => {
          console.log(err)
      });
    },

    //查询实例
    queryConfig() {
      const vm = this;

      vm.spinShow= true;
      vm.$api.queryConfig(vm.page).then(res => {
          vm.config_data = res.data.data;
          vm.page.total = res.data.total;
          vm.spinShow = false;
      });
    },

    //切换页码
    pageNumChange(num) {
      const vm = this;
      vm.page.pageNum = num;
      vm.queryConfig();
    },
  }
}
</script>
