<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="区域查询">
        <el-input
          v-model="name"
          placeholder="输入区域名称"
          @keypress.enter.native="searchname(name)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchname(name)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="filterTable" :data="areas">
      <el-table-column prop="name" label="区域名称" width="150">
      </el-table-column>
      <el-table-column prop="level" label="区域级别" width="150" sortable>
      </el-table-column>
      <el-table-column prop="parents[0].name" label="上级区域" width="150">
      </el-table-column>
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
      areas: [],
      name: "",
    };
  },
  methods: {
    fetch() {
      this.$http.get(`area/parent`).then((res) => {
        this.areas = res.data;
      });
    },
    searchname(name) {
      if (name != null && name != "")
        this.$http.get(`area/searchname/${name}`).then((res) => {
          this.areas = res.data;
        });
      else this.fetch();
    },

    edit(id) {
      this.$router.push(`/area/edit/${id}`);
    },
    remove(id) {
      this.$http.delete(`area/${id}`).then((res) => {
        this.$message({
          message: "区域删除成功",
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
    statusFormatter(row, column) {
      let status = row.status;
      if (status === false) {
        return "未配置";
      } else {
        return "已配置";
      }
    },
  },

  created() {
    this.fetch();
  },
};
</script>
