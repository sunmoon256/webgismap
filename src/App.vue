<template>
    <div id="app">
        <el-container class="app-out-panel">
            <el-header class="sys-header">
                <span>一张图项目系统</span>
                <div class="user-info">
                    <span><i class="el-icon-user"></i></span>
                    <span>当前用户：</span>
                    <span @click="handleUserLogin">{{ username }}</span>
                </div>
            </el-header>
            <el-container class="app-content-panel">
                <el-aside class="sys-menu">
                    <el-menu
                        default-active="1-4-1"
                        class="el-menu-vertical-demo"
                        @select="handleMenuSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :collapse="true"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页大屏</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">一张图</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="sys-map">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="用户登录/注册" :visible.sync="loginDialogVisible" width="30%">
            <div class="login-content">
                <div class="login-content-login" v-show="!loginSwitch">
                    <p>用户名：</p>
                    <el-input placeholder="请输入用户名" v-model="userNameInput" clearable> </el-input>
                    <p>密码：</p>
                    <el-input placeholder="请输入密码" v-model="userPwdInput" show-password> </el-input>
                </div>
                <div class="login-content-insert" v-show="loginSwitch">
                    <p>用户名：</p>
                    <el-input placeholder="请输入用户名" v-model="userNameInsert" clearable> </el-input>
                    <p>密码：</p>
                    <el-input placeholder="请输入密码" v-model="userPwdInsert" show-password> </el-input>
                    <p>手机号：</p>
                    <el-input placeholder="请输入手机号" v-model="userPhoneInsert" clearable> </el-input>
                    <p>邮箱：</p>
                    <el-input placeholder="请输入邮箱地址" v-model="userEmailInsert" clearable> </el-input>
                </div>
            </div>
            <el-switch v-model="loginSwitch" active-text="注 册" inactive-text="登 录"> </el-switch>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="userLogin">{{ loginSwitch ? '注 册' : '登 录' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'App',
    components: {},
    data() {
        return {
            username: '未登录',
            loginDialogVisible: false,
            loginSwitch: false,
            userNameInput: '',
            userPwdInput: '',
            userNameInsert: '',
            userPwdInsert: '',
            userPhoneInsert: '',
            userEmailInsert: '',
        };
    },
    methods: {
        handleMenuSelect(index) {
            if (index === '1') {
                // 跳转到首页大屏
                this.$router.push('/');
            } else if (index === '2') {
                // 跳转到一张图
                this.$router.push('/onemap');
            }
        },

        // 用户登录界面弹出
        handleUserLogin() {
            this.loginDialogVisible = true;
        },
        // 用户登录
        userLogin() {
            const _self = this;

            if (!this.loginSwitch) {
                // 用户登录
                const name = _self.userNameInput;
                const pwd = _self.userPwdInput;
                axios
                    .get('http://localhost:3001/user/get', {
                        params: {
                            name: name,
                        },
                    })
                    .then(function (response) {
                        if (response.data.status === 'success') {
                            const password = response.data.data[0].pwd;
                            if (password === pwd) {
                                _self.$message({
                                    message: '恭喜你，登录成功',
                                    type: 'success',
                                });
                                _self.username = response.data.data[0].name;
                                _self.loginDialogVisible = false;
                            } else {
                                _self.$message.error('登录失败，用户名或密码错误');
                            }
                        }
                    })
                    .catch(function (error) {
                        _self.loginDialogVisible = false;
                        console.log(error);
                    });
            } else {
                // 用户注册
                const name = _self.userNameInsert;
                const pwd = _self.userPwdInsert;
                const phone = _self.userPhoneInsert;
                const email = _self.userEmailInsert;
                if (!name || !pwd) {
                    _self.$message({
                        message: '请填写用户名或密码',
                        type: 'warning',
                    });
                    return;
                }
                axios
                    .post(
                        'http://localhost:3001/user/post',
                        qs.stringify({
                            name,
                            pwd,
                            phone,
                            email,
                        }),
                    )
                    .then(function (response) {
                        if (response.data.status === 'success') {
                            _self.$message({
                                message: '用户注册成功，请登录',
                                type: 'success',
                            });
                            _self.loginSwitch = false;
                            _self.userNameInsert = '';
                            _self.userPwdInsert = '';
                            _self.userPhoneInsert = '';
                            _self.userEmailInsert = '';
                        } else {
                            _self.message.error('用户注册失败');
                        }
                    })
                    .catch(function (error) {
                        _self.loginDialogVisible = false;
                        console.log(error);
                    });
            }
        },
    },
};
</script>

<style>
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0px;
    /* 设置margin是为了去除Google浏览器自带的8像素外边距 */
}
.app-out-panel,
.app-content-panel {
    height: 100%;
}
.sys-header {
    background-color: #32373e;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
}
.user-info {
    font-size: 14px;
}
.user-info > span:last-child:hover {
    color: aqua;
    cursor: pointer;
}
.sys-menu {
    background-color: #545c64;
    /* background-color: #fff; */
    width: 64px !important;
    overflow: hidden !important;
    /* 是否隐藏水平滚动条 */
    /* background-color: #c0c4cc; */
}
.sys-map {
    padding: 5px !important;
}
.morescreen-view {
    width: 100%;
    height: 820px;
}
</style>
