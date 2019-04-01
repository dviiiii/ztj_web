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
  <div  class="content">
  <Row>
    <Col span="24">
      <div class="head clearfix">
        <div class="floatL">
          <Badge status="success" text="备份列表" />
        </div>
      </div>
    </Col>
    <Col span="24">
      <Table width="100%" border :columns="bk_info_columns" :data="bk_info"></Table>
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
      bk_info_columns:[{
        title: '行号',
        type: 'index',
        width: 60
      },{
        title: '描述名称',
        key: 'db_describe'
      },{
      title: '实例名称',
        key: 'db_name'
    },{
      title: '实例类型',
        key: 'db_type'
    },{
        title: 'VIP',
        key: 'db_vip'
      },{
      title: 'IP地址/HOST',
        key: 'db_host'
    },{
        title: '文件名',
        key: 'file_name',
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
        title: '文件大小',
        key: 'file_size',
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
        render: (h, params) => {
          return h('div', dateFormat(params.row.create_time));
        }
      },{
      title: '备份地址',
        key: 'db_bk_addr'
    }],
    }
  },
  mounted () {
    const vm = this;
    vm.queryBkInfo();
  },
  methods: {
    //查询备份文件信息
    queryBkInfo() {
      const vm = this;

      vm.$api.queryBkInfo().then(res => {

        vm.bk_info = res.data.data;
      });
    },
  }
}
</script>
