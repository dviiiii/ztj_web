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

  .date-picker {
    float: right;
    padding: 10px;
    width: 200px;
  }
</style>
<template>
  <div  class="content">
  <Row>
    <Col span="24">
      <div class="head clearfix">
        <div class="floatL">
          <Badge status="success" text="备份列表" />
        </div>
        <DatePicker @on-change="selectDate" class="date-picker" type="date" placeholder="选择日期"></DatePicker>
      </div>
    </Col>
    <Col span="24">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Table width="100%" :height="tHeight" border :columns="bk_info_columns" :data="bk_info"></Table>
    </Col>
    <Col span="24">

      <Page show-total @on-change="pageNumChange" class="page"  :total="page.total" :page-size="page.pageSize" :current="page.pageNum" />
    </Col>
  </Row>
  </div>
</template>
<script>
import {dateFormat} from '@/libs/util'
export default {
  name: 'db_backip',
  data () {
    return {
      bk_info: [],
      tHeight: 500,
      bk_info_columns: [],
      page: {
        pageSize: 40,
        pageNum: 1,
        date: dateFormat(new Date()),
        total: 0
      },
      spinShow: true
    }
  },
  mounted () {
    const vm = this;

    vm.initPage();
  },
  methods: {

    //初始化页面
    initPage() {
      const vm = this;
      vm.setTHeight();
      vm.setColums();
      vm.queryBkInfo();
    },

    //设置表格高度
    setTHeight() {
      const wH = window.innerHeight;
      this.tHeight = wH - 250;
    },

    //切换页码
    pageNumChange(num) {
      const vm = this;
      vm.page.pageNum = num;
      vm.queryBkInfo();
    },

    //选择日期
    selectDate(date) {
      const vm = this;
      vm.page.date = date + ' 08:00:00'
      vm.queryBkInfo();
    },

    //设置表格字段
    setColums() {
      const vm = this;
      vm.bk_info_columns = [{
        title: '行号',
        type: 'index',
        width: 60
      },{
        title: '描述名称',
        key: 'db_describe',
        width: 160
      },{
        title: '实例名称',
        key: 'db_name',
        width: 160
      },{
        title: '实例类型',
        key: 'db_type',
        width: 100
      },{
        title: 'VIP',
        key: 'db_vip',
        width: 120
      },{
        title: 'IP地址/HOST',
        key: 'db_host',
        width: 120
      },{
        title: '文件名',
        key: 'file_name',
        width: 280,
        render: (h, params) => {
          if(!params.row.file_name) {
            return h('Tag', {
              attrs: {
                color: 'error',
                title: '无备份文件'
              }
            }, '备份异常');
          }else {
            return h('div', params.row.file_name);
          }
        }
      },{
        title: '文件大小(KB)',
        key: 'file_size',
        width: 160,
        render: (h, params) => {
          const vm = this;
          const thisVIP = params.row.db_vip;
          const thisFileName = params.row.file_name;
          const thisFileSize = params.row.file_size;
          const preVIP = params.index -1 >= 0? vm.bk_info[params.index -1].db_vip : '';
          const preFileName = params.index -1 >= 0?vm.bk_info[params.index -1].file_name : '';
          const preFileSize = params.index -1 >= 0?vm.bk_info[params.index -1].file_size: '';
          if(thisVIP === preVIP && thisFileName === preFileName && thisFileSize !== preFileSize) {
            return h('Tag', {
              attrs: {
                color: 'error',
                title: '文件大小[' + params.row.file_size + 'KB]，与上节点相差[' + (thisFileSize-preFileSize) + 'KB]'
              }
            }, '同步异常');
          }

          if(params.row.file_size < 100) {
            return h('Tag', {
              attrs: {
                color: 'warning',
                title: params.row.file_size + 'KB'
              }
            }, params.row.file_size + 'KB');
          }else {
            return h('div', params.row.file_size);
          }
        }
      },{
        title: '创建时间',
        key: 'create_time',
        width: 180,
        render: (h, params) => {
          return h('div', dateFormat(params.row.create_time));
        }
      },{
        title: '备份地址',
        key: 'db_bk_addr',
        width: 280,
      }];
    },

    //查询备份文件信息
    queryBkInfo() {
      const vm = this;
      vm.spinShow = true;
      vm.$api.queryBkInfo(vm.page).then(res => {
        vm.spinShow = false;
        vm.bk_info = res.data.data;
        vm.page.total = res.data.total
      });
    },
  }
}
</script>
