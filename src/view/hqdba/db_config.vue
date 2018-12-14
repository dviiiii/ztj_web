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
        <Table border :columns="config_columns" :data="config_data"></Table>
      </Col>
    </Row>

    <Modal
      v-model="config_modal"
      title="新增实例"
      @on-ok="addConfig">
      <Row>
        <Col span="24" class="row-col">
        <span class="col-text">数据库名称: </span><Input v-model="config_params.db_name"  clearable style="width: 200px" />
      </Col>
        <Col span="24" class="row-col">
          <span class="col-text">实例类型: </span><Select v-model="config_params.db_type" style="width:200px">
          <Option v-for="item in db_type_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">IP地址/HOST: </span><Input v-model="config_params.db_host"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">用户/USER: </span><Input v-model="config_params.db_user"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">密码/PASSWORD: </span><Input v-model="config_params.db_password"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">端口号/PORT: </span><Input v-model="config_params.db_port"  clearable style="width: 200px" />
        </Col>
        <Col span="24" class="row-col">
          <span class="col-text">SID: </span><Input v-model="config_params.db_sid"  clearable style="width: 200px" />
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
      config_modal: false,
      config_params: {
        db_name: '',
        db_type: '',
        db_host: '',
        db_user: '',
        db_password: '',
        db_port: '',
        db_sid: ''
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
        title: '数据库名称',
        key: 'db_name'
      },{
        title: '实例类型',
        key: 'db_type'
      },{
        title: 'IP地址/HOST',
        key: 'db_host'
      },{
        title: '用户/USER',
        key: 'db_user'
      },{
        title: '密码/PASSWORD',
        key: 'db_password'
      },{
        title: '端口号/PORT',
        key: 'db_port'
      },{
        title: 'SID',
        key: 'db_sid'
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
      console.log(vm.config_params)
      vm.$api.addConfig(vm.config_params).then(res => {
        console.log(res)
        vm.queryConfig();
      });
    },

    //查询实例
    queryConfig() {
      const vm = this;

      vm.$api.queryConfig().then(res => {
          vm.config_columns = res;
        console.log(res)
      });
    }
  }
}
</script>
