export default {
  APP_CODE: 'lms',//全局的app code
  DEFAULT_PAGE: { page: 1, size: 10, totalRow: 0, totalPage: 0 },
  ACJSESSIONID: "ACJSESSIONID",
  USERNAME: "USERNAME",
  AJAX: "ajax",
  CHANNEL_TYPE: "_channelType",
  TEMP_ID_PRE: 'tempIdPre_',
  COMPANY_TYPE: ["意向客户", "成交客户"],
  USER_NAME: 'userName',
  USER_RIGHTS: 'userRights',
  USER_MENU: '_user_menus',
  TYPE1: '1',
  TYPE2: '2',
  TYPE3: '3',
  preCurrency: "preCurrency",
  PORT: { FRE: '1', AIR: '2' },
  PORTS: "ports_",
  DECLAREPORT: "declarePort",
  DATEFORMAT: 'YYYY-MM-DD',
  BUSINESSTYPE: {
    CHARGECONFIRM: 'chargeConfirm',				//费用确认
    CHARGE_ADD_PAY: 'chargeAddPay',				//费用新增-应付
    CHARGE_ADD_CLAIM: 'chargeAddClaim',			//费用新增-应收
    CHARGE_ADD: 'chargeAdd',
    CHARGE_UPDATE_PAY: 'chargeUpdatePay',		//费用变更-应付
    CHARGE_UPDATE_CLAIM: 'chargeUpdateClaim',	//费用变更-应收
    CHARGE_UPDATE: 'chargeUpdate'
  },
  SUPPLIER_TYPE: {
    FRAE: '1',			//海运供应商
    TRAILER: '2', 		//拖车供应商
    DECLARE: '3', 		//报关供应商
    AIR: '4', 			//空运供应商
    EXPRESS: '5', 		//快递供应商
    INSURANCE: '6', 	//保险供应商
    DEPOT: '7', 		//仓库供应商
    INSPECTION: '8', 	//商检供应商
    CO: '9' 			//产地证供应商
  },
  SUPPLIER_MODULES: [
    'SUPPLIER_LICENCE'
  ],
  BOOKING_MODULES: [
    'BOOKING_SO',
    'url'					//上传凭证
  ],
  ORDERTRA_MODULES: [
    'ODTRAILER_WEIGHBILL_URL', 	//订单拖车-过磅单URL
    'ODTRAILER_HEADSTOCKPIC_URL',  //车头照
    'ODTRAILER_TAILSTOCKPIC_URL',  //车尾照
    'ODTRAILER_GPS_URL',			//GPS
    'ODTRAILER_ALSOCABINETBILL_URL', 	//还柜纸
    'ODTRAILER_SENDCAR_URL',			//派车单
    'ODTRAILER_OTHER_URL',				//其他材料
    'ODTRAILER_SIGNEDRECEIPT_URL'		//签收单
  ],
  ORDERDEC_MODULES: [
    'DECLARE_BILL_URL', 		//报关底单
    'DECLARE_PASSNOTICE_URL',		//放行通知书
    'DECLARE_OTHER_URL'				//其他资料
  ],
  ORDERSI_MODULES: [
    'ODSI_LADINGBILL_URL',		//提单确认件
    'ODSI_SI_URL',				//补料信息

  ],

  IMPORT_MODULE: [
    'Port',  //港口
    'Wharf',	//码头
    'AirLine',	//航线
    'BerthingCompany',	//船公司
    'LocalFee',	//本地费用
    'DeclareFee',	//报关费用
    'TrailerFee',	//拖车费
    'FreightFee',	//海运费
  ],

  PAYMENT: [
    'PAYMENT_BILL_URL',					//操作申请付款上传客户提供的账单
    'PAYMENT_PROOF_URL'					//财务付款后上传的凭证
  ],

  ACCEPTFILETYPES: ['jpg', 'png', 'jpeg', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'tif', 'rar', 'zip'],
  FILE: {
    // UPLOAD_PREFIX: apiPath.mc + "/api/file/batch/",
    UPLOAD_TEXT: "/upload/",
    // DOWNLOAD_PREFIX: apiPath.mc + "/api/file/",
    DOWNLOAD_TEXT: "/download/",
    FILENAME_TEXT: "?fileName=",
    MAX_FILE_SIZE: 20, //MB
    MAX_LENGTH_FILENAME: 40,
    ILLEGAL_UPLOAD_FILE_NAME: '&+#',
    // UPLOAD_SI: apiPath.mc + "/api/file/import/billOfLading/",
    // IMPORT_DATA: apiPath.mc + "/api/file/import/",
  },
  ROLE: {
    SALES_MAN: 'SALES_MAN',			 //业务人员
    SALES_MANAGER: 'SALES_MANAGER',	 //业务经理
    GD_MAN: 'GD_MAN',			 	 //操作人员
    GD_MANAGER: 'GD_MANAGER',		 //操作经理
    FINANCE_MAN: 'FINANCE_MAN',		 //财务人员
    FINANCE_MANAGER: 'FINANCE_MANAGER',		 //财务经理
    CFO: 'CFO',								 //财务总监
    OPERATE_MAN: 'OPERATE_MAN',				 //运营人员
    MARKETING_SPECIALIST: 'MARKETING_SPECIALIST',		//市场专员
  },
  MESSAGE_MODULE: { "quickBookingArbitrate": "快速订舱" },

  DELIVERY_SOURCE: {
    NORMAL: '1',			//业务正常下单
    QUICKBOOKING: '2',		//部分数据来自市场快速订舱
    WEBBOOKING: '3'			//部分数据来自官网订舱
  }
}
