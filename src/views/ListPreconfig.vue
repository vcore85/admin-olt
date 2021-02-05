<template>
    <div>
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table ref="filterTable" :data="preconfigs">
        <el-table-column prop="mac" label="物理地址" width="140" :filter-method="filterHandler" sortable>
        </el-table-column>
        <el-table-column prop="lanport" label="lan端口号" width="120">
        </el-table-column>
        <el-table-column prop="vlanmode" label="vlan模式" sortable :filters="[{ text: 'tag', value: 'tag' }, { text: '透传', value: '透传' }]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="servicetype" label="服务类型" :filters="[{ text: 'unicast', value: 'unicast' }, { text: 'multicast', value: 'multicast' }]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="vlanid" label="vlanID" sortable>
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间"  sortable>
        </el-table-column>
        <el-table-column prop="status" label="配置状态" :filters="[{ text: '未配置', value: '未配置' }, { text: '已完成', value: '已完成' }]" :filter-method="filterHandler" >
        </el-table-column>
        <el-table-column prop="finishtime" label="配置时间" sortable>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      </div>

</template>

<script>
export default {
  data () {
    return {
      preconfigs: []
    }
  },
  methods: {
    fetch() {
      this.$http.get(`onu/preconfig`).then(res => {
      this.preconfigs = res.data
    })
    },
    edit(id){
      this.$router.push(`/onu/edit/${id}`)

    },
    remove(id){
      this.$http.delete(`onu/preconfig/${id}`).then(res => {
          this.$message({
          message: '预配置删除成功',
          type: 'success'
        })
      this.fetch()
      })
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
  },

  created () {
    this.fetch()
  }
}
</script>
