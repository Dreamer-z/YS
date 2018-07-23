export default {
    // 处理菜单列表数据
    // //处理为普通一维数组,带编号
    recursionMenu(data) {
        let newData = []

        function recursion(data) {
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    data[i].num = i;
                    newData.push(data[i])
                    if (data[i].children) {
                        recursion(data[i].children)
                    }
                }
            }
        };
        recursion(data);
        return newData;
    },
}