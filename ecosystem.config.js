module.exports = {
  apps : [{
    script: 'index.js',
    watch: true,
    exec_mode: 'cluster',
    error_file: "./logs/app-err.log",  //错误日志
    out_file: "./logs/app-out.log", //正常日志
    merge_logs: true, 
    log_date_format: "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
    env: {                     //默认的环境变量
      NODE_ENV: "production",
      MODE: "default"
    },
    env_production: {          //生产环境变量，需要在命令行中添加参数 --env production
      NODE_ENV: "production",
      MODE: "pro"
    },
    env_pre_production: {         //预生产环境变量，需要在命令行中添加参数 --env pre_production
      NODE_ENV: "pre_production",
      MODE: "pre"
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '172.16.9.130',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
