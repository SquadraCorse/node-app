define("tif/js/depricated/g-base/BaseClass",["v2/lib/lodash"],function(e){Object.create||(Object.create=function(){function e(){}return function(t){if(arguments.length!==1)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=t,new e}}());var t=function(t){this.initialize(t)};return t.extend=function(t,n){var r=t.prototype=Object.create(this.prototype),i,s,o;r.constructor=t,t.extend=this.extend;if(n){i=e.keys(n);for(s=0,o=i.length;s<o;s++)r[i[s]]=n[i[s]]}return t},t}),define("tif/js/depricated/g-base/BaseService",["v2/lib/jquery","v2/lib/jsonp","tif/js/depricated/g-base/BaseClass"],function(e,t,n){var r=function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("msie")!==-1?parseInt(e.split("msie")[1],10):!1},i=function(i){this.url=null,this.previousRequest=null,this.application=null,this.jsonAcceptHeader=null,this._supportCors=e.support.cors,this._cache=!0,this._isIE=r(),this._isIE&&this._isIE<10&&(this._cache=!1),n.call(this,i)},s=n.extend(i,{request:function(){var t=e.ajax,n=this;return!this._supportCors,this.previousRequest&&this.previousRequest.abort(),this.previousRequest=t.call(e,{url:this.url,dataType:"json",cache:this._cache,headers:{},data:{application:this.application},success:function(e){n.setData(e)},error:function(e){n.setData(e)}}),this.previousRequest}});return s}),define("tif/js/depricated/g-base/EventAware",["tif/js/depricated/g-base/BaseClass"],function(e){var t=function(n){this.events=[],this.listeners=[],e.call(this,n)},n=e.extend(t,{on:function(e,t,n){this.events[e]=this.events[e]||[];var r=this.events[e];if(r.callback===t&&r.context===n)return;r.push({name:e,callback:t,context:n});var i=this.listeners[e];if(i)for(var s=0,o=i.length;s<o;s++){var u=i[s],a=u.eventPublisher;a.on&&a.on(u.name,u.callback)}},off:function(e,t,n){var r=this.events[e],s,o;if(!r)return;for(s=0,o=r.length;s<o;s++)if(r[s].callback===t&&r[s].context===n){r.splice(s,s+1);return}i(this.listeners[e])},trigger:function(e){var t=this.events[e];if(!t)return;for(var n=0,i=t.length;n<i;n++)r.call(this,t[n],Array.prototype.slice.call(arguments))},remove:function(){var e=Object.keys(this.listeners);for(var t=0,n=e.length;t<n;t++)i.call(this,this.listeners[e[t]]);this.events={}}}),r=function(e,t){t.splice(0,1);switch(t.length){case 0:e.callback.call(e.context);return;case 1:e.callback.call(e.context,t[0]);return;case 2:e.callback.call(e.context,t[0],t[1]);return;case 3:e.callback.call(e.context,t[0],t[1],t[2]);return;default:e.callback.apply(e.context,t)}},i=function(e){if(e)for(var t=0,n=e.length;t<n;t++){var r=e[t],i=r.eventPublisher;i.off&&i.off(r.name,r.callback)}};return n}),define("tif/js/depricated/g-base/BaseModel",["tif/js/depricated/g-base/EventAware"],function(e){var t=function(n){e.call(this,n)},n=e.extend(t,{set:function(e){this._model=e},get:function(){return this._model}});return n}),define("tif/js/depricated/g-base/BaseView",["v2/lib/jquery","tif/js/depricated/g-base/EventAware"],function(e,t){var n=function(n){this._el={},t.call(this,n)},r=t.extend(n,{getElement:function(){return this._el},get$El:function(){return e(this._el)},setElement:function(e){this._el=e}});return r}),define("tif/js/depricated/g-base/BaseController",["tif/js/depricated/g-base/EventAware"],function(e){var t=function(n){this._view=null,this._model=null,e.call(this,n)},n=e.extend(t,{setView:function(e){this._view=e},getView:function(){return this._view},getModel:function(){return this._model},setModel:function(e){this._model=e}});return n}),define("tif/js/depricated/g-base",["tif/js/depricated/g-base/BaseClass","tif/js/depricated/g-base/BaseService","tif/js/depricated/g-base/BaseModel","tif/js/depricated/g-base/BaseView","tif/js/depricated/g-base/BaseController"],function(e,t,n,r,i){return{BaseModel:n,BaseView:r,BaseController:i,BaseService:t}}),define("tif/js/depricated/g-locationpicker/view/InputFieldView",["v2/lib/jquery","v2/lib/lodash","tif/js/depricated/g-base","v2/lib/i18n!nls/g-locationpicker-i18n"],function(e,t,n,r){function u(t){var n=t.target||t.srcElement,r=e(n);r.addClass("g-locationpicker--focus"),r.closest(".js-g-locationpicker--row").addClass(this._prefix+"-focus"),r.attr("value",""),this.trigger("focus")}function a(t){var n=t.target||t.srcElement,r=e(n);r.removeClass("g-locationpicker--focus"),r.closest(".js-g-locationpicker--row").removeClass(this._prefix+"-focus"),this._error&&r.removeClass("g-locationpicker-input-error"),this.trigger("blur")}function f(e){var t=e.target||e.srcElement;switch(e.keyCode){case 13:this.trigger("key",e.keyCode),this._onInputBlur(e);break;case 38:case 40:this.trigger("key",e.keyCode);break;case 27:this.trigger("blur");break;default:this.trigger("keyup",t.value)}}var i=n.BaseView,s=function(t){this._type=t.type,this._prefix=t.application||"g-locationpicker",this._error=!1,i.call(this,t)},o=i.extend(s,{initialize:function(e){this.setElement(e.container);var n=this.get$El();this._onInputFocus=t.bind(u,this),this._onInputBlur=t.bind(a,this),this._onInputKeyup=t.bind(f,this),n.on("focus",this._onInputFocus),n.on("blur",this._onInputBlur),n.on("keyup",this._onInputKeyup),this._render()},set:function(e){e?this.get$El().attr("value",e).attr("title",e):this.get$El().attr("value",""),this.get$El().removeAttr("disabled").removeClass("g-loading-small g-locationpicker--disabled")},showError:function(e){e?(this._error&&this.get$El().removeClass("g-locationpicker-input-error"),this._error=!1):(this._error=!0,this.get$El().addClass("g-locationpicker-input-error"))},focus:function(){this.get$El().focus()},destroy:function(){var e=this.get$El();e.off("focus",this._onInputFocus),e.off("blur",this._onInputBlur),e.off("keyup",this._onInputKeyup),this._onInputFocus=this._onInputBlur=this._onInputKeyup=null},_render:function(){var e;this._type==="destination"?e=r["g.locationpicker.destination"]:e=r["g.locationpicker.origin"],this.get$El().addClass("g-loading-small g-locationpicker--disabled").attr("disabled","disabled").attr("placeholder",e)}});return o}),define("tif/js/depricated/g-locationpicker/Storage",[],function(){var e=function(){var e="ORIGIN={0}&DESTINATION={1}",t=/^ORIGIN=/,n=/^DESTINATION=/,r=function(e,t,n){var r;if(n){var i=new Date;i.setTime(i.getTime()+n*24*60*60*1e3),r="; expires="+i.toGMTString()}else r="";document.cookie=e+"="+t+r+"; path=/"},i=function(e){var t=e+"=",n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)===" ")i=i.substring(1,i.length);if(i.indexOf(t)===0)return i.substring(t.length,i.length)}return null},s=function(e){var t=e||0,n=new Date;n.setDate(n.getDate()+t);var r=n.getFullYear(),i=n.getMonth()+1,s=n.getDate();return parseInt(i,10)<10&&(i="0"+i),parseInt(s,10)<10&&(s="0"+s),r+""+i+""+s},o=s(0),u=function(e,t){var n=[],r=new RegExp(t,s),i=e.split("|");for(var s=0,u=i.length;s<u;s++)if(i[s]){var a=i[s].split(":")[2];r.test(i[s])!==!0&&a>o&&n.push(i[s]+"|")}if(n)return n.join("")},a=function(e){if(!e)return null;var t=[],n=e.split("|"),r=s(0);for(var i=0,o=n.length;i<o;i++){var u=n[i];if(u){var a=u.substring(0,3),f=u.charAt(4)==="A"?"AIRPORT":"CITY",l=u.substring(6,14);l>r&&t.push({code:a,type:f})}}return t},f=function(e){return window.Modernizr&&window.Modernizr.localstorage?localStorage.getItem(e):i(e)},l=function(e,t){window.Modernizr&&window.Modernizr.localstorage?localStorage.setItem(e,t):r(e,t)},c=function(e){var r=f(e);if(r){var i=r.split("&"),s="",o="";for(var u=0,l=i.length;u<l;u++){var c=i[u];c.match(t)&&(s=c.replace(t,"")),c.match(n)&&(o=c.replace(n,""))}var h={ORIGIN:a(s),DESTINATION:a(o)};return h}},h=function(r,i){var o=f(r),a=e,c=i.ORIGIN&&i.ORIGIN.code+":"+i.ORIGIN.type.charAt(0).toUpperCase()+":"+s(30)+"|"||"",h=i.DESTINATION&&i.DESTINATION.code+":"+i.DESTINATION.type.charAt(0).toUpperCase()+":"+s(30)+"|"||"";if(!o)a=a.replace("{0}",c).replace("{1}",h),l(r,a);else{var p=o.split("&");if(p){var d="",v="";for(var m=0,g=p.length;m<g;m++){var y=p[m];y.match(t)&&(d=y.replace(t,""),c&&(d=c+u(d,c.substring(0,5)))),y.match(n)&&(v=y.replace(n,""),h&&(v=h+u(v,h.substring(0,5))))}d=d.slice(0,45),v=v.slice(0,45),a=a.replace("{0}",d).replace("{1}",v),a.replace(" ",""),l(r,a)}}};return{add:h,get:c}},t=new e;return t}),define("tif/js/depricated/g-locationpicker/Utils",["tif/js/depricated/g-locationpicker/Storage","v2/lib/i18n!nls/g-locationpicker-i18n"],function(e,t){var n=function(e,t){var n=null;if(e&&t)for(var r=0,i=e.length;r<i;r++){var s=e[r];if(s.code===t.code){if(!t.type||t.type===s.type)return s;s.type==="AIRPORT"&&(n=s)}}return n},r=function(e){if(e===null||!e)return undefined;var n;return e.state?n=e.state+" - "+e.country:n=e.country,e.type==="AIRPORT"?e.city+" - "+e.description+" ("+e.code+"), "+n:e.city+" - "+t["g.locationpicker.allAirports"]+" ("+e.numberOfAirports+"), "+n};return{getLocation:n,getLocationDisplay:r,getStorage:e.get,saveStorage:e.add}}),define("tif/js/depricated/g-locationpicker/controller/InputFieldController",["tif/js/depricated/g-base","tif/js/depricated/g-locationpicker/view/InputFieldView","tif/js/depricated/g-locationpicker/Utils"],function(e,t,n){function o(){this.trigger("focus")}function u(){this._locationDisplay?this.getView().set(this._locationDisplay):this.getView().set(""),this.trigger("blur")}function a(e){this.trigger("typing",e)}function f(e){this.trigger("nav",e)}function l(e){if(this.model){var t=n.getLocation(this.model.get()[this._locationType],e),r=n.getLocationDisplay(t);this._location=t,this._locationDisplay=r,this.getView().set(r)}}var r=e.BaseController,i=function(t){this._location=t.prefill,this._locationType=t.type,this._locationDisplay=null,r.call(this,t)},s=r.extend(i,{initialize:function(e){this.setView(new t(e));var n=this.getView();n.on("focus",o,this),n.on("blur",u,this),n.on("keyup",a,this),n.on("key",f,this)},data:function(e){this.model=e,l.call(this,this._location)},set:function(e){l.call(this,e)},get:function(){return this._location},showError:function(e){this.getView().showError(e)},show:function(){this.getView().focus()},destroy:function(){var e=this.getView();e.off("focus",o),e.off("blur",u),e.off("keyup",a),e.off("key",f),e.destroy()}});return s}),define("v2/lib/text!tif/js/depricated/g-locationpicker/view/g-locationpicker.css",[],function(){return".g-locationpicker{\noutline:0;\nbackground-color:#fff;\nborder:1px solid #C2DEEA;\nborder-radius:3px;\nfont-size:13px;\nline-height:18px;\npadding:6px 20px 6px 35px;\nwidth:195px;\n}\n.g-locationpicker--disabled{background-color:#eee;}\n.g-locationpicker--origin{\nbackground:#fff url(data:image/gif;base64,R0lGODlhEgAPAMQfACmw4xur4d7z+trx+r7n9m3J7P3+/qTd85za8vr9/gul3zCy5FrC6QKh3gaj3j+45ku85/T6/WnH6yOt4nvO7Te15eb1+4fS7xGn4Lbk9VzC6V/E6sTp98rr+ACh3v///yH5BAEAAB8ALAAAAAASAA8AAAVQ4CeOZGmeKNoJo4EAAcoFXsBci+dJaXQpOk+FkPoINg0dxGAaZBKWgsOzmDJOlAYGODkYKp7rifDQIBKiQrhYOqzZo8GiAycx63h8cO9JhQAAOw==) no-repeat 8px center;\n}\n.g-locationpicker--destination{\nbackground:#fff url(data:image/gif;base64,R0lGODlhEgAPAMQfAPb7/QSi3rzm9rPi9eX1+zu35US65vr9/uv3/C2x5FvC6Sav437P7tjw+s3s+ILQ7g6m30u85z+45tbv+aLc8lG+6G7J7Bqq4cTp94zU8JLW8JbY8Z/b8jS05ACh3v///yH5BAEAAB8ALAAAAAASAA8AAAVX4CdxX/k5FmGuZQUhJhAo7Jp5xnCUiefUJYTB44EoBgpPBFg6PBbEqEfANDUyBWmH0ah+GNEAMfBgOsQBDWCzkFCAgN4FU5oMqoKCQeXt+/+AgX9ShB8hADs=) no-repeat 8px center;\n}\n.g-locationpicker--focus{\nbox-shadow:1px 1px 2px 0 #ddd inset;\nborder-color:#0981b1;\nbackground:#fff url(data:image/gif;base64,R0lGODlhEgAPAMQfAAWj36Ld82LF62zJ7Nnx+nPL7XzO7pnZ8k2+6DK05Rmq4bfk9l3D6ur3/Of2/LHi9arg9NPv+T+45u34/fz+/0i8543V8Mzs+ITS7yqw42bH6zm25brm9iGt4gCh3v///yH5BAEAAB8ALAAAAAASAA8AAAVj4CeOZGmSkJAI0Ek2lSfLVeN+kpcd19F5EtfCo5iMJgrP4lTwWEoYT+HE8LRIAQ/jZPAMShqP4RQBADijhTlyIiQ9iAFCNjW5PRvADDC2JwUUDg8HDw4nFAkeAjcmEXWMkDchADs=) no-repeat 8px center;\n}\n.g-locationpicker-input-error{border-color:#f00;}\n.g-locationpicker.g-loading-small{\nbackground-position:8px center;\n}\n.g-locationpicker-close{\ndisplay:block;\nposition:absolute;\nright:0px;\ntop:5px;\nwidth:20px;\nheight:20px;\noverflow:hidden;\ntext-indent:-100px;\n;\nbackground:url('//www.klm.com/ams/frontend/img/g-locationpicker.png') no-repeat -17px 2px;\ncursor:pointer;\n}\n.g-locationpicker-arrow{\ndisplay:block;\nposition:absolute;\nleft:14px;\ntop:-9px;\nwidth:20px;\nheight:10px;\noverflow:hidden;\ntext-indent:-100px;\n;\nbackground:url('//www.klm.com/ams/frontend/img/g-locationpicker.png') no-repeat 0px -56px;\n}\n.g-locationpicker-mobile .g-datepicker-arrow{display:none;}\n.g-locationpicker-popover{\nposition:absolute;\ntext-align:left;\nfont:12px verdana;\ndisplay:none;\nbackground-color:#fff;\nborder:1px solid #a0cfe3;\nwidth:178px;\nbox-shadow:0 1px 6px #ccc;\n}\n.g-locationpicker-query-help{\ncolor:#ddd;\nborder-bottom:1px solid #a0cfe3;\npadding:8px 12px;\n}\n.g-locationpicker-query-title{\nfont-weight:bold;\npadding:8px 12px;\n}\n.g-locationpicker-search .g-locationpicker-query-title{\ndisplay:none;\n}\n.g-locationpicker-search .g-locationpicker-query-help{\n}\n.g-locationpicker-query-error .g-locationpicker-items,\n.g-locationpicker-query-error .g-locationpicker-query-title{\ndisplay:none;\n}\n.g-locationpicker-query-error .g-locationpicker-query-help{\nborder-bottom:0;\ncolor:#f00;\n}\n.g-locationpicker-query-all{\nborder-top:1px solid #a0cfe3;\npadding:12px;\nclear:left;\n}\n.g-locationpicker-items{\nmargin:0;\npadding:0;\nwidth:100%;\n}\n.g-locationpicker-items--item,\n.g-locationpicker-country-item,\n.g-locationpicker-location-item,\n.g-locationpicker-az,\n.g-locationpicker-mobile .g-locationpicker-query-title{\nbackground:url(\"data:image/gif;base64,R0lGODlhFAABAJECAF+25F625P///wAAACH5BAEAAAIALAAAAAAUAAEAAAIHjA4ndix5CgA7\") repeat-x 0 bottom;\n}\n.g-locationpicker-items{\nbackground-position:0 top;\n}\n.g-locationpicker-items--item:last-child{\nbackground-image:none;\n}\n.g-locationpicker-items--item{\ncursor:pointer;\ndisplay:block;\ntext-decoration:none;\npadding:8px 12px;\ncolor:#000;\n}\n.g-locationpicker-items--item:hover,\n.g-locationpicker-location-item:hover,\n.g-locationpicker-items--active,\n.g-locationpicker-az{\nbackground-color:#E7F2F8;\ntext-decoration:none;\n}\n.g-locationpicker-country--header{\nborder-bottom:1px solid #92CAF5;\nfont-weight:bold;\npadding:10px;\n}\n.g-locationpicker-country--content{}\n.g-locationpicker-countries{\nfloat:left;\nheight:400px;\nlist-style:none outside none;\nmargin:0 0 0 5px;\noverflow-x:hidden;\noverflow-y:auto;\n-webkit-overflow-scrolling:touch;\npadding:0;\nwidth:420px;\n}\n.g-locationpicker-country-az{\nbackground-color:#E7F2F8;\ncolor:#CCCCCC;\nfloat:right;\nheight:400px;\nline-height:15px;\nlist-style:none outside none;\nmargin:0;\npadding:0;\nwidth:25px;\ntext-align:center;\n}\n.g-locationpicker-az{padding:8px 12px;}\n.g-locationpicker-country-item{padding:8px 12px;cursor:pointer;}\n.g-locationpicker-location-item{padding:8px 12px;cursor:pointer;}\n.g-locationpicker-country-az--item{\ncolor:#00A1DE;\ncursor:pointer;\n}\n.g-locationpicker-mobile .g-locationpicker-query-help{\nborder-left:none;\nmargin-left:0;\n}\n.g-locationpicker-mobile .g-locationpicker-query-title{\nfloat:none;\nwidth:auto;\n}\n.g-locationpicker-mobile .g-locationpicker-items{\nwidth:auto;\nborder-left:none;\nfloat:none;\n}\n.g-locationpicker-mobile .g-locationpicker-countries{\nwidth:80%;\n}\n.g-locationpicker-mobile .g-locationpicker-country-az{\nwidth:10%;\n}\n.g-locationpicker-query-all-item{\ncolor:#00a1de;\ncursor:pointer;\ndisplay:inline-block;\n}\n@media (max-width:480px){\nbody{padding:0;margin:0;}\n.g-locationpicker{\nfont-size:16px;\nwidth:87%;\npadding:2% 2% 2% 10%;\n}\n.g-locationpicker-popover{\nwidth:auto;\n}\n}"}),define("v2/lib/text!tif/js/depricated/g-locationpicker/view/PopOver-template.html",[],function(){return'<div class="g-locationpicker-query">\n\n	<div class="g-locationpicker-query-help"><@=i18n[\'g.locationpicker.help\']@></div>\n\n	<!-- <h4 class="g-locationpicker-query-title"><@=i18n[\'g.locationpicker.suggestions\']@></h4> -->\n\n	<ul class="g-locationpicker-items"></ul>\n\n	<div class="g-locationpicker-query-all">\n		<span class="g-locationpicker-query-all-item"><@=all@></span>\n	</div>\n\n	\n	<span class="g-locationpicker-arrow"></span>\n	<span class="g-locationpicker-close"></span>\n\n</div>'}),define("v2/lib/text!tif/js/depricated/g-locationpicker/view/PopOver-template-list.html",[],function(){return'<li class="g-locationpicker-items--item<@ if (id ===0) {@> g-locationpicker-items--active<@}@>" data-id="<@=id@>"><@=location@></li>\n '}),define("tif/js/depricated/g-locationpicker/view/PopOverView",["v2/lib/jquery","v2/lib/lodash","tif/js/depricated/g-base","v2/lib/i18n!nls/g-locationpicker-i18n","tif/js/depricated/g-locationpicker/Utils","v2/lib/text!tif/js/depricated/g-locationpicker/view/g-locationpicker.css","v2/lib/text!tif/js/depricated/g-locationpicker/view/PopOver-template.html","v2/lib/text!tif/js/depricated/g-locationpicker/view/PopOver-template-list.html"],function(e,t,n,r,i,s,o,u){function h(e){this.trigger("selected",e.target||e.srcElement)}function p(){this.hide()}function d(){this.trigger("all")}function v(){var t=465;if(this._isOpen){var n=e(window).width(),r=this.$target.offset().top+this.$target.innerHeight()+12,i=this.$target.offset().left,s=this.$target.outerWidth()-2;i>10&&(i-=10,s+=210),i+t+2<n?(s=t,this._$el.removeClass("g-locationpicker-mobile")):(s=n-i-12,this._$el.addClass("g-locationpicker-mobile")),this._$el.css({top:r+"px",left:i+"px",width:s+"px"})}}var a=n.BaseView,f=function(t){this._type=t.type,this._errorShown=!1,this._isOpen=!1,this.$target=null,this._$list=null,this._template=null,a.call(this,t)},l=a.extend(f,{initialize:function(n){this.setElement('<div class="g-locationpicker-popover"></div>'),this.$target=e(n.container),this._$el=e(this._el),this._$close=this._$el.find(".g-locationpicker-close"),this._template=t.template(o,{i18n:r,all:r["g.locationpicker.showAll."+this._type]}),this._listTemplate=t.template(u),this._onPopOverClick=t.bind(h,this),this._onPopOverClickAll=t.bind(d,this),this._onPopOverClose=t.bind(p,this),this._setDimensions=t.bind(v,this),this._$el.on("mousedown",".g-locationpicker-items--item",this._onPopOverClick),this._$el.on("mousedown",".g-locationpicker-query-all-item",this._onPopOverClickAll),this._$close.on("mousedown",this._onPopOverClose),this._render(),e(window).on("resize",this._setDimensions)},_render:function(){var t=e("body");document.getElementById("g-locationpicker-css")||t.append('<style id="g-locationpicker-css">'+s+"</style>"),t.append(this._$el)},update:function(e){if(e.length===0){this._$el.find(".g-locationpicker-query-help").html(r["g.locationpicker.error"]),this._$el.find(".g-locationpicker-query").removeClass("g-locationpicker-search").addClass("g-locationpicker-query-error"),this._errorShown=!0,this._$close.show();return}this._$el.find(".g-locationpicker-query").addClass("g-locationpicker-search"),this._$close.hide(),this._errorShown&&(this._$el.find(".g-locationpicker-query-help").html(r["g.locationpicker.help"]),this._$el.find(".g-locationpicker-query").removeClass("g-locationpicker-query-error"),this._errorShown=!1),this._isOpen||this.show();var t=[],n,s,o=new RegExp(""+this.$target.val()+"","gi");for(var u=0,a=e.length;u<a;u++)n=i.getLocationDisplay(e[u]),s=n.replace(o,c),t.push(this._listTemplate({id:u,location:s}));this._$list.empty().append(t.join(""))},show:function(e){var t=[],n;this._isOpen=!0,this._$el.empty().append(this._template).show(),this._$list=this._$el.find(".g-locationpicker-items");for(var r=0,s=e.length;r<s;r++)e[r]&&(n=i.getLocationDisplay(e[r]),t.push(this._listTemplate({id:r,location:n})));this._$list.append(t.join("")),this._setDimensions()},hide:function(){this._$list&&(this._$list.empty(),this._$list=null),this._isOpen=!1,this._$el.empty().hide()},highlightItem:function(e){var t=e+1;this._$list.find(".g-locationpicker-items--active").removeClass("g-locationpicker-items--active"),this._$list.find("li:nth-child("+t+")").addClass("g-locationpicker-items--active")},destroy:function(){this.$target=null,this._$list=null,this._template=null,this._listTemplate=null,this._$el.off("mousedown",".g-locationpicker-items--item",this._onPopOverClick),this._$el.off("mousedown",".g-locationpicker-query-all-item",this._onPopOverClickAll),this._$close.off("mousedown",this._onPopOverClose),e(window).off("resize",this._setDimensions),this._$list&&this._$list.remove(),this._$el.remove()}}),c=function(e){return"<strong>"+e+"</strong>"};return l}),define("v2/lib/text!tif/js/depricated/g-locationpicker/view/CountryView-template.html",[],function(){return'<div class="g-locationpicker-country">\n\n	<div class="g-locationpicker-country--header">\n		<@if (type === \'country\'){@>\n\n			<h2><@=i18n[\'g.locationpicker.chooseCountry\']@></h2>\n\n		<@} else {@>\n\n			<h2><@=country@></h2>\n\n			<a href="#" class="g-btn g-btn-toneddown g-locationpicker-country--back"><span><@=i18n[\'g.locationpicker.allCountries\']@></span></a>\n\n		<@}@>\n	</div>\n\n	<div class="g-locationpicker-country--content">\n		<ul class="g-locationpicker-countries"><@=countryList.join(\'\')@></ul>\n		<ul class="g-locationpicker-country-az"><@=azList.join(\'\')@></ul>\n	</div>\n\n	<span class="g-locationpicker-arrow"></span>\n	<span class="g-locationpicker-close"></span>\n	\n</div>'}),define("tif/js/depricated/g-locationpicker/view/CountryView",["v2/lib/jquery","v2/lib/lodash","tif/js/depricated/g-base","v2/lib/i18n!nls/g-locationpicker-i18n","v2/lib/text!tif/js/depricated/g-locationpicker/view/CountryView-template.html"],function(e,t,n,r,i){function f(){e("body").on("click",this._hideCountrySelector),this._$el.on("click",".g-locationpicker-country-item",this._selectCountry),this._$el.on("click",".g-locationpicker-location-item",this._selectLocation),this._$el.on("click",".g-locationpicker-country-az--item",this._selectAZ),this._$el.on("click",".g-locationpicker-country--back",this._showCountry),this._$el.on("click",".g-locationpicker-close",this._hideCountrySelector),this._$el.on("click",m)}function l(){e("body").off("click",this._hideCountrySelector),this._$el.off("click",".g-locationpicker-country-item",this._selectCountry),this._$el.off("click",".g-locationpicker-location-item",this._selectLocation),this._$el.off("click",".g-locationpicker-country-az--item",this._selectAZ),this._$el.off("click",".g-locationpicker-country--back",this._showCountry),this._$el.off("click",".g-locationpicker-close",this._hideCountrySelector),this._$el.off("click",m),this._$el.empty()}function c(t,n){var r=[],i=[],s=[];for(var u=0,a=t.length;u<a;u++){var f,l;n==="location"?(f=t[u][0].charAt(0),l=t[u][0]):(f=t[u].charAt(0),l=t[u]),e.inArray(f,r)===-1&&(r.push(f),i.push('<li class="g-locationpicker-az" data-az="'+f+'"><strong>'+f+"</strong></li>")),i.push('<li data-id="'+u+'" class="g-locationpicker-'+n+'-item">'+l+"</li>")}for(var c=0;c<o.length;c++){var h=e.inArray(o[c],r);h!==-1?s.push('<li class="g-locationpicker-country-az--item" data-az="'+o[c]+'">'+o[c]+"</li>"):s.push("<li>"+o[c]+"</li>")}return{items:i,az:s}}function h(){this._$el.empty().append(this._countriesUI)}function p(t){var n=e(t.target||t.srcElement).text();this.trigger("country",n)}function d(e){this.trigger("location",e.target||e.srcElement)}function v(e){var t=(e.target||e.srcElement).getAttribute("data-az"),n=this._$el.find(".g-locationpicker-countries"),r=n.find("[data-az='"+t+"']");n.scrollTop(r.offset().top-n.offset().top+n.scrollTop())}function m(e){e.stopPropagation(),e.preventDefault()}var s=n.BaseView,o=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],u=function(t){this._$el=null,this.model=null,this._countriesUI=null,s.call(this,t)},a=s.extend(u,{initialize:function(e){this._$el=e._$el,this._hideCountrySelector=t.bind(this._hideCountrySelector,this),this._selectCountry=t.bind(p,this),this._selectLocation=t.bind(d,this),this._selectAZ=t.bind(v,this),this._showCountry=t.bind(h,this)},start:function(e){var n=c(e,"country");this._countriesUI=t.template(i,{i18n:r,countryList:n.items,azList:n.az,type:"country"}),this._$el.empty().append(this._countriesUI),f.call(this),this._$el.show()},showCountry:function(e,n){var s=c(e,"location"),o=t.template(i,{i18n:r,countryList:s.items,azList:s.az,country:n,type:"location"});this._$el.empty().append(o)},remove:function(){l.call(this)},_hideCountrySelector:function(){this._$el.hide(),l.call(this)}});return a}),define("tif/js/depricated/g-locationpicker/controller/CountryController",["tif/js/depricated/g-base","tif/js/depricated/g-locationpicker/view/CountryView","tif/js/depricated/g-locationpicker/Utils"],function(e,t,n){function o(){var e=[],t=this.model.get()[this._type];for(var n=0,r=t.length;n<r;n++){var i=t[n].country,s=!1;for(var o=0;o<e.length;o++)if(i===e[o]){s=!0;break}s||e.push(i)}return e.sort(),e}function u(e){var t=[],r=this.model.get()[this._type],i=0;for(var s=0,o=r.length;s<o;s++)if(r[s].country===e){var u=r[s].code,a=r[s].type,f=n.getLocationDisplay(r[s]);t[i]=new Array(3),t[i][0]=f,t[i][1]=u,t[i][2]=a,i++}this.locations=t.sort(),this.getView().showCountry(t,e)}function a(e){var t=e.getAttribute("data-id"),r={code:this.locations[t][1],type:this.locations[t][2]},i=n.getLocation(this.model.get()[this._type],r);this.locations=null,this.getView().remove(),this.trigger("selected",i)}var r=e.BaseController,i=function(t){this.model=t.model,this._type=t._type,this._countryList=null,this.locations=[],r.call(this,t)},s=r.extend(i,{initialize:function(e){this.setView(new t(e)),this._countryList=o.call(this),this._view.on("country",u,this),this._view.on("location",a,this)},start:function(){this.getView().start(this._countryList)}});return s}),define("tif/js/depricated/g-locationpicker/controller/PopOverController",["tif/js/depricated/g-base","v2/lib/lodash","tif/js/depricated/g-locationpicker/view/PopOverView","tif/js/depricated/g-locationpicker/Utils","tif/js/depricated/g-locationpicker/controller/CountryController"],function(e,t,n,r,i){function a(e){this._current=e.getAttribute("data-id"),this._currentItem=this._items[this._current],this.trigger("noResults",!1),this.trigger("selected",this._currentItem);var t={},n=this._type.toUpperCase();t[n]=this._currentItem,r.saveStorage("g-locationpicker",t)}function f(){var e=this,t={_$el:this.getView()._$el,_type:this._type,filter:this.filter,model:this.model},n=new i(t);n.on("selected",function(t){e.trigger("selected",t),e._currentItem=t;var n={},i=e._type.toUpperCase();n[i]=t,r.saveStorage("g-locationpicker",n),e._view.hide()}),setTimeout(function(){n.start()},400)}function l(e){var t=this.model.get()[this._type],n=[],r=["city","description","code","state","country"];e.length===3&&(r=["code","city","description","state","country"]),e=e.replace(/[\(\)\/\\]/g,""),e=e.toLowerCase();var i=new RegExp("^"+e+"","i");for(var s=0,o=t.length;s<o;s++){var u=t[s],a=u.numberOfAirports&&u.numberOfAirports===1;if(this.filter){if(this.filter==="AIRPORT"&&u.type==="CITY")continue;if(this.filter==="CITY"&&u.type==="AIRPORT")continue}else if(a)continue;for(var f=0,l=r.length;f<l;f++){if(!i.test(u[r[f]]))continue;u.priority=f,n.push(u);break}}return n.sort(function(e,t){if(e.priority===t.priority){var n=e.description.toLowerCase(),r=t.description.toLowerCase();return n<r?-1:n>r?1:0}return e.priority-t.priority}),t=null,n}var s=e.BaseController,o=function(t){this.model=null,this.filter=t.filter,this._type=t.type,this._defaultItem=t.prefill,this._items=[],this._current=0,this._currentItem=[],s.call(this,t)},u=s.extend(o,{initialize:function(e){this.setView(new n(e)),this.getView().on("all",f,this),this.getView().on("selected",a,this)},update:function(e){this._current=0,e.length>1?(this._items=l.call(this,e),this._items.length===0?this.trigger("results",!1):this.trigger("results",!0),this._view.update(this._items)):(this.trigger("results",!0),this.show())},show:function(){var e=[];if(this.model===null)return;this._current=0,this._type==="origin"&&(e=this.model.get().popular);var n;t.isEmpty(this._currentItem)||(n=[this._currentItem]);var i=[],s=r.getStorage("g-locationpicker"),o=this._type.toUpperCase();if(s&&s[o])for(var u=0,a=s[o].length;u<a;u++)i.push(r.getLocation(this.model.get()[this._type],s[o][u]));var f=t.union(n,i,e);this._items=f,this._view.show(f)},hide:function(){this._items=[],this._current=0,this._view.hide()},data:function(e){this.model=e,this._defaultItem&&this.set(this._defaultItem)},nav:function(e){if(!this._items)return;var t=this._items.length-1;if(e===13){var n=this._items[this._current];this._currentItem=n,this.trigger("selected",n)}e===38&&(this._current>0?this._current--:this._current=t,this._view.highlightItem(this._current)),e===40&&(this._current<t?this._current++:this._current=0,this._view.highlightItem(this._current))},set:function(e){this.model&&(this._currentItem=r.getLocation(this.model.get()[this._type],e))},destroy:function(){var e=this.getView();this._items=[],this.model=null,this._current=0,this._currentItem=[],e.off("all",f),e.off("selected",a),e.destroy()}});return u}),define("tif/js/depricated/g-locationpicker/service/Pos",["tif/js/depricated/g-base"],function(e){var t=e.BaseService,n=function(n){t.call(this,n)},r=t.extend(n,{initialize:function(e){this.jsonAcceptHeader="application/json, text/javascript";var t="/passage/ebtui/inputsearchcriteria.ajax",n=e.country||"NL",r=e.language||"en",i=e.application||"NONE";this.url=t+"?languageCode="+r+"&posCode="+n.toUpperCase(),this.application=i},update:function(){var e=this.request();return e},setData:function(){}});return r}),define("tif/js/depricated/g-locationpicker/model/Model",["tif/js/depricated/g-base","tif/js/depricated/g-locationpicker/service/Pos"],function(e,t){function s(e){var t={};t.origin=[],t.destination=[],t.popular=[];var n=e.allowedDestinations,r={ANR:"ANR",BRU:"BRU",CDG:"PAR",DAL:"DFW",DCA:"WAS",DFW:"DFW",DMM:"DMM",DMS:"DMM",ECP:"PFN",ETZ:"ETZ",EWR:"NYC",GIG:"RIO",GMP:"SEL",HND:"TYO",IAD:"WAS",ICN:"SEL",IST:"IST",ITM:"OSA",JFK:"NYC",KIX:"OSA",LCY:"LON",LGA:"NYC",LHR:"LON",LIL:"LIL",LIN:"MIL",LYS:"LYS",MDW:"CHI",MXP:"MIL",NRT:"TYO",NTE:"NTE",ORD:"CHI",ORY:"PAR",PFN:"PFN",PVG:"SHA",QJZ:"NTE",SAW:"IST",SDU:"RIO",SHA:"SHA",SXB:"SXB",TFN:"TCI",TFS:"TCI",TLN:"TLN",UKB:"OSA",XDB:"LIL",XDS:"YOW",XJT:"TUF",XSH:"TUF",XWG:"SXB",XYD:"LYS",XZI:"ETZ",XZV:"TLN",YOW:"YOW",ZWE:"ANR",ZYR:"BRU",TXL:"BER",PEK:"BJS",YYC:"YYC",DTW:"DTT",IAH:"HOU",YUL:"YMQ",OTP:"BUH",ARN:"STO",FCO:"ROM"};for(var i=0,s=n.length;i<s;i++){var o=n[i],u={};u.code=o.code,u.city=o.city,u.country=o.country,u.posCode=o.countryCode,o.state&&(u.state=o.state),o.group?(u.type="CITY",u.description=o.name+" ("+o.numberof+")",u.numberOfAirports=o.numberof,u.cityCode=o.code):(u.type="AIRPORT",u.description=o.name,r[o.code]&&(u.cityCode=r[o.code])),t.origin.push(u),t.destination.push(u)}return t}var n=e.BaseModel,r=function(t){this.isLoading=!1,this.isLoaded=!1,n.call(this,t)},i=n.extend(r,{initialize:function(e){this.service=new t(e)},update:function(e){var t=this;e.data&&(t.set(s(e.data)),t.isLoaded=!0,t.trigger("loaded")),this.isLoaded&&!e.data&&t.trigger("loaded");if(!this.isLoading&&!this.isLoaded&&!e.data){this.isLoading=!0;var n=t.service.update(e);n.then(function(e,n){n==="success"&&(t.isLoading=!1,t.isLoaded=!0,t.set(s(e)),t.trigger("loaded")),n==="error"&&(t.isLoading=!1,t.trigger("errorLoading"))})}}}),o;return i.getInstance=function(e){return o||(o=new i(e)),o},i}),define("tif/js/tif-locationpicker",["v2/lib/jquery","tif/js/depricated/g-base","tif/js/depricated/g-locationpicker/controller/InputFieldController","tif/js/depricated/g-locationpicker/controller/PopOverController","tif/js/depricated/g-locationpicker/model/Model"],function(e,t,n,r,i){function a(e){this.popOverController.update(e)}function f(e){this.popOverController.nav(e)}function l(){this.popOverController.show(),this.trigger("open")}function c(){this.popOverController.hide(),this.trigger("close")}function h(e){e&&(this.inputFieldController.set(e),this.trigger("selected",e))}function p(e){this.inputFieldController.showError(e)}var s=t.BaseController,o=function(t){this.model=i.getInstance(t),s.call(this,t)},u=s.extend(o,{initialize:function(e){var t=this;if(!e||!e.application||!e.type)return;this.popOverController=new r(e),this.inputFieldController=new n(e),this.inputFieldController.on("focus",l,this),this.inputFieldController.on("blur",c,this),this.inputFieldController.on("typing",a,this),this.inputFieldController.on("nav",f,this),this.popOverController.on("selected",h,this),this.popOverController.on("results",p,this),this.model.on("loaded",function(){t.inputFieldController.data(t.model),t.popOverController.data(t.model),t.trigger("init",t.model.get())}),this.model.update(e)},set:function(e){this.inputFieldController.set(e),this.popOverController.set(e)},get:function(e){return this.inputFieldController.get(e)},close:function(){this.popOverController.hide()},open:function(){this.inputFieldController.show()},destroy:function(){this.inputFieldController.destroy(),this.popOverController.destroy()}});return u});