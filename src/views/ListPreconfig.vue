<template>
    <div>

        <el-table :data="preconfigs">
        <el-table-column prop="mac" label="物理地址" width="140">
        </el-table-column>
        <el-table-column prop="lanport" label="lan端口号" width="120">
        </el-table-column>
        <el-table-column prop="vlanmode" label="vlan模式">
        </el-table-column>
        <el-table-column prop="servicetype" label="服务类型">
        </el-table-column>
        <el-table-column prop="vlanid" label="vlanID">
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间">
        </el-table-column>
        <el-table-column prop="" label="触发时间">
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
    }
  },

  created () {
    this.fetch()
  }
}
</script>
