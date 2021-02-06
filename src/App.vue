<template>
<el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-setting"></i>光纤业务配置系统</template>
        <el-submenu index="1-4">
          <template slot="title">ONU预配置</template>
          <el-menu-item index="/onu/index">查看ONU预配置</el-menu-item>
          <el-menu-item index="/onu/create">新增ONU预配置</el-menu-item>
        </el-submenu>
      </el-submenu>

    </el-menu>
  </el-aside>

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>鞍山分公司技术部</span>
    </el-header>

    <el-main>
      <router-view></router-view>

    </el-main>
  </el-container>
</el-container>
</template>

<style>
html,body{
  padding:0;
  margin:0;
}

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
