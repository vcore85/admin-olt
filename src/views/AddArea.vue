<template>
  <el-form ref="form" :model="area" label-width="80px" style="width: 300px">
    <el-form-item label="区域名称">
      <el-input
        v-model="area.name"
        placeholder="请输入区域名称（市级分公司、区域分公司）"
      ></el-input>
    </el-form-item>
    <el-form-item label="区域级别">
      <el-tooltip
        class="item"
        effect="light"
        content="1级为市级分公司，2级为区级分公司"
        placement="right"
      >
        <el-select
          v-model="area.level"
          placeholder="请选择区域级别"
          @change="changeLevel"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="上级区域">
      <el-select
        v-model="area.parent"
        filterable
        remote
        automatic-dropdown
        placeholder="请输入上级区域查询"
        :remote-method="remoteMethod"
        :loading="loading"
        @focus="remoteMethodClick"
        @change="updateForce"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveArea">立即创建</el-button>
      <el-button @click="goback()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      area: {},
      options: [],
      arealist: [],
      loading: false,
      value: [],
      areatmp: {},
    };
  },
  methods: {
    async fetchparent(areaid) {
      await this.$http.get(`area/searchid/${areaid}`).then((res) => {
        this.areatmp = res.data;
      });
    },
    async saveArea() {
      this.area.fullname = this.area.name;
      let parenttmp = "";
      if (this.area.parent === "") {
        this.area.parent = null;
      } else {
        parenttmp = this.area.parent;
        this.areatmp = this.area;
        for (let i = this.area.level; i > 1; i--) {
          await this.fetchparent(this.areatmp.parent);
          this.area.fullname = this.areatmp.name + this.area.fullname;
        }
      }
      this.$http.post("area", this.area).then((res) => {
        this.$message({
          message: "区域创建成功",
          type: "success",
        });
        this.$router.push("/area/index");
      });
    },

    remoteMethod(query) {
      if (query !== "" && !isNaN(this.area.level)) {
        this.$http
          .get(`area/searchlevel/${this.area.level - 1}`)
          .then((res) => {
            let aa = res.data;
            aa.map((item) => {
              this.arealist.push({
                label: item.name,
                value: item._id,
              });
            });
          });
        this.loading = true;
        this.arealist = [];
        setTimeout(() => {
          this.loading = false;
          this.options = this.arealist.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    remoteMethodClick(query) {
      if (!isNaN(this.area.level)) {
        this.$http
          .get(`area/searchlevel/${this.area.level - 1}`)
          .then((res) => {
            let aa = res.data;
            aa.map((item) => {
              this.arealist.push({
                label: item.name,
                value: item._id,
              });
            });
          });
        this.loading = true;
        this.arealist = [];
        setTimeout(() => {
          this.loading = false;
          this.options = this.arealist;
        }, 200);
      }
    },
    changeLevel() {
      this.options = [];
      this.area.parent = "";
    },
    updateForce() {
      this.$forceUpdate();
    },
  },
};
</script>
