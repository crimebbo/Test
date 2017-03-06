import React from 'react';

//region 기본 Luna
import LUXDialog from 'luna-rocket/LUXDialog';
//endregion

//region 기본 SmartA Online
import SAOBusinessForm                         from 'soComponent/SAOBusinessForm';
import {SALayout, SALayoutRow, SALayoutColumn} from 'soComponent/SAOLayout';
import {SAOCodeHelp, SAOCodeSearch}            from 'soCodeHelp';
//endregion

//region 메뉴 컴퍼넌트
import {ApiOne, ApiTwo, APIs}   from './Api'
import {InfoMSG_Codehelp}       from './GuideArea'
import {SearchCondition}        from './SearchArea'
import {SOInfoTab}              from './ComponentArea'
import {MSGs}                   from './Messages'
import {DelCheckDialog}         from './DialogArea'
//endregion

//region Grid 컴퍼넌트
import {GridInfo, GridStyle, SOGrid} from './GridSetting'
//endregion

const globals = require("../../../../../../config/" + process.env.NODE_ENV + "/Portal/globals");

let elementResizeEvent = require('element-resize-event');
let Title = "공급자등록";
let AllTrade = [];

const searchCondition = {
    fromYn: 0,
    toYn: 1
}

class SABC0105 extends React.Component {
    //region 시스템 기본
    //region 시스템
    /** Mounting - 최초 (생성시)
     * constructor
     * @param props
     */
    constructor(props) {
        // console.log('constructor', props);
        super(...arguments);

        this.mainGridSetting = GridInfo.getGridInfo('mainGrid');

        this.state = {
            mainGridStyle: this.mainGridSetting.style,

            bannerOpen: true,

            //[GUIDE 영역] 좌측 메세지 보일지말지
            msgVisible_codehelp: false,

            CodeHelp_show: false,
            CodeHelp_ID: 'FTB_TRADE',

            delCheck_show: false,
            delCheck_id: '사용중인 공급자',
            delCheck_data: {},

            disabled: false,
            no_biz: '',
            no_social: '',
            nm_krname: '',
            nm_bank: '',
            no_acnum: '',
            nm_bankn: '',
            no_zip: '',
            add_sup1: '',
            add_sup2: '',
            tel_sup1: '',
            tel_sup2: '',
            tel_sup3: '',
            nm_supplprt: '',
            rmk_sup: ''
        }
    }

    /** Mounting - 최초 (생성시) - render 전
     * componentWillMount
     */
    componentWillMount() {
        // console.log('componentWillMount');
    }

    /** Mounting - 최초 (생성시) - render 후
     * componentDidMount
     */
    componentDidMount() {

        document.title = Title;

        this.mainGridView = this.refs["mainGrid"]; //실제 그리드

        //소스상에서 조작은 아래 두가지로만!////////////////////////
        this.gridView     = this.mainGridView.getGridView(); //조작을위해 전달 받은 그리드 뷰
        this.dataProvider = this.mainGridView.getDataProvider(); //조작을 위해 전달받은 Provider

        //editSearch 기능 사용시 필요
        //this.selectedTrade = this.mainGridView.getSelectedTrade();

        //GridView에 대한 이벤트
        this.setGridCallbackFunc();

        //Provider 에 대한 이벤트
        this.setProviderCallbackFunc();

        // 그리드 스타일(넓이 높이)를 위한 코드추가
        let element = document.getElementById("divId");
        elementResizeEvent(element, this.onDivSizeChange);

        this.onResetSize();

        this.onFindClick();
    }

    /** Updating - render 전 (Prop 변경시)
     * componentWillReceiveProps
     * @param nextProp
     */
    componentWillReceiveProps(nextProp) {
        // console.log('componentWillReceiveProps', nextProp);
    }

    /** Updating - render 전 - componentWillReceiveProps 후 (Props, State 변경시, true만 render 호출)
     * shouldComponentUpdate
     */
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate', nextProps, nextState);

        return true;
    }

    /** Updating - render 전 (State 변경시)
     * componentWillUpdate
     */
    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate', nextProps, nextState);
    }

    /** Updating - render 후 (Props, State 변경시)
     * componentDidUpdate
     */
    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate', prevProps, prevState);
    }

    /** Unmounting - Route 변경시(페이지 이동 등)
     * componentWillUnmount
     */
    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }

    //endregion
    //region 공통 이벤트
    /**
     * 기능모음
     * @param e
     * @param index
     * @param mainIndex
     * @param mainText
     * @param subIndex
     * @param subText
     */
    onFuncClick(e, index, mainIndex, mainText, subIndex, subText) {

    }

    /**
     * 툴바 버튼
     * @param e
     * @param index
     * @param text
     */
    onBtnClick(e, index, text) {
    }

    /**
     * 프린트 / 삭제 / 상세검색 / 재조회 버튼 이벤트
     * @param e
     * @param id
     */
    onTopClick(e, id) {

        if(id == 'CODEHELP'){
            this.onCodeHelpClick();
        }
        else if(id == 'PRINT'){

        }
        else if(id == 'DELETE'){
            this.onDeleteClick();
        }
        else if(id == 'CSEARCH'){

        }
        else if(id == 'SEARCH'){
            this.onFindClick();
        }
        // console.log('onTopClick', e, id);
    }

/* ----------------------------------------Display Size Event---------------------------------- */

    //Page 렌더링할때마다 Grid 사이즈 수정
    onResetSize = (isJustReset, isOpen) => {
        if(this.gridView) {
            if(!isJustReset) {
                let height = this.refs.saLayout.clientHeight;
                let style = Object.assign({}, this.state.mainGridStyle);
                if (height + 'px' !== style.height) {
                    style.height = (height) + 'px';
                    this.setState({mainGridStyle: style});
                }
            }
            this.gridView.resetSize();
        }
    }

    onDivSizeChange= () => {
        this.onResetSize();
    }

    //endregion



/* ----------------------------------------Basic Button---------------------------------------- */

    onCodeHelpClick = (pCellName) => {
        let codeHelpId = "";

        switch (pCellName) {
            case "cd_supplier":
                codeHelpId = "FTB_TRADE";
                break;
            case "nm_bank":
                codeHelpId = "FTS_BANKTAX1";
                break;
            default:
                LUXDialog.alert(MSGs.noneExistsCodehelp, {type: 'warning'});
                return;
        }
        this.setState({
            CodeHelp_show: true,
            CodeHelp_ID: codeHelpId
        })
    }

    onDeleteClick = () => {
        this.gridView.cancel();
        let cnt = this.getCheckRowCount();
        let strMsg = "";

        if (cnt > 0) {
            strMsg = MSGs.multiDeleteMessage(cnt)
        }
        else {
            let focusCell   = this.gridView.getCurrent();
            let cd_supplier = this.findFieldValue("cd_supplier", focusCell.dataRow);

            if (cd_supplier != undefined && cd_supplier.toString() != "") {
                strMsg = MSGs.singleDeleteMessage(cd_supplier);
            }
            else {
                strMsg = MSGs.noneExistsDeleteRow;
                return false;
            }
        }

        if (strMsg != "") {
            LUXDialog.confirm(strMsg, {
                type: 'warning',
                callback: () => {
                    this.callDeleteChkAPI();
                }
            });
        }
    }

    onFindClick = () => {
        this.gridView.cancel();
        this.callSelectAPI();
    }


/* ----------------------------------------Grid Event----------------------------------------- */
    // gridview callback method
    setGridCallbackFunc() {

        this.gridView.onCurrentChanged = (grid, newIndex) => {
            //Grid 내의 Cell 변경시 호출
            let rowState = this.dataProvider.getRowState(newIndex.dataRow);
            this.setColProperty(grid, rowState, newIndex.dataRow);
            this.setGuideVisible(newIndex);
        };

        //GridView와 연결된 이벤트
        this.gridView.onCurrentRowChanged = (grid, oldRow, newRow) => {
            //Grid 내의 Row 변경시 호출
            let rowState = this.dataProvider.getRowState(newRow);
            this.setColProperty(grid, rowState, newRow);
            this.setInfoTab(grid, newRow);
        }

        //편집이 끝나면 다음 셀로 이동시키기
        this.gridView.onCellEdited = (grid, itemIndex, dataRow, field) => {
            //Grid 내의 Cell 내용 변경시 호출
            let focusCell   = grid.getCurrent();
            let rowState    = this.dataProvider.getRowState(dataRow);
            let cd_supplier = grid.getValue(dataRow, 'cd_supplier');
            let nm_supplier = grid.getValue(dataRow, 'nm_supplier');
            let codeVal     = grid.getValue(dataRow, 0);
            if(codeVal != undefined && codeVal != ''){
                codeVal.trim();
            }
            let returnVal   = this.searchAllRow(this.dataProvider, "cd_supplier", codeVal);

            if(rowState == 'created'){
                if(cd_supplier != undefined && cd_supplier != ''){
                    if(nm_supplier != undefined && nm_supplier !=''){
                        grid.commit();
                        this.callInsertAPI(this.gridView, this.dataProvider, itemIndex, dataRow);
                    }
                }
            }

            if(focusCell.column == 'cd_supplier'){
                if(codeVal.length < 6){
                    let newVal = codeVal.SAOpadLeft(6,'0')
                    this.gridView.setValue(focusCell.itemIndex,focusCell.column,newVal)
                }

                if(returnVal == ''){
                    focusCell.column     = 'nm_supplier';
                    focusCell.fieldIndex = 1;
                }
                else{
                    grid.cancel();
                    focusCell.dataRow   = returnVal[0];
                    focusCell.itemIndex = returnVal[0];
                }
            }
            else if(focusCell.column == 'nm_supplier'){
                focusCell.column     = 'yn_use'
                focusCell.fieldIndex = 2;
            }

            grid.setCurrent(focusCell);
        };

        this.gridView.onKeyDown = (grid, key, ctrl, shift, alt) => {
            let focusCell = grid.getCurrent();

            //F2 클릭시 코드도움
            if(key == 113){
                switch (focusCell.fieldName) {
                    case "cd_supplier":
                        //grid.cancelEditor()
                        this.onCodeHelpClick("cd_supplier");
                        return false;
                        //grid.cancel();
                        break;
                    default:
                        LUXDialog.alert(MSGs.noneExistsCodehelp, {
                            type: 'warning',
                            callback: () => {
                                //grid.cancel();
                                return false;
                            }
                        });
                        return false;
                        break;
                }
            }
            else  if (key == 13) {

                if (focusCell.fieldName == "yn_use") {
                    this.refs.inputManage.refs.no_biz.handleInputFocus();
                }


            }
        };

        this.gridView.onDataCellClicked = (grid, index) => {

        };

        this.gridView.onDataCellDblClicked = (grid, index) => {

        };

        // this.gridView.onEditSearch = (grid, index, text) => {
        //     if (index.column === "cd_supplier" && AllTrade != undefined) {
        //         let bindlabelItems = [];
        //         let codeItems = [];
        //         let dataItems = [];
        //         for (let indexNum in AllTrade) {
        //             if (AllTrade[indexNum].cd_trade.indexOf(text) >= 0 || AllTrade[indexNum].nm_trade.indexOf(text) >= 0) {
        //                 dataItems.push(AllTrade[indexNum])
        //                 codeItems.push(AllTrade[indexNum].cd_trade)
        //                 bindlabelItems.push("[" + AllTrade[indexNum].cd_trade + "] " + AllTrade[indexNum].nm_trade)
        //             }
        //         }
        //
        //         this.selectedTrade = dataItems;
        //         //function fillEditSearchItems (column, searchKey, values, labels)
        //         this.gridView.fillEditSearchItems(index.column, text, codeItems, bindlabelItems);
        //     }
        // };

        this.gridView.onGetEditValue = (grid, index, editResult) => {

        }

        this.gridView.onItemChecked = (grid, itemIndex, checked) => {

        };

        this.gridView.onItemAllChecked = (grid, checked) => {

        };
    }

    // provider callback method
    setProviderCallbackFunc() {
        //provider에 연결된 이벤트
        this.dataProvider.onRowUpdated = (provider, row) => {
            let rowState = provider.getRowState(row);
            if(rowState != 'created'){
                this.callUpdateAPI(provider, row);
            }
        }

        this.dataProvider.onDataChanged = (provider) => {

        }
    }

    // 한줄추가 기능 구현
    setProviderNewRow = (grid, provider) => {
        let row       = provider.addRow({});
        grid.setCurrent({dataRow: row});


        let focusCell = grid.getCurrent();
        focusCell.column     = 'cd_supplier';
        focusCell.fieldName  = 'cd_supplier';
        focusCell.fieldIndex = 0;

        grid.setCurrent(focusCell);

        this.setColProperty(grid, 'created', row);
    }

/* ----------------------------------------Component Callback---------------------------------- */

    //SearchCondition Component
    onFocusClick = () => {
        //SearchCodition 클릭시 데이터 초기화
        searchCondition.fromYn = 0;
        searchCondition.toYn   = 1;
        if (this.dataProvider != undefined){
            this.dataProvider.clearRows();
        }
    }

    onChangeClick = (selectedObj) => {
        searchCondition.fromYn = selectedObj.fromYn;
        searchCondition.toYn   = selectedObj.toYn;
        this.onFindClick();
    }

    //DeleteCheck Dialog Component
    onDelCheckClose = () => {
        this.setState({delCheck_show: false});
    }

    //CodeHelp Dialog Component

    //region 코드헬프 CallBack
    /**
     * 코드헬프 리턴
     * @param result
     */
    returnItems = (presultItem) => {
        // console.log('onCodeHelpItems', presultItem);
        //코드도움에서 데이터 받아오기
        this.onCodeHelpClose();

        let focusCell = this.gridView.getCurrent();
        let dataRow   = focusCell.dataRow;
        let itemIndex = focusCell.itemIndex;
        let rowState  = this.dataProvider.getRowState(dataRow);

        switch (this.state.CodeHelp_ID) {
            case "FTB_TRADE":
                if(rowState != 'created'){
                    alert("입력되어 있는 곳에서 다시 입력할 수 없습니다.");
                }
                else{
                    this.gridView.setValue(focusCell.itemIndex, "cd_supplier", presultItem.cd_trade);
                    this.gridView.setValue(focusCell.itemIndex, "nm_supplier", presultItem.nm_trade);
                    this.gridView.setValue(focusCell.itemIndex, "no_biz",      presultItem.no_biz);
                    this.gridView.setValue(focusCell.itemIndex, "nm_krname",   presultItem.nm_krname);

                    this.callInsertAPI(this.gridView, this.dataProvider, itemIndex, dataRow);
                }

                // this.MakeDicDataForUpdate("cd_trade", focusCell.itemIndex);
                // this.MakeDicDataForUpdate("nm_trade", focusCell.itemIndex);
                //
                // this.dataProvider.onRowUpdated(this.dataProvider, focusCell.dataRow)
                break;
            case "FTS_BANKTAX1":

                this.gridView.setValue(focusCell.itemIndex, "key_bank", presultItem.key_bank);
                this.gridView.setValue(focusCell.itemIndex, "cd_bank",  presultItem.cd_bank);
                this.gridView.setValue(focusCell.itemIndex, "nm_bank",  presultItem.nm_bank);

                this.setInfoTab(this.gridView, focusCell.dataRow);

                // this.MakeDicDataForUpdate("cd_trade", focusCell.itemIndex);
                // this.MakeDicDataForUpdate("nm_trade", focusCell.itemIndex);
                //
                this.dataProvider.onRowUpdated(this.dataProvider, focusCell.dataRow)
                break;
        }
    }

    /**
     * 코드헬프 닫혔을때
     */
    onCodeHelpClose = () => {
        //코드도움 닫기
        if(this.state.CodeHelp_ID == "FTB_TRADE"){
            this.gridView.setFocus();
        }
        this.setState({
            CodeHelp_show: false
        })
    }

    //endregion

    //infoTab Component
    setFromInputData = (obj) => {
        //Input 값 불러와서 그리드 셋팅
        let inputID = obj.inputID;
        let inputVal = obj.inputVal;
        let currentData = this.gridView.getCurrent();
        let currentRow = currentData.dataRow;

        // 변경된 Input Value값 현재 Provider에 셋팅
        this.dataProvider.setValue(currentRow, inputID, inputVal);

        //셋팅후 저장
        this.callUpdateAPI(this.dataProvider, currentRow);
    }

    setFocusGrid(pVal) {
        //this.gridView.set
        this.gridView.setFocus();

        let focusCell = this.gridView.getCurrent();
        if (pVal == "addRow") {
            focusCell.column = "cd_supplier";
            focusCell.fieldName = "cd_supplier";
            focusCell.dataRow = focusCell.dataRow + 1;
            focusCell.itemIndex = focusCell.itemIndex + 1;
        }
        this.gridView.setCurrent(focusCell);
    }


/* ----------------------------------------API------------------------------------------------- */

    callSelectAPI = () => {
        let promise = APIs.selectData(searchCondition);
        promise.then((responseData) => {
            this.dataProvider.setRows(responseData);
            this.gridView.setFocus();
            this.setProviderNewRow(this.gridView, this.dataProvider);
        })

    }

    callInsertAPI = (grid, provider, itemIndex, dataRow) => {
        let param   = this.setParam('insert', dataRow);
        let promise = APIs.insertData(param);
        promise.then((responseData) => {
            provider.setValue(dataRow, "yn_use", 0);
            provider.setRowState(dataRow, "none", true); //상태변경
            this.setProviderNewRow(grid, provider); //한줄추가
            this.setColFocus(grid, provider, itemIndex, dataRow);
        })
    }

    callUpdateAPI = (provider, row) => {
        let param   = this.setParam('update', row);
        let promise = APIs.updateData(param);

        promise.then((responseData) => {
            provider.setRowState(row, "none", true); //상태변경
        })

    }

    callDeleteChkAPI = () => {
        let rows    = this.gridView.getCheckedRows(true);
        let param   = this.setParam('delCheck', rows);
        let promise = APIs.deleteCheckData(param);
        promise.then((responseData) => {
            if(responseData > 0){

                let strMsg = MSGs.usingSupplierMessage;

                LUXDialog.confirm(strMsg, {
                    type: 'warning',
                    callback: () => {
                        this.setState({delCheck_data: responseData});
                        this.setState({delCheck_show: true});
                    }
                });
            }
            else{
                this.callDeleteAPI();
            }

        })
    }

    callDeleteAPI = () => {
        let rows    = this.gridView.getCheckedRows(true);
        let param   = this.setParam('delete', rows);
        let promise = APIs.deleteData(param);
        promise.then((responseData) => {
            if(rows.length == 0){
                let param = [];
                let currentRow = this.gridView.getCurrent().dataRow;
                param.push(currentRow);
                rows = param;
            }
            this.dataProvider.removeRows(rows);
        })
    }

    //메뉴 로드시 거래처데이터 가져옴
    loadCdTrade() {
        try {
            let promise = APIs.SelectAllTrade();
            promise.then((responseData) => {
                //AllTrade = responseData.data.data;
                AllTrade = responseData;
            })
        }
        catch (ex) {
            alert("거래처데이터 불러오기 실패 - 자동완성 기능 사용 불가")
        }
    }

/* ----------------------------------------Develop Func---------------------------------------- */

    setColProperty = (grid, rowState, currRow) => {
        if(rowState != 'created'){
            grid.setColumnProperty("nm_supplier", "editable", true);
            grid.setColumnProperty("yn_use"     , "editable", true);
        }
        else{
            grid.setColumnProperty("cd_supplier", "editable", true);
            grid.setColumnProperty("nm_supplier", "editable", false);
            grid.setColumnProperty("yn_use"     , "editable", false);

            let cd_supplier = grid.getValue(currRow, 'cd_supplier');
            let nm_supplier = grid.getValue(currRow, 'nm_supplier');

            if(cd_supplier == undefined || cd_supplier == '' || isNaN(cd_supplier)){
                return true;
            }
            else {
                grid.setColumnProperty("nm_supplier", "editable", true);
            }

            if(nm_supplier == undefined || nm_supplier == ''){
                return true;
            }
            else {
                grid.setColumnProperty("yn_use", "editable", true);
            }
        }
    }

    //중복 코드 검색
    searchAllRow = (provider, fieldName, findText) => {
        let values = provider.getFieldValues(fieldName);
        let result = [];
        values.forEach(function (item, index, obj) {
            if (item === findText) {
                result.push(index);
            }
        });
        return result;
    };

    //필드명과 RowIndex로 값찾기
    findFieldIndex = (fields, fieldName) => {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].fieldName.toUpperCase() == fieldName.toUpperCase())
                return i;
        }
        return -1;
    }

    //현재 Row의 pfieldName에 해당하는 값 return
    findFieldValue = (pfieldName, rowIndex) => {
        //let itemIndex = gridView.getCurrent().itemIndex;
        let fields = this.dataProvider.getFields();

        let fieldIndex = this.findFieldIndex(fields, pfieldName);
        let value = this.gridView.getValue(rowIndex, fieldIndex);

        if (value != undefined && value.toString().length > 0)
            return value;
        else {
            return '';
        }
    }

    //param값 셋팅
    setParam = (gubun, row) => {
        let param = {};

        if(gubun == 'insert'){
            param.cd_supplier = this.findFieldValue('cd_supplier', row).trim();
            param.nm_supplier = this.findFieldValue('nm_supplier', row).trim();
            param.id_insert   = 'jcjeong1207';
        }
        else if(gubun == 'update'){
            param.cd_supplier = this.findFieldValue('cd_supplier', row).trim();
            param.nm_supplier = this.findFieldValue('nm_supplier', row).trim();
            param.no_social   = this.findFieldValue('no_social'  , row).trim();
            param.no_biz      = this.findFieldValue('no_biz'     , row).trim();

            //임시용
            param.no_biz      = param.no_biz.SAOreplaceAll('-','');
            //
            param.nm_krname   = this.findFieldValue('nm_krname'  , row).trim();
            param.cd_bank     = this.findFieldValue('cd_bank'    , row).trim();
            param.key_bank    = this.findFieldValue('key_bank'   , row) == '' ? null : this.findFieldValue('key_bank', row);
            param.no_acnum    = this.findFieldValue('no_acnum'   , row).trim();
            param.nm_bankn    = this.findFieldValue('nm_bankn'   , row).trim();
            param.no_zip      = this.findFieldValue('no_zip'     , row).trim();
            param.add_sup1    = this.findFieldValue('add_sup1'   , row).trim();
            param.add_sup2    = this.findFieldValue('add_sup2'   , row).trim();
            param.tel_sup1    = this.findFieldValue('tel_sup1'   , row).trim();
            param.tel_sup2    = this.findFieldValue('tel_sup2'   , row).trim();
            param.tel_sup3    = this.findFieldValue('tel_sup3'   , row).trim();
            param.nm_supplprt = this.findFieldValue('nm_supplprt', row).trim();
            param.yn_use      = this.findFieldValue('yn_use'     , row);
            param.rmk_sup     = this.findFieldValue('rmk_sup'    , row).trim();
            param.nm_bank     = this.findFieldValue('nm_bank'    , row).trim();
            param.id_modify   = 'jcjoeng1207';

        }
        else if(gubun == 'delCheck'){
            let strData = "";
            let cnt     = this.getCheckRowCount();

            if (cnt > 0) {
                for (let item in row) {
                    let cd_supplier = this.findFieldValue("cd_supplier", row[item]).trim();
                    if (cd_supplier != null && (this.dataProvider.getRowState(row[item]) !== "created")) {
                        if(item == 0){
                            strData = cd_supplier;
                        }
                        else{
                            strData += ',' + cd_supplier;
                        }
                    }
                }
            }
            else{
                let focusCell   = this.gridView.getCurrent();
                let cd_supplier = this.findFieldValue("cd_supplier", focusCell.dataRow).trim();
                strData = cd_supplier;
            }

            param.cd_suppliers = strData;
        }
        else if(gubun == 'delete'){
            let strData = "";
            let cnt     = this.getCheckRowCount();

            if (cnt > 0) {
                for (let item in row) {
                    let cd_supplier = this.findFieldValue("cd_supplier", row[item]).trim();
                    if (cd_supplier != null && (this.dataProvider.getRowState(row[item]) !== "created")) {
                        if(item == 0){
                            strData = cd_supplier;
                        }
                        else{
                            strData += ',' + cd_supplier;
                        }
                    }
                }
            }
            else{
                let focusCell   = this.gridView.getCurrent();
                let cd_supplier = this.findFieldValue("cd_supplier", focusCell.dataRow).trim();
                strData = cd_supplier;
            }

            param.cd_suppliers = strData;
        }

        return param;
    }

    getCheckRowCount = () => {
        let rows = this.gridView.getCheckedRows(true);
        return rows == undefined ? 0 : rows.length
    }

    setColFocus = (grid, provider, itemIndex, dataRow) => {

        let focusCell = grid.getCurrent();
        focusCell.dataRow   = dataRow;
        focusCell.itemIndex = itemIndex;
        focusCell.column    = "yn_use";
        focusCell.fieldName = "yn_use";

        grid.setCurrent(focusCell);
    }

    setInfoTab = (grid, dataRow) => {

        let rowState = this.dataProvider.getRowState(dataRow);
        let no_biz   = grid.getValue(dataRow, 'no_biz')      == undefined ? '' : grid.getValue(dataRow, 'no_biz').trim();

        let result   = '';

        if(no_biz != ''){
            result = no_biz.substr(0,3) + '-' + no_biz.substr(3,2) + '-' + no_biz.substr(5,5);
        }

        if(rowState == 'created'){
            this.setState({
                disabled: true
            })
        }
        else{
            this.setState({
                disabled: false
            })
        }

        this.setState({
            no_biz     : result,
            no_social  : grid.getValue(dataRow, 'no_social')   == undefined ? '' : grid.getValue(dataRow, 'no_social'),
            nm_krname  : grid.getValue(dataRow, 'nm_krname')   == undefined ? '' : grid.getValue(dataRow, 'nm_krname'),
            nm_bank    : grid.getValue(dataRow, 'nm_bank')     == undefined ? '' : grid.getValue(dataRow, 'nm_bank'),
            no_acnum   : grid.getValue(dataRow, 'no_acnum')    == undefined ? '' : grid.getValue(dataRow, 'no_acnum'),
            nm_bankn   : grid.getValue(dataRow, 'nm_bankn')    == undefined ? '' : grid.getValue(dataRow, 'nm_bankn'),
            no_zip     : grid.getValue(dataRow, 'no_zip')      == undefined ? '' : grid.getValue(dataRow, 'no_zip').trim(),
            add_sup1   : grid.getValue(dataRow, 'add_sup1')    == undefined ? '' : grid.getValue(dataRow, 'add_sup1'),
            add_sup2   : grid.getValue(dataRow, 'add_sup2')    == undefined ? '' : grid.getValue(dataRow, 'add_sup2'),
            tel_sup1   : grid.getValue(dataRow, 'tel_sup1')    == undefined ? '' : grid.getValue(dataRow, 'tel_sup1'),
            tel_sup2   : grid.getValue(dataRow, 'tel_sup2')    == undefined ? '' : grid.getValue(dataRow, 'tel_sup2'),
            tel_sup3   : grid.getValue(dataRow, 'tel_sup3')    == undefined ? '' : grid.getValue(dataRow, 'tel_sup3'),
            nm_supplprt: grid.getValue(dataRow, 'nm_supplprt') == undefined ? '' : grid.getValue(dataRow, 'nm_supplprt'),
            rmk_sup    : grid.getValue(dataRow, 'rmk_sup')     == undefined ? '' : grid.getValue(dataRow, 'rmk_sup')
        });
    }

    setGuideVisible = (selectedObj) => {
        let selectedCol = selectedObj.column;
        if(selectedCol == 'cd_supplier'){
            this.setState({
                msgVisible_codehelp: true
            })
        }
        else{
            this.setState({
                msgVisible_codehelp: false
            })
        }
    }

    render() {
        //region 셋팅 공통
        //TODO: 메뉴코드로 셋팅되도록 수정해야함
        const ID = "공급자등록";
        const toolBarVisible = {codeHelp: true, print: true, delete: true, conditionalSearch: true, search: true};
        const funcCollect = {
            "연동": ["전기이월"]
        };
        const btnCollect = [];
        const guideTitle = "GUIDE";
        const searchHeight = 80;
        //endregion
        //region 셋팅 메뉴별
        /*가이드 영역*/
        const guideContents = (
            <div>
                {this.state.msgVisible_codehelp && <InfoMSG_Codehelp />}
            </div>
        );
        /*조회영역*/
        const dummySearch = (
            <SearchCondition Callbacks={{
                onFocus: this.onFocusClick.bind(this),
                onChange: this.onChangeClick.bind(this)
            }}/>
        );
        /*그리드 및 컴퍼넌트영역*/
        const dummyOne = (
            <SOGrid ref="mainGrid" gridSetting={this.mainGridSetting} style={this.state.mainGridStyle}/>
        );

        const dummyTwo = (
            <SOInfoTab ref="inputManage"
                       Callbacks={{SetFromInputData: this.setFromInputData.bind(this),
                       SetFocusGrid: this.setFocusGrid.bind(this),
                       OnCodeHelpClick: this.onCodeHelpClick.bind(this)}}
                       disabled   ={this.state.disabled}
                       no_biz     ={this.state.no_biz}
                       no_social  ={this.state.no_social}
                       nm_krname  ={this.state.nm_krname}
                       nm_bank    ={this.state.nm_bank}
                       no_acnum   ={this.state.no_acnum}
                       nm_bankn   ={this.state.nm_bankn}
                       no_zip     ={this.state.no_zip}
                       add_sup1   ={this.state.add_sup1}
                       add_sup2   ={this.state.add_sup2}
                       tel_sup1   ={this.state.tel_sup1}
                       tel_sup2   ={this.state.tel_sup2}
                       tel_sup3   ={this.state.tel_sup3}
                       nm_supplprt={this.state.nm_supplprt}
                       rmk_sup    ={this.state.rmk_sup}
            />
        );
        //endregion
        return (
            // 전체영역
            <SAOBusinessForm ID={ID}                          /*메뉴ID*/

                             toolBarVisible={toolBarVisible}  /*버튼활성화*/
                             btnCollect={btnCollect}          /*상단버튼*/
                             funcCollect={funcCollect}        /*기능모음*/

                             guideTitle={guideTitle}          /*가이드영역타이틀*/
                             guideOpen={false}                /*가이드영역활성화*/
                             guideContents={guideContents}    /*가이드영역컴퍼넌트*/
                             onContentAreaResize={this.onResetSize.bind(this)} /*사이즈변경*/

                             Callback={{
                                 btnCallBack: this.onBtnClick.bind(this), /*상단(메뉴) 버튼*/
                                 funcCallBack: this.onFuncClick.bind(this), /*기능모음 버튼*/
                                 topClick: this.onTopClick.bind(this), /*위 제외한 버튼*/
                             }}
            >

                {/*조회 영역*/}
                <div style={{height: searchHeight}}>
                    {dummySearch}
                </div>

                {/*컨턴츠 영역(테이블구조)*/}
                <SALayout marginTop='69px'>
                    <div id="divId" className="sao_fill_box" ref="saLayout">
                        <SALayoutRow height="100%">
                            <SALayoutColumn width="50%">
                                <div>
                                    {dummyOne}
                                </div>
                            </SALayoutColumn>
                            <SALayoutColumn width="50%" style={{marginLeft:'5px'}}>
                                <div>
                                    {dummyTwo}
                                </div>
                            </SALayoutColumn>
                        </SALayoutRow>
                    </div>
                </SALayout>

                {/*코드헬프부분*/}
                <div>
                    <SAOCodeHelp Dialog_show={this.state.CodeHelp_show}
                                 CodeHelp_API={globals.smartaUrl + '/'}
                                 CodeHelp_id={this.state.CodeHelp_ID}
                                 Callbacks={{
                                     CodeHelpItems: this.returnItems.bind(this),
                                     CodeHelpClose: this.onCodeHelpClose.bind(this)
                                 }}/>
                    {/*DelCheck Dialog*/}
                    <DelCheckDialog Dialog_show={this.state.delCheck_show}
                                    Dialog_id={this.state.delCheck_id}
                                    Dialog_data={this.state.delCheck_data}
                                    Callbacks={{
                                        DelCheckClose: this.onDelCheckClose.bind(this)
                                    }}/>
                </div>
            </SAOBusinessForm>
        );
    }
}
export default SABC0105;

