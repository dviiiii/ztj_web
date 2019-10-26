<style scoped>
  .expand-row{
    /*margin-bottom: 16px;*/
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <!--<Slider v-model="progess" range></Slider>-->
      <span v-for="item in progess">
        {{item[0]}}-{{item[1]}}
      </span>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    },
    data () {
      return {
        progess: [],
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        const vm = this;
        vm.getProgessInfo()
      },

      getProgessInfo() {
        const vm = this;
        vm.$api.getProgessInfo(vm.row)
          .then(function (res) {
            vm.progess = vm.getProArr(res.data.list);
          })
          .catch(function (error) {
            console.log(error);
            vm.$Message.error('服务器错误！');
          });
      },

      getProArr(arr) {
        let result = [];
        let beginNum = arr[0];
        let endNum;
        arr.forEach((val,index, thisArr) => {
          if(val +1 !== thisArr[index+1]) {
            endNum = val;
            result.push([beginNum, endNum]);
            beginNum = thisArr[index+1];
          }
        })

        return result
      }
    }
  };
</script>
