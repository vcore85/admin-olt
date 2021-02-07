<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-row>
        <el-col :span="12"
          ><div style="text-align: left; font-size: 20px">
            <span>光纤业务管理系统 </span>
          </div></el-col
        >

        <el-col :span="12"
          ><div>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu> </el-dropdown
            ><span>鞍山分公司技术部</span>
          </div></el-col
        >
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-setting"></i>ONU预配置</template
            >
            <el-menu-item-group>
              <el-menu-item index="/onu/preconfig/index"
                >查看ONU预配置</el-menu-item
              >
              <el-menu-item index="/onu/preconfig/add"
                >新增ONU预配置</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-setting"></i>区域管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="/area/index">查看区域</el-menu-item>
              <el-menu-item index="/area/add">新增区域</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>
