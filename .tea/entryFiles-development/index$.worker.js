if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../client/app');
require('../../client/node_modules/mini-antui/es/card/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appHeader/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/list/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/list/list-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appPageFooter/appPageFooter?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appImage/appImage?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appPanel/appPanel?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appTextBold/appTextBold?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appTry/appTry?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/node_modules/mini-antui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appStep/appStep?hash=6704cef48625941ef2213d2fa68c0801760358b9');
require('../../client/components/appJsonPreview/appJsonPreview?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/components/appUserInfo/appUserInfo?hash=a2e3327e8c8437a25d8c14d8a7c530a4790ff561');
require('../../client/node_modules/mini-antui/es/calendar/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/pages/coupon/coupon?hash=881d5863354839860ca51a86452c7ed695b70632');
require('../../client/pages/index/index?hash=ae2585416d9c541c7f8869bdd478c91b0e298eaa');
require('../../client/pages/open/open?hash=ea1b87558d8e7346cb2ffe352e40c877e35cd9cf');
require('../../client/pages/upload/upload?hash=5fa19ecde14942617ee4c00ff2aa83e07e7ef234');
require('../../client/pages/database/database?hash=8d9eb78a866ca49606ceda78eaf81b30636d25e9');
require('../../client/pages/functions/functions?hash=72b30b8c5cf615ad6f9b6d34267b960df10c3e3f');
require('../../client/pages/cloud/cloud?hash=4fc9b0a1f004ae10398113654282bb4f743a8fb3');
require('../../client/pages/couponDetail/couponDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}