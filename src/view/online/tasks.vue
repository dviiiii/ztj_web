
<template>
    <div class="main">
      <div class="content c1">
        <div class="c-head h1">
          <span>很重要-很紧急</span>
          <Icon type="ios-add" class="task-add" />
        </div>
      </div>
      <div class="content c2">
        <div class="c-head h2">
          <span>重要-不紧急</span>
          <Icon type="ios-add" class="task-add" />
        </div>
      </div>
      <div class="content c3">
        <div class="c-head h3">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add" />
        </div>
      </div>
      <div class="content c4">
        <div class="c-head h4">
          <span>不重要-紧急</span>
          <Icon type="ios-add" class="task-add" />
        </div>
      </div>
    </div>
</template>

<script>

    export default {
        name: 'tasks',
        data () {
            return {

            }
        },
        mounted () {
          this.source_bk_test();
        },
        methods: {
          //自动还原测试
          source_bk_test () {
            const vm = this;
            vm.$api.source_bk_test()
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

</style>

<style>
  .content-wrapper {
    background: #ffffff;
  }
</style>
