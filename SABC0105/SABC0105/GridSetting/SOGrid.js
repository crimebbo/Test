import React, { Component } from 'react';

class SOGrid extends Component {

    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.createGrid(this.props.gridSetting.name);
    }

    bindData(data) {
        this.dataProvider.fillJsonData(data.data.data, { fillMode: "set" });
        var selection = {
            style: "block",
            startItem: 0,
            endItem: 0,
            startColumn: this.props.gridSetting.columns[0].name,
            endColumn: this.props.gridSetting.columns[0].name,
        }
        this.gridView.setSelection(selection);
        //this.gridView.scrollPage(-200);
    }

    // 그리드 생성 초기에 한번만 호출
    createGrid(gridName) {
        // 그리드 생성
        RealGridJS.setRootContext("/script");
        this.dataProvider = new RealGridJS.LocalDataProvider();
        this.gridView = new RealGridJS.GridView(gridName);
        this.gridView.setDataSource(this.dataProvider);

        this.dataProvider.setFields(this.props.gridSetting.fields);

        // Create Columns
        this.gridView.setColumns(this.props.gridSetting.columns);

        this.gridView.setFooter({mergeCells: [ ["day", "no_acct", "cd_trade","nm_trade", "ty_gubn", "cd_acctit"], ["nm_acctit", "cd_remark"] ] });

        this.gridView.setOptions(this.props.gridSetting.options);
        this.gridView.setStyles(this.props.gridSetting.styles);

        //this.setValidations(this.gridView);
        //편집한 셀을 기록하기 위해 전역으로 하나 만듬
        this.dicEditCell = {};

        //[자동완성] 모든 계정과목 & 거래처 가져오기
        this.selectedAccount = [];
        this.selectedTrade = [];
        this.selectedRMK = [];

    }
    setValidations(grid) {
       /*let validations = [{
            criteria: "value > 100",
            message: "Quantity는 100보다 커야 합니다!",
            mode: "always",
            level: "error"
        }, {
            criteria: "value < 200",
            message: "Quantity는 200보다 작아야 합니다!",
            mode: "always",
            level: "warning"
        }, {
            criteria: "value <> 150",
            message: "Quantity 값은 150과 달라야 합니다!",
            mode: "always",
            level: "info"
        }];

        var column = grid.columnByName("mn_bungae1");
        column.validations = validations;
        grid.setColumn(column);
*/
        let validations = [{
            criteria: "value is not empty",
            message: "mn_bungae는 반드시 필요합니다.",
            mode: "always",
            level: "warning"
        }
        ];
        let column = grid.columnByName("mn_bungae1");
        column.validations = validations;
        grid.setColumn(column);
    }

    getGridView() {
        return this.gridView;
    }
    getDataProvider() {
        return this.dataProvider;
    }
    getDicEditCell() {
        return this.dicEditCell;
    }
    getSelectedAccount() {
        return this.selectedAccount;
    }
    getSelectedTrade() {
        return this.selectedTrade;
    }

    validate(grid, index, value) {

        // 유효성 검증함수 Select
        var column = this.props.gridSetting.columns.find((column) => column.name === index.column);

        // 유효성 검증함수가 작성되어있지 않으면 항상 유효하다.
        if(!column || !column.validateFunc) {
            return true;
        }

        if(!column && !column.editor && !column.editor.maxLength) {
            return true;
        }

        //금액인데 0이 들어올 경우 유효성 검사 하자
        if(column.styles.numberFormat == "#,##0" && value == 0){
            return column.validateFunc(grid, index, value);
        }

        if(isNaN(value))
            return column.validateFunc(grid, index, value);

        if(!value) {
            return true;
        }

        let length = value.toString().length;
        if(column.editor.maxLength <= length) {
            return column.validateFunc(grid, index, value);
        } else {
            return true;
        }
    }

    render() {
        return (
            <div>
                <div id={this.props.gridSetting.name} style={this.props.style}></div>
            </div>
        );
    }
};

export default SOGrid;