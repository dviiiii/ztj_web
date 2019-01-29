

<template>
    <div>
        <div class="fn-left clearfix">
            <div class="fn-reading">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="ios-book"></Icon>
                        今日已读
                    </p>
                    <Select v-model="readingData.bookid">
                        <Option v-for="item in bookInfo" :value="item.id" :key="item.bookname">{{ item.bookname }}</Option>
                    </Select>
                    <Input class="reading-input" v-model="readingData.bookPageNumberS" placeholder="起始页"></Input>
                    <Input class="reading-input" v-model="readingData.bookPageNumberE" placeholder="结束页"></Input>
                    <Button type="primary" @click="addRead">确认</Button>
                </Card>
            </div>
            <div class="fn-addBook">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="android-add-circle"></Icon>
                        新增书籍
                    </p>
                    <Input v-model="addBookData.bookName" placeholder="输入书籍名称"></Input>
                    <Input v-model="addBookData.bookPageNumber" placeholder="输入书籍页码"></Input>
                    <Select v-model="addBookData.bookSort">
                        <Option value="0">精读</Option>
                        <Option value="1">粗读</Option>
                    </Select>
                    <Button type="primary" @click="addBook">确认</Button>
                </Card>
            </div>
            <div class="fn-books-table">
                <Card class="books-table clearfix">
                    <p slot="title">
                        <Icon type="flag"></Icon>
                        读书进度
                    </p>
                    <Table :columns="booksColumns" :data="bookInfo"></Table>
                </Card>
            </div>
        </div>
        <div class="fn-right">
            <Card class="review-table clearfix">
                <p slot="title">
                    <Icon type="bookmark"></Icon>
                    今日待复习
                </p>
                <Table :columns="reviewColumns" :data="reviewInfo"></Table>
            </Card>
        </div>


    </div>
</template>

<script>

    export default {
        name: 'books',
        data () {
            return {
                addBookData: {
                    bookName: '',
                    bookPageNumber: '',
                    bookSort: ''
                },
                bookInfo: [],
                readingData: {
                    bookid: '',
                    bookPageNumberS: '',
                    bookPageNumberE: ''
                },
                reviewInfo: [],
                reviewColumns: [
                    {
                        title: '书名',
                        key: 'bookname'
                    },
                    {
                        title: '页码',
                        render: (h, params) => {
                            return h('div',params.row.start_page + '-' + params.row.end_page);
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.checkReview(params.row.id, params.row.review_times);
                                        }
                                    }
                                }, '已复习')
                            ]);
                        }
                    }
                ],
                booksColumns: [
                    {
                        title: '书名',
                        key: 'bookname'
                    },
                    {
                        title: '进度',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress', {
                                    props: {
                                        status: 'active',
                                        percent: parseInt(params.row.progress)
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteBook(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        mounted () {
            this.queryBookList();
            this.queryReviewInfo();
        },
        methods: {
            //增加书籍
            addBook () {
                const vm = this;

                const parmas = {
                    bookName: vm.addBookData.bookName,
                    bookNumber: vm.addBookData.bookPageNumber,
                    readType: vm.addBookData.bookSort
                };

                if(!parmas.bookName) {
                    vm.$Message.warning('书名不能为空！');
                    return false;
                }
                if(!parmas.bookNumber) {
                    vm.$Message.warning('页数不能为空！');
                    return false;
                }
                if(!/^[1-9]\d*$/g.test(parmas.bookNumber)) {
                    vm.$Message.warning('页数只能为正整数！');
                    return false;
                }

              vm.$api.addBook(parmas).then(res => {
                if(res.data.status === 0) {
                  vm.$Message.success(res.data.msg);
                }else if(res.data.status === 1) {
                  vm.$Message.error(res.data.msg);
                }else {
                  vm.$Message.error('数据错误！');
                }
              }) .catch(function (error) {
                console.log(error);
                vm.$Message.error('服务器错误！');
              });
            },

            //增加今日所读
            addRead () {
                const vm = this;

                let bookSumPage;
                for(let i in vm.bookInfo) {
                    if(vm.bookInfo[i].id === vm.readingData.bookid){
                        bookSumPage = vm.bookInfo[i].pagenumber;
                        break;
                    }
                }

                let parmas = {
                    bookid: vm.readingData.bookid,
                    bookPageNumberS: vm.readingData.bookPageNumberS,
                    bookPageNumberE: vm.readingData.bookPageNumberE,
                    pagenumber: bookSumPage
                };
                if(!parmas.bookid) {
                    vm.$Message.warning('书呢？');
                    return false;
                }
                if(!parmas.bookPageNumberS || !parmas.bookPageNumberE) {
                    vm.$Message.warning('页数不能为空！');
                    return false;
                }
                if(!/^[1-9]\d*$/g.test(parmas.bookPageNumberS) || !/^[1-9]\d*$/g.test(parmas.bookPageNumberE)) {
                    vm.$Message.warning('页数只能为正整数！');
                    return false;
                }

                let bookPageNumber;

                for(let i in vm.bookInfo) {
                    if(vm.bookInfo[i].id === parmas.bookid  ) {
                        parmas.bookPageNumber = vm.bookInfo[i].pagenumber;

                        if((parseInt(parmas.bookPageNumberE) > parseInt(vm.bookInfo[i].pagenumber) || parseInt(parmas.bookPageNumberS) > parseInt(vm.bookInfo[i].bookPageNumber))) {
                            vm.$Message.warning(`页数最大为${vm.bookInfo[i].pagenumber}！`);
                            return false;
                        }
                    }
                }

                axios.post('/api/book/addReading',parmas)
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.success('新增成功！');
                            vm.queryBookList();
                        }else if(res.data.state === 1) {
                            vm.$Message.error('新增失败！');
                        }else {
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            //查询书籍信息
            queryBookList () {
                const vm = this;
                vm.$api.getBookList()
                    .then(function (res) {
                        console.log(res)
                        if(res.data.length === 0) {
                            vm.$Message.error('书库里买没有书哦！');
                        }else {
                            vm.bookInfo = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('服务器错误！');
                    })
            },
            //查询复习信息
            queryReviewInfo () {
                const vm = this;
                axios.get('/api/book/queryReviewInfo')
                    .then(function (res) {
                        if(res.data.state === 1) {
                            vm.$Message.error('获取复习信息失败！');
                        }else {
                            vm.reviewInfo = res.data.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('获取复习信息失败！');
                    });
            },
            //已复习
            checkReview (id, review_times) {
                const vm = this;

                const params = {
                    id: id,
                    review_times: review_times
                };

                axios.post('/api/book/checkReview', params)
                    .then(function (res) {
                        if(res.data.state === 1) {
                            vm.$Message.error('更新复习信息失败！');
                        }else {
                            vm.$Message.success('更新复习信息成功！');
                            vm.queryReviewInfo();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('更新复习信息失败！');
                    })
            },
            deleteBook (id) {
                const vm = this;
                console.log(id)
                axios.post('/api/book/deleteBook', {id: id})
                    .then(function (res) {
                        if(res.data.state === 1) {
                            vm.$Message.error('删除书籍失败！');
                        }else {
                            vm.$Message.success('删除书籍成功！');
                            vm.queryBookList();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('删除书籍失败！');
                    });
            }
        }
    };
</script>

<style lang="less" scoped="">
    .fn-left {
        width: 66%;
        float: left;
    }

    .fn-left .fn-addBook,
    .fn-left .fn-reading{
        width: 49%;
        float: left;
    }

    .fn-left .fn-books-table {
        width: 98%;
        float: left;
    }

    .fn-right {
        width: 33%;
        float: right;
    }

    .reading, .review-table {
        width: 90%;
        margin: auto;
    }

    .reading-table .ivu-table-wrapper {
        min-height: 140px;
    }

    .reading .ivu-input-type,
    .reading .ivu-select-single {
        margin-top: 15px;
    }

    .reading button {
        margin: 15px 0;
        float: right;
    }

    .reading-input {
        width: 49%;
    }

    .books-table {
        width: 95%;
        margin: 30px auto;
    }


</style>
