<template>
  <div>
    <el-row align="middle">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10">
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
      </el-col>
      <el-col
        :xs="2"
        :sm="2"
        :md="2"
        :lg="2"
        :xl="2"
        align="middle"
        vertical-align="middle"
      >
        按MAC搜索:
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="4">
        <el-input placeholder="请输入内容" v-model="mac_tmp">
          <el-button
            slot="append"
            @click="searchmac(mac_tmp)"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
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
<style>
.el-row {
  margin-bottom: 20px;
  height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;

  height: 40px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

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
