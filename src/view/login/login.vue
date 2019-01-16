<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">折腾记</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      //点击登录
      const vm = this;
      vm.$api.login({userName, password}).then(res => {
        console.log(res)
      });
//      this.handleLogin({ userName, password }).then(res => {
//        //获取用户信息
//        this.getUserInfo().then(res => {
//          this.$router.push({
//            name: this.$config.homeName
//          })
//        })
//      })
    }
  }
}
</script>

<style>

</style>
