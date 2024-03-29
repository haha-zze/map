<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { bg, avatar, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLoginOrReg = async (formEl: FormInstance | undefined, type: string) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 登录
      if (type === "login") {
        useUserStoreHook()
          .loginByUsername({
            username: ruleForm.username,
            password: "admin123"
          })
          .then(res => {
            if (res.success) {
              loading.value = false;
              initRouter()
                .then(() => {
                  router.push(getTopMenu(true).path);
                  message("登录成功", { type: "success" });
                })
                .catch(err => {
                  console.log(err, "initRouter请求出错");
                });
            } else {
              message("登陆失败", { type: "error" });
            }
          });
      } else {
        // 注册
        useUserStoreHook()
          .register({
            username: ruleForm.username,
            password: ruleForm.password
          })
          .then(res => {
            console.log(res, "注册结果");
            if (res.success) {
              message("注册成功,请登录", { type: "success" });
              activeName.value = "login";
            } else {
              message("注册失败，请稍后重试", { type: "error" });
            }
          })
          .catch(err => {
            console.log(err);
            message("注册失败，请稍后重试", { type: "error" });
          })
          .finally(() => {
            loading.value = false;
          });
      }
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLoginOrReg(ruleFormRef.value, activeName.value);
  }
}

const activeName = ref("login");

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-tabs v-model="activeName" type="card" class="demo-tabs">
            <el-tab-pane label="登录" name="login">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="loginRules"
                size="large"
              >
                <Motion :delay="100">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                      }
                    ]"
                    prop="username"
                  >
                    <el-input
                      clearable
                      v-model="ruleForm.username"
                      placeholder="账号"
                      :prefix-icon="useRenderIcon(User)"
                    />
                  </el-form-item>
                </Motion>

                <Motion :delay="150">
                  <el-form-item prop="password">
                    <el-input
                      clearable
                      show-password
                      v-model="ruleForm.password"
                      placeholder="密码"
                      :prefix-icon="useRenderIcon(Lock)"
                    />
                  </el-form-item>
                </Motion>

                <Motion :delay="250">
                  <el-button
                    class="w-full mt-4"
                    size="default"
                    type="primary"
                    :loading="loading"
                    @click="onLoginOrReg(ruleFormRef, 'login')"
                  >
                    登录
                  </el-button>
                </Motion>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="reg">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="loginRules"
                size="large"
              >
                <Motion :delay="100">
                  <el-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                      }
                    ]"
                    prop="username"
                  >
                    <el-input
                      clearable
                      v-model="ruleForm.username"
                      placeholder="账号"
                      :prefix-icon="useRenderIcon(User)"
                    />
                  </el-form-item>
                </Motion>

                <Motion :delay="150">
                  <el-form-item prop="password">
                    <el-input
                      clearable
                      show-password
                      v-model="ruleForm.password"
                      placeholder="密码"
                      :prefix-icon="useRenderIcon(Lock)"
                    />
                  </el-form-item>
                </Motion>

                <Motion :delay="250">
                  <el-button
                    class="w-full mt-4"
                    size="default"
                    type="primary"
                    :loading="loading"
                    @click="onLoginOrReg(ruleFormRef, 'reg')"
                  >
                    注册
                  </el-button>
                </Motion>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
