webpackJsonp([0],{63:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(65),u=r(n),c=a(118),s=r(c);t["default"]={namespace:"app",state:{currentItem:"home"},subscriptions:{setup:function(e){e.dispatch,e.history}},effects:{fetch:s["default"].mark(function o(e,t){var a=(e.payload,t.call,t.put);return s["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a({type:"save"});case 2:case"end":return e.stop()}},o,this)})},reducers:{changePage:function(e,t){return(0,u["default"])({},e,{currentItem:t.payload})}}},e.exports=t["default"]}});