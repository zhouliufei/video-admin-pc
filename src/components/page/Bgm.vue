<template>
    <div>
        <div style="height: 50px;background-color: white">
            <div style="font-size:24px;height: 50px;line-height: 50px;margin-left: 10px">夜风小程序 >> bgm管理</div>
        </div>
        <div style="height: 10px;"></div>
        <div style="background: white;height: 50px;">
            <div class="search_div">作者: <el-input v-model="search.author" placeholder="请输入歌曲作者"  class="search_input"></el-input></div>
            <div class="search_div">歌名: <el-input v-model="search.name" placeholder="请输入歌曲名称" class="search_input"></el-input></div>
            <div class="search_div">
                <span class="demonstration">起始时间: </span>
                <el-date-picker
                        v-model="search.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00"
                class="search_input">
                </el-date-picker>
            </div>
            <div class="search_div">
                <span class="demonstration">结束时间: </span>
                <el-date-picker
                        v-model="search.endTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00"
                        class="search_input">
                </el-date-picker>
            </div>
            <div style="float: left;padding-top: 5px;padding-left: 30px;">
                <el-button size="medium " type="primary" icon="el-icon-search" @click="searchInfo">查询</el-button>
            </div>
            <div style="float: left;padding-top: 5px;padding-left: 143px;">
                <el-button  icon="el-icon-circle-plus-outline" size="medium" type="success"  @click="dialogFormVisible = true">新增</el-button>
            </div>

        </div>
        <div style="height: 10px;"></div>
        <el-table
                :data="tableData"
                :show-header="true"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="作者"
                    align="center"
                    prop="author">
            </el-table-column>
            <el-table-column
                    label="歌名"
                    align="center"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="路径"
                    align="center"
                    prop="path">
            </el-table-column>
            <el-table-column
                    label="上传时间"
                    align="center"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    label="状态"
                    align="center"
                    prop="status">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="updateBgmStatus(scope.$index)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="form">
                <el-form-item label="歌名" :label-width="formLabelWidth">
                    <el-input placeholder="请输入歌名" style="width: 400px" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input placeholder="请输入歌曲作者" style="width: 400px" v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item label="上传文件" :label-width="formLabelWidth">
                    <input type="file" style="width: 400px" @change="uploadFile"></input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitBgm">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import bgmApi from '../../api/bgmApi'
    export default {
        name: "Bgm",
        data() {
            return {
                page: 5,
                pageSize:15,
                totalCount:30,
                title:'新增bgm',
                dialogFormVisible: false,
                tableData:[],
                files:[],
                search:{},
                formLabelWidth:'160px',
                form: {
                    name: '',
                    author: '',
                },

            };
        },
        mounted: function(value) {
            this.getTableData();
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.search.page = this.page;
                this.search.pageSize = this.pageSize;
                this.getTableData(this.search);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.search.page = this.page;
                this.search.pageSize = this.pageSize;
                this.getTableData(this.search);
            },
            handleEdit(index,rowValue) {
                console.log(rowValue);
            },
            handleDelete(index,rowValue) {
                console.log(rowValue);
            },
            searchInfo() {
                this.search.page = this.page;
                this.search.pageSize = this.pageSize;
                this.getTableData(this.search);
            },
            submitBgm() {
                this.dialogFormVisible = false;
                let formData = new FormData();
                formData.append("file",this.files[0]);
                formData.append("name",this.form.name);
                formData.append("author",this.form.author);

                bgmApi.uploadFile(formData).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            uploadFile(file) {
                this.files = file.target.files;
            },
            updateBgmStatus(index) {
                bgmApi.updateBgmStatus(this.tableData[index]).then(res => {
                    if(res.status == 200) {
                        this.$message({
                            message:res.object,
                            type:'success'
                        })
                    }
                    else {
                        this.$message({
                            message:res.msg,
                            type:'error'
                        })
                    }
                })
            },
            getTableData(value) {
                let param;
                if(value == undefined || value == null) {
                    param = {
                        page:this.page,
                        pageSize:this.pageSize
                    };
                } else {
                    param = value;
                }
                bgmApi.queryBgmList(param).then(res => {
                    if(res.status == 200) {
                        this.tableData = res.object.list;
                        this.totalCount = res.object.total;
                        return;
                    }
                    this.$message('获取列表数据失败');
                }).catch(err => {
                    this.$message('获取服务器数据失败');
                })
            }
        }
    }
</script>

<style scoped>
    .search_div {
        float: left;
        padding-top: 8px;
        padding-left: 30px;
    }
    .search_input {
        width: 200px;
    }
    .add_btn {
    }
</style>
