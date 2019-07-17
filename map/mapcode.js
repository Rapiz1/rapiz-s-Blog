// 秋雁南飞：
// 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果
// 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
// 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
// http://echarts.baidu.com/option.html#series-map.geoIndex
// 并且加了pin气泡图标以示数值大小
// // 全局变量区:参考江西绿色金融（谢谢：本来想用闭包实现接口数据调用，没时间了）

// 本图作者：参考秋雁南飞的《投票统计》一图，网址：http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
var name_title = "郑州一中 1815 蹭饭地图\n ZYZ1815.TODAY"
var subname = '版本: 2018/7/20 19:38 0.06β（推荐使用电脑访问）- 溜 了 ！\n'
var nameColor = " rgb(55, 75, 113)"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 18
var mapName = 'china'
var data = [{
        name: "北京",
        value: 4
    },
    {
        name: "天津",
        value: 1
    },
    {
        name: "河北",
        value: 3
    },
    {
        name: "安徽",
        value: 3
    },
    {
        name: "四川",
        value: 4
    },
    {
        name: "上海",
        value: 6
    },
    {
        name: "湖北",
        value: 4
    },
    {
        name: "吉林",
        value: 3
    },
    {
        name: "辽宁",
        value: 2
    },
    {
        name: "重庆",
        value: 2
    },
    {
        name: "湖南",
        value: 2
    },
    {
        name: "陕西",
        value: 2
    },
    {
        name: "浙江",
        value: 2
    },
    {
        name: "江苏",
        value: 3
    },
    {
        name: "广东",
        value: 1
    },
    {
        name: "山东",
        value: 1
    },
    {
        name: "河南",
        value: 3
    }
];

var geoCoordMap = {};
/*
var toolTipData = [ 
    {name:"北京",value:[{name:"文科",value:95},{name:"理科",value:82}]},
    {name:"天津",value:[{name:"文科",value:22},{name:"理科",value:20}]},
    {name:"河北",value:[{name:"文科",value:60},{name:"理科",value:42}]},
    {name:"山西",value:[{name:"文科",value:40},{name:"理科",value:41}]},
    {name:"内蒙古",value:[{name:"文科",value:23},{name:"理科",value:24}]},
    {name:"辽宁",value:[{name:"文科",value:39},{name:"理科",value:28}]},
    {name:"吉林",value:[{name:"文科",value:41},{name:"理科",value:41}]},
    {name:"黑龙江",value:[{name:"文科",value:35},{name:"理科",value:31}]},
    {name:"上海",value:[{name:"文科",value:12},{name:"理科",value:12}]},
    {name:"江苏",value:[{name:"文科",value:47},{name:"理科",value:45}]},
    {name:"浙江",value:[{name:"文科",value:57},{name:"理科",value:57}]},
    {name:"安徽",value:[{name:"文科",value:57},{name:"理科",value:52}]},
    {name:"福建",value:[{name:"文科",value:59},{name:"理科",value:57}]},
    {name:"江西",value:[{name:"文科",value:49},{name:"理科",value:42}]},
    {name:"山东",value:[{name:"文科",value:67},{name:"理科",value:52}]},
    {name:"河南",value:[{name:"文科",value:69},{name:"理科",value:68}]},
    {name:"湖北",value:[{name:"文科",value:60},{name:"理科",value:56}]},
    {name:"湖南",value:[{name:"文科",value:62},{name:"理科",value:52}]},
    {name:"重庆",value:[{name:"文科",value:47},{name:"理科",value:44}]},
    {name:"四川",value:[{name:"文科",value:65},{name:"理科",value:60}]},
    {name:"贵州",value:[{name:"文科",value:32},{name:"理科",value:30}]},
    {name:"云南",value:[{name:"文科",value:42},{name:"理科",value:41}]},
    {name:"西藏",value:[{name:"文科",value:5},{name:"理科",value:4}]},
    {name:"陕西",value:[{name:"文科",value:38},{name:"理科",value:42}]},
    {name:"甘肃",value:[{name:"文科",value:28},{name:"理科",value:28}]},
    {name:"青海",value:[{name:"文科",value:5},{name:"理科",value:5}]},
    {name:"宁夏",value:[{name:"文科",value:10},{name:"理科",value:8}]},
    {name:"新疆",value:[{name:"文科",value:36},{name:"理科",value:31}]},
    {name:"广东",value:[{name:"文科",value:63},{name:"理科",value:60}]},
    {name:"广西",value:[{name:"文科",value:29},{name:"理科",value:30}]},
    {name:"海南",value:[{name:"文科",value:8},{name:"理科",value:6}]},
];
*/
var toolTipData = [{
        name: "北京",
        value: ["徐光源", "晋语欣", "马闻倬", "梁平原"]
    },
    {
        name: "上海",
        value: ["陈锐", "高博文", "黄海石", "李通甲", "杨璟昊", "张昊天"]
    },
    {
        name: "四川",
        value: ["王龙骧", "邵天辰", "冯永琦", "孟钰皓"]
    },
    {
        name: "河北",
        value: ["董世祺", "李昂", "宋世鹏"]
    },
    {
        name: "安徽",
        value: ["陈蔚彬", "李振铎", "冯晋晖"]
    },
    {
        name: "湖北",
        value: ["马铸秋", "彭程", "何树泓","姬德馨"]
    },
    {
        name: "吉林",
        value: ["董孚颖", "刘一翔", "潘其渊"]
    },
    {
        name: "辽宁",
        value: ["刘丰琦", "杨京州"]
    },
    {
        name: "重庆",
        value: ["蒋天奇", "薛家琦"]
    },
    {
        name: "湖南",
        value: ["杨丰羽", "王怡博"]
    },
    {
        name: "陕西",
        value: ["陈奕睿", "张泽众"]
    },
    {
        name: "浙江",
        value: ["白承宛","莫子言"]
    },
    {
        name: "江苏",
        value: ["酒衷豪", "王衡孜","乔天一"]
    },
    {
        name: "广东",
        value: ["王唯一"]
    },
    {
        name: "天津",
        value: ["王佳睿"]
    },
    {
        name: "山东",
        value: ["蔡宇翔"]
    },
    {
        name: "河南",
        value: ["王浩雨", "赵家琪","刘省飞"]
    }
];
/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});

// console.log("============geoCoordMap===================")
// console.log(geoCoordMap)
// console.log("================data======================")
var max = 6,
    min = 0; // todo 
var maxSize4Pin = 50,
    minSize4Pin = 10;

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
var bgcolor = 'white'
option = {
    backgroundColor: bgcolor,
    title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle: {
            fontSize: subname_fontSize,
            fontFamily: name_fontFamily,
            color: 'grey'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            var toolTiphtml = ''
            for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                    toolTiphtml += toolTipData[i].name + ':<br>'
                    for (var j = 0; j < toolTipData[i].value.length; j++) {
                        toolTiphtml += toolTipData[i].value[j] + "<br>"
                    }
                }
            }
            return toolTiphtml;
        }
    },
    // legend: {
    //     orient: 'vertical',
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['credit_pm2.5'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    visualMap: {
        show: true,
        min: 0,
        max: 6,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            //color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            //color: ['#2B32B2', '#66CCFF'] // 浅蓝
            color: ['#FFCABF', '#FF0000'] // red
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿

        }
    },
    /*工具按钮组*/
    // toolbox: {
    //     show: true,
    //     orient: 'vertical',
    //     left: 'right',
    //     top: 'center',
    //     feature: {
    //         dataView: {
    //             readOnly: false
    //         },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false,

            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#FFCABF',
                borderColor: bgcolor,
            },
            emphasis: {
                areaColor: '#66CCFF',
            }
        }
    },
    series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'inside',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0.3)'
                }
            }
        },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
            },
            label: {
                normal: {
                    formatter: '{@[2]}',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
        }
,
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    })),
                    symbolSize: function(val) {
                        return val[2]
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'fill',
                        scale: 8
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 10,
                            shadowColor: 'white'
                        }
                    },
                    zlevel: 1
                },
        
    ]
};
myChart.setOption(option);