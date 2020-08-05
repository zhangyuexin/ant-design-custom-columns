<template>
  <div class="hello">
    <div class="table">
      <zyx-table
        class="salesClass"
        :columns="columns"
        :dataSource="dataSource"
        bordered
        :pagination="false"
        :loading="loading"
      >
        <template slot="index" slot-scope="text, record, index">
          <span>{{ (index+1) }}</span>
        </template>
      </zyx-table>
    </div>
  </div>
</template>

<script>
const columns = Object.freeze([
  {
    title: "序号",
    dataIndex: "index",
    scopedSlots: { customRender: "index" },
  },
  {
    title: "列1",
    dataIndex: "a",
  },
  {
    title: "列2",
    dataIndex: "b",
  },
  {
    title: "列3",
    dataIndex: "c",
  },
  {
    title: "列4",
    dataIndex: "d",
  },
  {
    title: "列5",
    dataIndex: "e",
  },
  {
    title: "列6",
    dataIndex: "f",
  },
  {
    title: "列7",
    dataIndex: "g",
  },
]);
export default {
  name: "HelloWorld",
  data() {
    return {
      columns,
      dataSource: [
        {
          a: "1",
          b: "2",
          c: "3",
          d: "4",
          e: "5",
          f: "6",
          g: "7",
        },
        {
          a: "1",
          b: "2",
          c: "3",
          d: "4",
          e: "5",
          f: "6",
          g: "7",
        },
        {
          a: "1",
          b: "2",
          c: "3",
          d: "4",
          e: "5",
          f: "6",
          g: "7",
        },
        {
          a: "1",
          b: "2",
          c: "3",
          d: "4",
          e: "5",
          f: "6",
          g: "7",
        },
        {
          a: "1",
          b: "2",
          c: "3",
          d: "4",
          e: "5",
          f: "6",
          g: "7",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  width: 700px;
  height: 500px;
  margin: 0 auto;
}
</style>
