<script>
/**
 * 该组件为实现table可选列。
 * 具体操作见下方注释。
 * 全部集成原a-table功能，使用方式与原a-table完全相同，扩展增加了可选列功能
 * 该组件已注册至全局，使用方式只需将a-table变为zyx-table即可，等等一系列原写法不变，即可增加该功能.
 * 采用rander函数模式写，为了实现a-table中slot可动态。
 * author:张跃鑫
 */
export default {
  name: 'Table',
  data () {
    return {
      modalVisible: false, // 弹窗
      columns: [], // 表格的列，根据条件来操作该字段
      selectList: [], // 已选择的列
      temporarySelectData: [], // 暂时选择的列，点击checkbox暂存到该字段，点确定同步到selectList
      checkboxList: []// checkbox的list，也做总数据来使用
    }
  },
  mounted () {
    /**
     * 挂载后，将原columns复制到本页columns，checkboxList
     *          将selectList赋值全选状态
     */
    this.columns = this.deepClone(this.$attrs.columns)
    this.checkboxList = this.deepClone(this.$attrs.columns)
    this.selectList = this.columns.map(ele => ele.dataIndex)
  },
  methods: {
    /**
     * 打开modal，将checkbox默认值或者是选择值（暂存）重新赋值
     */
    handelOpenSelect () {
      this.temporarySelectData = this.deepClone(this.selectList)
      this.modalVisible = true
    },
    /**
     * 点击确定，将暂存值赋值（temporarySelectData）给已选择的列（selectList）
     * 将列（columns）根据已选择的列（selectList）筛选出来
     */
    handleOk () {
      this.selectList = this.deepClone(this.temporarySelectData)
      this.modalVisible = false
      this.columns = this.checkboxList.filter(ele => this.selectList.includes(ele.dataIndex))
    },
    handleCancel () {
      this.modalVisible = false
    },
    handelChange (e) {
      this.temporarySelectData = this.deepClone(e)
    },
    deepClone (target) {
      let result
      if (typeof target === 'object') {
        if (Array.isArray(target)) {
          result = []
          for (const i in target) {
            result.push(this.deepClone(target[i]))
          }
        } else if (target === null) {
          result = null
        } else if (target.constructor === RegExp) {
          result = target
        } else {
          result = {}
          for (const i in target) {
            result[i] = this.deepClone(target[i])
          }
        }
      } else {
        result = target
      }
      return result
    }
  },
  render () {
    const props = { ...this.$attrs, ...this.$props, ...{ columns: this.columns } }
    const on = { ...this.$listeners }

    const slots = Object.keys(this.$slots).map(slot => {
      return (
        <template slot={slot}>{ this.$slots[slot] }</template>
      )
    })

    const table = (
      <a-table props={props} scopedSlots={ this.$scopedSlots } on={on} ref="zyxTable">
        {slots}
      </a-table>
    )

    const changeDiv = (
      <a-button class="select-columns" size="small" onClick={this.handelOpenSelect}>列</a-button>
    )

    const checkboxArr = []
    for (let i = 0; i < this.checkboxList.length; i++) {
      checkboxArr.push(<a-col span={8}><a-checkbox value={this.checkboxList[i].dataIndex}>{this.checkboxList[i].title}</a-checkbox></a-col>)
    }
    const modal = (
      <a-modal
        title="设置列"
        visible={this.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <a-checkbox-group value={this.temporarySelectData} onChange={this.handelChange}>
          <a-row>
            {checkboxArr}
          </a-row>
        </a-checkbox-group>
      </a-modal>
    )

    return (
      <div class="zyx-table">
        { table }
        { changeDiv }
        { modal }
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.zyx-table{
  position: relative;
  margin-top: 20px;

  .select-columns{
    position: absolute;
    left: 0;
    top: -30px;
  }
}

.ant-row{
  width: 100%;

  .ant-col-8{
    margin-bottom: 10px;
  }
}

.ant-checkbox-group{
  width: 100%;
}
</style>
