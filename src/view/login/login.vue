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
import { setToken } from '@/libs/util'

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
        setToken(res.data.token);
        //获取用户信息
        vm.$api.getUserInfo().then(res => {

          vm.$router.push({
            name: this.$config.homeName
          })
        })
      }).catch((err) => {
          vm.$Message.error(err.response.data.msg);
      });
    }
  }
}
</script>

<style>

</style>
