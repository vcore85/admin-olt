<template>
  <el-form
    ref="form"
    :model="onupreconfig"
    label-width="80px"
    style="width: 300px"
  >
    <el-form-item label="物理地址">
      <el-input
        v-model="onupreconfig.mac"
        placeholder="请输入光猫MAC地址"
      ></el-input>
    </el-form-item>
    <el-form-item label="lan端口号">
      <el-select v-model="onupreconfig.lanport" placeholder="请选择lan端口号">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="vlan模式">
      <el-select v-model="onupreconfig.vlanmode" placeholder="请选择vlan模式">
        <el-option label="tag" value="tag"></el-option>
        <el-option label="透传" value="透传"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="服务类型">
      <el-select
        v-model="onupreconfig.servicetype"
        placeholder="请选择服务类型"
      >
        <el-option label="unicast" value="unicast"></el-option>
        <el-option label="multicast" value="multicast"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="vlanID">
      <el-input v-model="onupreconfig.vlanid"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="savePreconfig">立即创建</el-button>
      <el-button @click="goback()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      onupreconfig: {},
    };
  },
  methods: {
    savePreconfig() {
      this.$http.post("onu/preconfig", this.onupreconfig).then((res) => {
        // eslint-disable-line no-unused-vars
        this.$message({
          message: "预配置创建成功",
          type: "success",
        });
        this.$router.push("/onu/preconfig/index");
      });
    },
    goback() {
      this.$router.push("/onu/preconfig/index");
    },
  },
};
</script>
