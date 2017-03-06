<%@ page import="dz.util.Utime" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<head>

<title>리얼그리드</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<script type="text/javascript" src="./jquery/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="./jquery/jquery-ui-1.8.17.custom/jquery-ui-1.8.17.custom.js"></script>
	<script type="text/javascript" src="./jquery/plugin/blockUI/jquery.blockUI.js"></script>
	<script type="text/javascript" src="./js/json.js"></script>
	<script type="text/javascript" src="./js/page.js"></script>


	<script type="text/javascript" src="./realgrid/realgridjs-lic.js"></script>
	<script type="text/javascript" src="./realgrid/realgridjs_eval.1.1.18.min.js"></script>
 	<script type="text/javascript" src="./realgrid/realgridjs-api.1.1.18.js"></script>
 	<script type="text/javascript" src="./realgrid/jszip.min.js"></script>
 	
	
	<script type="text/javascript">

	var gridView;
	var dataProvider;
	
	$(document).ready(function() {
	
		RealGridJS.setRootContext("./realgrid");
		dataProvider = new RealGridJS.LocalDataProvider();
		gridView = new RealGridJS.GridView("realgrid");
		gridView.setDataSource(dataProvider); 
		
		//두 개의 필드를 가진 배열 객체를 생성합니다.sfdsf
	    var fields = [
	        { fieldName: "field1" }, {fieldName: "field2"},{fieldName: "field3"},{fieldName: "field4"}];
	    //DataProvider의 setFields함수로 필드를 입력합니다.
	    dataProvider.setFields(fields);

	    //필드와 연결된 컬럼을 가진 배열 객체를 생성합니다.
	    var columns = [
	        {name: "col1",fieldName: "field1", header : {text: "사업자번호"},width: 200},
	        {name: "col2",fieldName: "field2", header : {text: "관리번호"},width: 200},
	        {name: "col3",fieldName: "field3", header : {text: "작성일자"},width: 200},
	        {name: "col4",fieldName: "field4", header : {text: "상호"},width: 200}
	    ];
	    //컬럼을 GridView에 입력 합니다.
	    gridView.setColumns(columns);
	    
	    $("#btn_Nts").bind("click", function (e) {
	    	callTax();	
		});
	    
	});	

	function callTax(){
		
		var loginUrl = "./action.dox";
		var jsonObj = {
				service : 'dzTaxMgr',
				method : 'cmdTASKCODE_120002',
				NO_CUST : "0001951",
				NO_USER : "200905001876",
				LAST_RECORD : "0",
				SEARCHSIZE : "500",
				YN_CEO : "Y"
				
			};
		
		Ajax.ajax(loginUrl, jsonObj, callTaxReSult);

	}
	function callTaxReSult(data, textStatus){
		var result = JSON.parse(data.responseText).hashtable;
		if (result.RESULT_CODE != "0000"){
			var tbTaxList = result.OBJ_TAX_LIST;
			var array = [];
			var data = {};
			for (var i=0; i< tbTaxList.length; i++){
				 data = {field1:tbTaxList[i].SELL_NO_BIZ, 
						 field2:tbTaxList[i].NO_TAX,
						 field3:tbTaxList[i].YMD_WRITE,
						 field4:tbTaxList[i].SELL_NM_CORP};
				 array.push(data);
			}	
			dataProvider.setRows(array);
		}
		return;
	}
	</script>
</head>
<body>

  <div id="realgrid" style="width: 100%; height: 200px;"></div>
  <div><a id="btn_Nts"><img src="images/btn_search_n.png" style="cursor: hand;" onmouseover='this.src="images/btn_search_o.png"' onmouseout='this.src="images/btn_search_n.png"' alt="검색" /></a></span></div>

</body>
</html>