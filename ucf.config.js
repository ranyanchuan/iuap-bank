/**
 * UCF配置文件 更多说明文档请看 https://github.com/iuap-design/ucf-web/blob/master/packages/ucf-scripts/README.md
 * 语雀全新详细文档请访问 https://www.yuque.com/ucf-web/book/zfy8x1
 */
require('@babel/polyfill');
const path = require('path');

module.exports = (env, argv) => {
    const isBuild = argv[0] === 'build';
    return {
        context: "",// 上下文对象
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,
        // 启动这两个模块，启动调试、构建
        bootList: [
            "singletable-query",
            "archives",
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com"
                },
                //要代理访问的对方路由
                router: [
                    '/mock'
                ],
                url: 'https://mock.yonyoucloud.com'
            }, {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com/mock/326"
                },
                //要代理访问的对方路由
                router: ["/wbalone/appmenumgr/newSidebarList"],
                url: 'https://mock.yonyoucloud.com/mock/326'
            },
            {
                enable: true,
                headers: {
                    "Referer": "http://10.10.4.229"
                },
                //要代理访问的对方路由
                router: [
                    '/newref/',
                    '/pap_basedoc/',
                    '/iuap_walsin_demo',
                    '/iuap-saas-message-center/',
                    '/iuap-saas-filesystem-service/',
                    '/wbalone',
                    '/print_service/',
                    '/eiap-plus',
                    '/iuap-print/',
                    '/pubserver-be/',
                ],
                url: 'http://10.10.4.229'
            }
        ],
        // 静态托管服务
        static: 'ucf-common/src/static',
        // 展开打包后的资源文件，包含图片、字体图标相关
        res_extra: true,
        // 构建资源的时候产出sourceMap，调试服务不会生效
        open_source_map: false,
        // CSS loader 控制选项
        css: {
            modules: false
        },
        // 全局环境变量,GROBAL_HTTP_CTX build时需要设置项目名称
        global_env: {
            GROBAL_HTTP_CTX: isBuild ? JSON.stringify("/ucf-webapp") : JSON.stringify("/mock/936"),
            GROBAL_HTTP_TREE: JSON.stringify("/pubserver-be"),
        },
        // 别名配置
        alias: {
            components: path.resolve(__dirname, 'ucf-common/src/components/'),
            utils: path.resolve(__dirname, 'ucf-common/src/utils/'),
            static: path.resolve(__dirname, 'ucf-common/src/static/'),
            styles: path.resolve(__dirname, 'ucf-common/src/styles/'),
            //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
        // 加载器Loader
        loader: [],
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}
