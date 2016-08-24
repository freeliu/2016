window.app = new Vue({
        el: "body",
        data: {
                msg:'hello world!',
                inputval:'',
        },
        watch: {
                inputval: {
                        handler: function (inputval) {
                                console.log(inputval)
                        },
                        deep: true
                }
        },
        computed: {
                combie:function () {
                        return this.msg+this.inputval;
                }
        },
        methods: {
                add:function (i) {
                        this.inputVal+i;
                }
        }
    }
)
