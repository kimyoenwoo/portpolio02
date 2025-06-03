(function($) {
 
        $.ajaxSetup({
               beforeSend: function(xhr) {
            	   	xhr.setRequestHeader("AJAX", true);
               }
        });
})(jQuery);

// Object.assign not working in internet explorer.
if (typeof Object.assign != 'function') {
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
				'use strict';
				if (target == null) { // TypeError if undefined or null
					throw new TypeError('Cannot convert undefined or null to object');
				}
				var to = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index];
					if (nextSource != null) { // Skip over if undefined or null
						for (var nextKey in nextSource) {
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
		},
		writable: true,
		configurable: true
	});
}

String.prototype.replaceAll = function(target,replacement){
	return this.split(target).join(replacement);
}
/*window.onpopstate = function(event) {
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	location.href=document.location;
}*/

/**************************************************
// functionName : pageMove
// post방식으로 공통 페이지 link Controller Url 호출
// jspNm(string) : 이동 될 jsp 페이지 경로 ex > "user/frnOwner/test"
// queryList(string) : 페이지 이동 시 select query 하여 model에 담을 정보  복수의 경우 |를 구분자로 쓴다.  ex> "testNameSpace.selectList|testNameSpace2.selectList"
// searchValue(string) : query시 사용될 parameter  key:value|key:value... ex> "param1:test|param2:test2"
// otherParam(Object) : 기타 이동 페이지로 넘길 requestParamData ex> {rParam: "pText", rParam2: "pText2"}
// 사용예 : pageMove({jspNm :"user/frnOwner/test", queryList: "testNameSpace.selectList|testNameSpace2.selectList", searchValue: "param1:test|param2:test2", otherParam: {rParam: "pText", rParam2: "pText2"}});/
**************************************************/
 function pageMove(pObj) {
	 	
	    var jspNm =  pObj.jspNm;
	    var queryList =  pObj.queryList; 
	    var searchValue =  pObj.queryParams; 
	    var otherParam =  pObj.otherParams;
	    
		var form;
        var parm = new Array();
        var input = new Array();

        if(!gfn_isNull(jspNm)){
        	parm.push( ['jspNm', jspNm] );
	 	}else{
	 		throw new Error("required_Paramter: jspNm");
	 	}
        
        if(!gfn_isNull(queryList)){
        	parm.push( ['qId', queryList] );
        }
        if(!gfn_isNull(searchValue)){
        	parm.push( ['searchValue', searchValue] );
        }

        if(!gfn_isNull(otherParam)){
        	var opKey = Object.keys(otherParam);
        	for(var i =0; i< opKey.length; i++){
        		 parm.push( [opKey[i] , otherParam[opKey[i]]] );
        	}
        }
        
        form = document.createElement("form");
        form.action = "/common/programLink.do";
        form.method = "post";
        
        for (var i = 0; i < parm.length; i++) {
            input[i] = document.createElement("input");
            input[i].setAttribute("type", "hidden");
            input[i].setAttribute('name', parm[i][0]);
            input[i].setAttribute("value", parm[i][1]);
            form.appendChild(input[i]);
        }
        document.body.appendChild(form);
        form.submit();
 }

// onclick 페이지 이동
function onClickLink(url, group, sort){
	console.log("------------- onClickLink group START---------------------------");
	console.log("onClickLink url : "+url);
	console.log("onClickLink group : "+group+", sort : "+sort);
	console.log("------------- onClickLink group END---------------------------");
	location.href=url;
}

function commonSelect(sel_query,searchParams,callBack) {
	$.ajax({
		type : 'POST',
		dataType : 'html',
		url : "/common/select.do",
		data : {
			"query" 		: sel_query,
			"searchValue" 	: searchParams,
			"returnUrl" 	: returnUrl
		},
		success : function(data) {
			callBack(data);	
		},
		error : function(err) { 
		}, beforeSend: function () {
			/*if($("#loadingImg").length != 0) {
				$("#loadingImg").show();
			} else {
		        $('#dataCreateWrap').empty();
				$("#dataCreateWrap").append('<div id="loadingImg" style="text-align: center;"><img src="/images/common/loading.gif" style="margin-top:30px; width:150px; height:150px;"></div>');
			}*/
       	}, complete: function () {
	       	//$("#loadingImg").hide();
       	}
	});
}

// 공통코드로 조회해 와서 select 만들어 주기.
// query : 공통코드 쿼리명
// searchValue : 검색조건
// id : select 의 id 명
// selectedVal : 조회 후 selected 할 value 값
// defVal : 조회랑 관계없이 맨 처음 option 추가할 value 값
// defTxt : 조회랑 관계없이 맨 처음 option 추가할 text 값
// 사용예 : commonCodeAjax("ADMField", "",  "searchField", "${searchParam.searchField}", "", "전체");
function commonCodeAjax(query, searchValue, id, selectedVal, defVal, defTxt){
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : "/common/selectCommonCodeAjax.do",
		data : {
			"query" : query,
			"searchValue" : searchValue
		},
		success : function(data) {
			$("#"+id).empty();
			if(nullString(defTxt)!=""){
				$("#"+id).append("<option value='"+defVal+"'>"+defTxt+"</option>");
			}
			$.each(data['resultData'], function(index, item) {
				if(nullString(selectedVal) != "" && selectedVal==item.codeCd){
					$("#"+id).append("<option value='"+item.codeCd+"' selected>"+item.codeNm+"</option>");
				}else{
					$("#"+id).append("<option value='"+item.codeCd+"'>"+item.codeNm+"</option>");
				}
			});
		},
		error : function(err) {
		}
	}); 	
}


//두자리 미만 숫자 앞에 0 붙히는 함수 
//ex) 1~9 => 01 ~ 09
function addZero(n){
 return n < 10 ? "0" + n: n;
};

//데이터 null값 ""로 리턴
function nullString(getStr)
{
	var retStr="";
	if(null == getStr || undefined==getStr) retStr="";
	else retStr = getStr.toString();

	return retStr;
}

/*************************************
* Function : Null 여부 확인
* @param   : sValue - Null 여부 확인 값
* Return   : boolean
**************************************/
function gfn_isNull(sValue){
	if(new String(sValue).valueOf() == "undefined" || new String(sValue).valueOf() == "[Undefined]") return true;
	if(sValue == null) return true;
	if(("x"+sValue == "xNaN") && (String(sValue.length).valueOf() == "undefined"))
		return true;
	if(String(sValue).length == 0) return true;

    //Trim 기능 추가
    var sArg = new String(sValue);
	if (sArg.replace(/(^\s*)|(\s*$)/g, "").length == 0 ) return true;

 	return false;
}

function checkDate(argDate){
	var rtn = false;
	argDate = argDate.replace(/[^0-9]/g, '');
	if(argDate.length!=8){
		return rtn;
	}
	argDate = argDate.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/,"$1-$2-$3");
	var adata = argDate.split('-');
	var yyyy = parseInt(adata[0],10);
	var mm = parseInt(adata[1],10);
	var dd = parseInt(adata[2],10);
	var xdata = new Date(yyyy,mm-1,dd);
	if ( ( xdata.getFullYear() === yyyy ) && ( xdata.getMonth () === mm - 1 ) && ( xdata.getDate() === dd ) ) {
		rtn = true;
	}
	return rtn;
}

function getByte_length(str){
	var resultSize = 0;
	if(str == null)
	{
		return 0;
	}
	for(var i=0; i<str.length; i++)
	{
		var c = escape(str.charAt(i));
		if(c.length == 1)
		{
			resultSize ++;
		}
		else if(c.indexOf("%u") != -1)
		{
			resultSize += 2;
		}
		else if(c.indexOf("%") != -1)
		{
			resultSize += c.length/3;
		}
	}
	return resultSize;
}

function fn_nvl(getStr){
	if(getStr == null)
		return "";
	if(getStr=="")
		return "";
	if(typeof getStr == "undefined")
		return "";
	else
		return "";
}

function alog(tmp){
	if(console){
		console.log(tmp);
	}
}

//(현재연도 가져올때)
function Date_FullYear(){
	var now = new Date();
	return now.getFullYear();
}

function Date_YM(){
	var today = new Date(); // 날자 변수 선언
    var dateNow = fnLPAD(String(today.getDate()),"0",2); //일자를 구함
    var monthNow = fnLPAD(String((today.getMonth()+1)),"0",2); // 월(month)을 구함
    var yearNow = String(today.getFullYear()); //년(year)을 구함
    return yearNow +"-"+ monthNow;
}

/*
왼쪽에 원하는 텍스트 추가
오라클 LPAD 함수와 같음

val         원래 값 
set         왼쪽에 추가하려는 값
cnt         set 갯수
*/

function fnLPAD(val,set,cnt)
{
   if( !set || !cnt || val.length >= cnt)
   {
        return val;
   }

   var max = (cnt - val.length)/set.length;

   for(var i = 0; i < max; i++)
   {
        val = set + val;
   }

   return val;
}

function Date_YMD(){
	var today = new Date(); // 날자 변수 선언
    var dateNow = fnLPAD(String(today.getDate()),"0",2); //일자를 구함
    var monthNow = fnLPAD(String((today.getMonth()+1)),"0",2); // 월(month)을 구함
    var yearNow = String(today.getFullYear()); //년(year)을 구함

    return yearNow +"-"+ monthNow +"-"+ dateNow;
}

//====================================================================
//  common으로 갈것들
//====================================================================
function Date_YMD(odate,YMD,parttern){
	var date, retStr;
	if(odate==undefined)	date = new Date(); // 날자 변수 선언
	else date = odate;
	var today = new Date(); // 날자 변수 선언
	var dateNow = fnLPAD(String(date.getDate()),"0",2); //일자를 구함
    var monthNow = fnLPAD(String((date.getMonth()+1)),"0",2); // 월(month)을 구함
    var yearNow = String(date.getFullYear()); //년(year)을 구함
    
    if(YMD == "Y") retStr = yearNow;
    else if (YMD == "YM") retStr = yearNow +parttern+ monthNow;
    else if (YMD == "YMD") retStr = yearNow +parttern+ monthNow+parttern+dateNow;
    
    return retStr;
}

//사업자등록번호 유효성 체크 
function CheckBizID(bizID)  
{
	if(bizID.length !=12) return false;
	
	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var tmpBizID, i, chkSum=0, c2, remander;
	bizID = bizID.replace(/-/gi,'');
	 
	for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	remander = (10 - (chkSum % 10)) % 10 ;
	 
	if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
	return false;
}


function getByte_length(str){
	var resultSize = 0;
	if(str == null)
	{
		return 0;
	}
	for(var i=0; i<str.length; i++)
	{
		var c = escape(str.charAt(i));
		if(c.length == 1)
		{
			resultSize ++;
		}
		else if(c.indexOf("%u") != -1)
		{
			resultSize += 2;
		}
		else if(c.indexOf("%") != -1)
		{
			resultSize += c.length/3;
		}
	}
	return resultSize;
}

//글자Byte 체크
function isMaxLen(v,maxByte){
	var strValue = v;
	var strLen = strValue.length;
	var totByte = 0;
	var len = 0;
	var oneChar = "";
	var str2 = "";
	var rtn = true;
	
	for(var i = 0; i<strLen; i++){
		oneChar = strValue.charAt(i);
		if(escape(oneChar).length > 4){
			totByte += 4;
		} else {
			totByte++;
		}
		
		if(totByte <= maxByte){
			len=i+1;
		}
	}
	
	if(totByte > maxByte){
		str2 = strValue.substr(0,len);
		//SetGridValue2(List1Grid, "csmNms",str2);
		rtn = false;
	} 
		
	return rtn;
}


//e-mail Check 정규식
function CheckEmail(str)
{                                                 
     var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
     if(!reg_email.test(str)) {                            
          return false;         
     }                            
     else {                       
          return true;         
     }                            
}        

//java stringbuffer처럼 사용하기
var StringBuffer = function (){
	this.buffer = new Array();
}
StringBuffer.prototype.append = function(obj){
	this.buffer[this.buffer.length]=obj;
	//this.buffer.push(obj); ie5.5 ns4
}
StringBuffer.prototype.toString = function (){
	return this.buffer.join("");
}
