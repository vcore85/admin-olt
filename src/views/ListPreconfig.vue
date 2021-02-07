<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="MAC查询">
        <el-input
          v-model="mac_tmp"
          placeholder="输入光猫MAC"
          @keypress.enter.native="searchmac(mac_tmp)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchmac(mac_tmp)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="filterTable" :data="preconfigs">
      <el-table-column prop="oltname" label="所属OLT" width="120">
      </el-table-column>
      <el-table-column prop="mac" label="物理地址" width="150" sortable>
      </el-table-column>
      <el-table-column prop="lanport" label="lan端口" width="80">
      </el-table-column>
      <el-table-column
        prop="vlanmode"
        label="vlan模式"
        width="120"
        :filters="[
          { text: 'tag', value: 'tag' },
          { text: '透传', value: '透传' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="servicetype"
        label="服务类型"
        width="120"
        :filters="[
          { text: 'unicast', value: 'unicast' },
          { text: 'multicast', value: 'multicast' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="vlanid" label="vlanID" width="120" sortable>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="160" sortable>
      </el-table-column>
      <el-table-column
        prop="status"
        label="配置状态"
        width="100"
        :filters="[
          { text: '未配置', value: '未配置' },
          { text: '已完成', value: '已完成' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="finishtime" label="配置时间" width="160" sortable>
      </el-table-column>
      <el-table-column prop="message" label="备注"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row._id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      preconfigs: [],
      mac_tmp: "",
    };
  },
  methods: {
    fetch() {
      this.$http.get(`onu/preconfig`).then((res) => {
        this.preconfigs = res.data;
      });
    },
    searchmac(mac) {
      if (mac != null && mac != "")
        this.$http.get(`onu/preconfig/searchmac/${mac}`).then((res) => {
          this.preconfigs = res.data;
        });
      else this.fetch();
    },

    edit(id) {
      this.$router.push(`/onu/edit/${id}`);
    },
    remove(id) {
      this.$http.delete(`onu/preconfig/${id}`).then((res) => {
        this.$message({
          message: "预配置删除成功",
          type: "success",
        });
        this.fetch();
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
  },

  created() {
    this.fetch();
  },
};
</script>
