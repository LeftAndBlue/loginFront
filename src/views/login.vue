<template>
  <div class="container">
    <el-input v-model="Email" size="large" placeholder="Please input Email" />
    <div style="margin: 20px 0" />
    <el-input
      v-model="PassWord"
      type="password"
      size="large"
      placeholder="Please input password"
      show-password
    />
    <el-button type="primary" size="large" @click="Submit">登录</el-button>
    <el-button type="primary" size="large">注册</el-button>
  </div>
</template>
<script lang="ts" setup>
import { CheckLoginInfo } from "@/Common/api";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const $router = useRouter();
const Email = ref("");
const PassWord = ref("");

const Submit = async () => {
  try {
    const res = await CheckLoginInfo({
      EMAIL: Email.value,
      PASSWORD: PassWord.value,
    });
    if (res === null) {
      ElMessage({
        showClose: true,
        message: "账号或密码错误",
        type: "error",
      });
    } else {
      $router.push("/index");
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};
</script>
<style>
/* 设置背景颜色为白色 */
body {
  background-color: white;
  margin: 0; /* 移除默认的 body 外边距 */
  font-family: Arial, sans-serif; /* 设置字体 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使 body 高度为视口高度 */
}

.container {
  padding: 20px; /* 添加一些内边距 */
  border: 1px solid black;
  border-radius: 10px;
}

.el-button {
  margin: 12px;
  width: 35%;
}
</style>
