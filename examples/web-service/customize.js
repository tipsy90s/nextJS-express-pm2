/**
 * Module dependencies.
 */

var express = require('../../');

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use('/api', function (req, res, next) {
  /*var key = req.query['api-key'];

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;*/
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ['foo', 'bar', 'baz'];

// these two objects will serve as our faux database

var repos = [
  {name: 'express', url: 'https://github.com/expressjs/express'},
  {name: 'stylus', url: 'https://github.com/learnboost/stylus'},
  {name: 'cluster', url: 'https://github.com/learnboost/cluster'}
];

var category = [
  {
    title: '浏览器端渲染 (CSR)',
    desc: "CSR是Client Side Render简称；页面上的内容是我们加载的js文件渲染出来的，js文件运行在浏览器上面，服务端只返回一个html模板。",
    href: '/csr'
  },
  {
    title: '服务器端渲染 (SSR)',
    desc: "SSR是Server Side Render简称；页面上的内容是通过服务端渲染生成的，浏览器直接显示服务端返回的html就可以了。",
    href: '/ssr'
  },
  {
    title: '静态网站生成(SSG)',
    desc: "静态网站生成类似于服务器端渲染，不同之处在于您在构建时而不是在请求时渲染页面。\n" +
      "\n" +
      "与服务器渲染不同，由于不必动态生成页面的HTML，因此它还可以实现始终如一的快速到第一字节的时间。\n" +
      "\n" +
      "通常，静态呈现意味着提前为每个URL生成单独的HTML文件。\n" +
      "\n" +
      "借助预先生成的HTML响应，可以将静态渲染器部署到多个CDN，以利用边缘缓存的优势。",
    href: '/ssg'
  },
]

const brandList = [
  {name: 'rohm', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ROHM_pn_160_80.PNG'},
  {name: 'Silicon Labs', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_silicon-labs_pn_160_80.PNG?_t=1630035413000'},
  {name: 'Renesas', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_renesas_pn_160_80.PNG?_t=1601528794000'},
  {name: 'Melexis', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_melexis_pn_160_80.PNG?_t=1629453399000'},
  {name: 'EPSON', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_epson_pn_160_80.PNG?_t=1601365590000'},
  {name: 'Amphenol Sensors', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Amphenol_pn_160_80.PNG?_t=1601348692000'},
  {name: 'jitsu', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Fujitsu_pn_160_80.PNG?_t=1601366795000'},
  {name: 'SMI', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_smi_pn_160_80.PNG?_t=1614590062000'},
  {name: 'Ricoh', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ricoh_pn_160_80.PNG?_t=1601528920000'},
  {name: 'Kyocera', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_KYOCERA_pn_160_80.PNG?_t=1601456863000'},
  {name: 'TE', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_TE-Connectivity_pn_160_80.PNG?_t=1630055307000'},
  {name: 'Alliance Memory', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_alliance_pn_160_80.PNG?_t=1601348655000'},
  {name: 'ATP ELECTRONICS', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ATPELECTRONICS_pn_160_80.PNG?_t=1601348938000'},
  {name: 'Littelfuse', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_littelfuse_pn_160_80.PNG?_t=1601457322000'},
  {name: 'TT Electronics', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_tt-electronics_pn_160_80.PNG?_t=1601371168000'},
  {name: 'UMS', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ums_pn_160_80.PNG?_t=1601372292000'},
  {name: 'KODENSHI', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_kodenshi_pn_160_80.PNG?_t=1601456640000'},
  {name: 'Exxelia', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_exxelia_pn_160_80.PNG?_t=1601367216000'},
  {name: 'ASB', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ASB_pn_160_80.PNG?_t=1601348859000'},
  {name: '进芯电子', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_advancechip_pn_160_80.PNG?_t=1601348275000'},
  {name: '智多晶（XIST）', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_XIST_pn_160_80.PNG?_t=1601370088000'},
  {name: '兆易创新（GigaDevice）', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_GigaDevice_pn_160_80.PNG?_t=1601366593000'},
  {name: 'SG Micro Corp', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_sg-micro_pn_160_80.PNG?_t=1601369798000'},
  {name: '新亮智能', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_brightai_pn_160_80.PNG?_t=1601349477000'},
  {name: '欧创芯', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_OCX_pn_160_80.PNG?_t=1601527417000'},
  {name: '伊凡微', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_YFW_pn_160_80.PNG?_t=1601370371000'},
  {name: '中科微', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_icofchina_pn_160_80.PNG?_t=1601452163000'},
  {name: '中科芯', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_cetc_pn_160_80.PNG?_t=1601349968000'},
  {name: '同芯微电子', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_TMC_pn_160_80.PNG?_t=1601370741000'},
  {name: '中科微', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_icofchina_pn_160_80.PNG?_t=1601452163000'},
  {name: '创瑞科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_AiT_pn_160_80.PNG?_t=1601348585000'},
  {name: '芯进', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_CrossChip_pn_160_80.PNG?_t=1601351367000'},
  {name: '瑞纳捷', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_RNJ_pn_160_80.PNG?_t=1601371963000'},
  {name: '上海国芯', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_SHGX_pn_160_80.PNG?_t=1601366664000'},
  {name: '晶光华', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_JGHC_pn_160_80.PNG?_t=1601455305000'},
  {name: '雷捷电子', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_TeraSilIC_pn_160_80.PNG?_t=1601372740000'},
  {name: '润石科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Runic_pn_160_80.PNG?_t=1601368156000'},
  {name: 'Syrlinks', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Syrlinks_pn_160_80.PNG?_t=1601370437000'},
  {name: '敏源传感', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_MYSENTECH_pn_160_80.PNG?_t=1601372416000'},
  {name: '聚洵', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Gainsil_pn_160_80.PNG?_t=1601366715000'},
  {name: '启英泰伦', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Chipintelli_pn_160_80.PNG?_t=1615948160000'},
  {name: 'IDT（艾迪悌）', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_IDT_pn_160_80.PNG?_t=1601452224000'},
  {name: '芯波科技(XWAVE)', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_XWAVE_pn_160_80.PNG?_t=1601370953000'},
  {name: '为开微电子', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_WEIKAI_pn_160_80.PNG?_t=1614603394000'},
  {name: 'Xsens', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Xsens_pn_160_80.PNG?_t=1601370905000'},
  {name: '朗瑞', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_lorysemi_pn_160_80.PNG?_t=1601457535000'},
  {name: '应达利', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Interquip_pn_160_80.PNG?_t=1601454327000'},
  {name: '恒晶科技(XTALTQ)', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_XTALTQ_pn_160_80.PNG?_t=1601370866000'},
  {name: '晶科鑫（SJK）', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_SJK_pn_160_80.PNG?_t=1601369983000'},
  {name: '宝砾微', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_powlicon_pn_160_80.PNG?_t=1601528173000'},
  {name: '博雅科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_BOYA_pn_160_80.PNG?_t=1601349706000'},
  {name: '飞仕得', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Firstack_pn_160_80.PNG?_t=1601366981000'},
  {name: '晶尊微电子', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ICMAN_pn_160_80.PNG?_t=1601451845000'},
  {name: '长晶科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_jscj_pn_160_80.PNG?_t=1601455373000'},
  {name: '雅特力', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Artery_pn_160_80.PNG?_t=1601348815000'},
  {name: '大普通信', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Dapu_pn_160_80.PNG?_t=1605493090000'},
  {name: '核芯互联', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_CORELINK_pn_160_80.PNG?_t=1604909916000'},
  {name: '诺领科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_nurlink_pn_160_80.PNG?_t=1614648236000'},
  {name: '旺凌科技', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_Opulinks_pn_160_80.PNG?_t=1614648267000'},
  {name: '中微半导体', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_CMSemcion_pn_160_80.PNG?_t=1607070343000'},
  {name: '中科银河芯', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_GXCAS_pn_160_80.PNG?_t=1602776009000'},
  {name: 'ziro-Tech1', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ziro-Tech_pn_160_80.PNG?_t=1602570463000'},
  {name: 'ziro-Tech2', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ziro-Tech_pn_160_80.PNG?_t=1602570463000'},
  {name: 'ziro-Tech3', url: 'https://files.sekorm.com/opt/fileStore/portal/brand/images/co_ziro-Tech_pn_160_80.PNG?_t=1602570463000'},
]

function ssrData(currenPage){
  let pageSize = 10;
  let data = [];
  for(let i = (currenPage - 1) * pageSize + 1; i <= currenPage * pageSize; i++){
    data.push({index: i, title: 'ssr' + i, desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述' + i});
  }
  return data;
}

function ssgData(currenPage){
  let pageSize = 10;
  let data = [];
  for(let i = (currenPage - 1) * pageSize + 1; i <= currenPage * pageSize; i++){
    data.push({index: i, title: 'ssg' + i, desc: '改动了ssg数据16:48 ' + i});
  }
  return data;
}

var userRepos = {
  tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

// we now can assume the api key is valid,
// and simply expose the data

app.get('/api/getSsrList', function (req, res, next) {
  var page = req.query['page'];
  let json = {
    data: [],
    code: 0,
    msg: '成功'
  };
  if(!page || page === '1'){
    res.send({...json, data: ssrData(1)});
  }else{
    res.send({...json, data: ssrData(page)});
  }
});

app.get('/api/getSsgList', function (req, res, next) {
  var page = req.query['page'];
  let json = {
    data: [],
    code: 0,
    msg: '成功'
  };
  if(!page || page === '1'){
    res.send({...json, data: ssgData(1)});
  }else{
    res.send({...json, data: ssgData(page)});
  }
});

app.get('/api/category', function (req, res, next) {
  res.send(category);
});

app.get('/api/getBrandList', function (req, res, next) {
  res.send(brandList);
});

// example: http://localhost:3000/api/repos/?api-key=foo
app.get('/api/repos', function (req, res, next) {
  res.send(repos);
});

// example: http://localhost:3000/api/user/tobi/repos/?api-key=foo
app.get('/api/user/:name/repos', function (req, res, next) {
  var name = req.params.name;
  var user = userRepos[name];

  if (user) res.send(user);
  else next();
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function (err, req, res, next) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({error: err.message});
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404);
  res.send({error: "Lame, can't find that"});
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3001);
  console.log('Express started on port 3001');
}
