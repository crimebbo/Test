import {Common} from 'soDevLib';
import GridStyle from './../../../GridSetting/GridStyle';

let GridInfo = {
    getGridInfo(gridName) {
        switch (gridName) {
            case "mainGrid":
                let setInfo;
                setInfo = {
                    // 그리드 컬럼설정
                    name: gridName,
                    style: {
                        width: '100%',
                        height: '400px'
                    },
                    //왠만하면 field 명과 column명은 동일하게 쉬운 유지보수를 위해
                    fields: [
                        {
                            note: 'code',
                            fieldName: "cd_supplier",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '공급자',
                            fieldName: "nm_supplier",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '사용',
                            fieldName: "yn_use",
                            dataType: RealGridJS.DataType.NUMBER
                        },
                        {
                            note: '사업자등록번호',
                            fieldName: "no_biz",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '주민등록번호',
                            fieldName: "no_social",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '성명',
                            fieldName: "nm_krname",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '은행일련키',
                            fieldName: "key_bank",
                            dataType: RealGridJS.DataType.NUMBER
                        },
                        {
                            note: '은행코드(국세청)',
                            fieldName: "cd_bank",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '계좌번호',
                            fieldName: "no_acnum",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '예금주',
                            fieldName: "nm_bankn",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '우편번호',
                            fieldName: "no_zip",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '주소(상)',
                            fieldName: "add_sup1",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '주소(하)',
                            fieldName: "add_sup2",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '전화번호1',
                            fieldName: "tel_sup1",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '전화번호2',
                            fieldName: "tel_sup2",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '전화번호3',
                            fieldName: "tel_sup3",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '인쇄할공급자',
                            fieldName: "nm_supplprt",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '비고',
                            fieldName: "rmk_sup",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '은행명',
                            fieldName: "nm_bank",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: 'add_sup',
                            fieldName: "add_sup",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: 'yn_use2',
                            fieldName: "yn_use2",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: 'no',
                            fieldName: "no",
                            dataType: RealGridJS.DataType.NUMBER
                        },
                        {
                            note: 'ty_biz',
                            fieldName: "ty_biz",
                            dataType: RealGridJS.DataType.NUMBER
                        },
                    ],
                    columns: [
                        {
                            name: "cd_supplier",
                            fieldName: "cd_supplier",
                            header: {
                                text: "code"
                            },
                            editor: {
                                type: "number",
                                maxLength: 6,
                                positiveOnly: true
                            },
                            displayRegExp: /^([0-9]+)$/,
                            displayReplace: //function (match, p1, offset, string) {
                                function (item) {
                                    if(item.toString().length >= 6)
                                        return item.toString().substr(item.toString().length - 6);
                                    else
                                        return "";
                                },
                            styles: {
                                textAlignment: "center"
                            },
                            editButtonVisibility: 'hidden',
                            width: 40
                        },
                        {
                            name: "nm_supplier",
                            fieldName: "nm_supplier",
                            header: {
                                text: "공급자"
                            },
                            editor: {
                                maxLength: 5
                            },
                            styles: {
                                textAlignment: "near"
                            },
                            width: 140
                        },
                        {
                            name: "yn_use",
                            fieldName: "yn_use",
                            header: {
                                text: "사용"
                            },
                            values: [0, 1],
                            labels: ["여", "부"],
                            editor: {
                                type: "dropDown",
                                dropDownCount: 2,
                                dropDownPosition: "button",
                                partialMatch: "true",
                                maxLength : 1
                            },
                            dynamicStyles: [
                                {
                                    criteria: "value = 0",
                                    styles: {
                                        figureBackground: "#ff0000ff",
                                        foreground: "#000fff"
                                    },
                                },
                                {
                                    criteria: "value = 1",
                                    styles: {
                                        figureBackground: "#ff0000ff",
                                        foreground: "#ffff0000"
                                    }
                                }
                            ],
                            lookupDisplay: true,
                            styles: {
                                textAlignment: "center"
                            },
                            width: 40,
                            validateFunc: function (gridView, index, value) {
                                if (value) {
                                    console.log("validateFunc : ", value)
                                   if(parseInt(value) > 0 && parseInt(value) <= 1)
                                       return true;
                                    else
                                        return false;
                                } else {
                                    return false;
                                }
                            }
                        },
                        {
                            name: "no_biz",
                            fieldName: "no_biz",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "no_social",
                            fieldName: "no_social",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "nm_krname",
                            fieldName: "nm_krname",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "key_bank",
                            fieldName: "key_bank",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "cd_bank",
                            fieldName: "cd_bank",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "no_acnum",
                            fieldName: "no_acnum",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "nm_bankn",
                            fieldName: "nm_bankn",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "no_zip",
                            fieldName: "no_zip",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "add_sup1",
                            fieldName: "add_sup1",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "add_sup2",
                            fieldName: "add_sup2",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "tel_sup1",
                            fieldName: "tel_sup1",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "tel_sup2",
                            fieldName: "tel_sup2",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "tel_sup3",
                            fieldName: "tel_sup3",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "nm_supplprt",
                            fieldName: "nm_supplprt",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "rmk_sup",
                            fieldName: "rmk_sup",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "nm_bank",
                            fieldName: "nm_bank",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "add_sup",
                            fieldName: "add_sup",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "yn_use2",
                            fieldName: "yn_use2",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "no",
                            fieldName: "no",
                            visible: false,
                            editable: false
                        },
                        {
                            name: "ty_biz",
                            fieldName: "ty_biz",
                            visible: false,
                            editable: false
                        },
                    ],
                    options: {
                        panel: {visible: false},
                        indicator: {visible: false},
                        checkBar: {
                            visible: true,
                            checkableExpression: "state <> 'c'",
                            checkableOnly: true
                        },
                        stateBar: {visible: false},
                        edit: {
                            skipReadOnly: true,
                            //skipReadOnlyCell: true, // 입력불가 컬럼 포커스 Skip
                            commitWhenExitLast: true,
                            maxLengthToNextCell : true
                            //crossWhenExitLast: true,
                        },
                        selection: {style: 'singleRow'},
                        header: {
                            height: 31
                        },
                        display: {
                            fitStyle: 'evenFill',
                            columnResizable: true,
                            focusColor: "#ff5292f7",
                            focusActiveColor: "#ff1c90fb",
                            focusBorderWidth: 2,
                            rowHeight: 28
                        },
                        footer: {
                            visible: false
                        }
                    },
                    styles: GridStyle.styles
                };
                return setInfo;
            case "subGrid":
                setInfo = {
                    // 그리드 컬럼설정
                    name: gridName,
                    style: {
                        width: '550px',
                        height: '400px',
                    },
                    //왠만하면 field 명과 column명은 동일하게 쉬운 유지보수를 위해
                    fields: [
                        {
                            note: 'code',
                            fieldName: "cd_suppy",
                            dataType: RealGridJS.DataType.NUMBER
                        },
                        {
                            note: '공급자명',
                            fieldName: "nm_supdeman",
                            dataType: RealGridJS.DataType.TEXT
                        },
                        {
                            note: '날짜',
                            fieldName: "da_date",
                            dataType: RealGridJS.DataType.DATETIME
                        }
                    ],
                    columns: [
                        {
                            name: "cd_suppy",
                            fieldName: "cd_suppy",
                            header: {
                                text: "code"
                            },
                            styles: {
                                textAlignment: "near"
                            },
                            width: 100,
                            visible: true,
                            editable: false
                        },
                        {
                            name: "nm_supdeman",
                            fieldName: "nm_supdeman",
                            header: {
                                text: "공급자명"
                            },
                            styles: {
                                textAlignment: "near"
                            },
                            width: 348,
                            visible: true,
                            editable: false
                        },
                        {
                            name: "da_date",
                            fieldName: "da_date",
                            header: {
                                text: "날짜"
                            },
                            styles: {
                                textAlignment: "near"
                            },
                            width: 100,
                            visible: true,
                            editable: false
                        }
                    ],
                    options: {
                        panel: {visible: false},
                        indicator: {visible: false},
                        checkBar: {
                            visible: true,
                            checkableExpression: "state <> 'c'",
                            checkableOnly: true
                        },
                        stateBar: {visible: false},
                        edit: {
                            skipReadOnly: true,
                            //skipReadOnlyCell: true, // 입력불가 컬럼 포커스 Skip
                            commitWhenExitLast: true,
                            maxLengthToNextCell : true
                            //crossWhenExitLast: true,
                        },
                        selection: {style: 'singleRow'},
                        header: {
                            height: 31
                        },
                        display: {
                            fitStyle: 'evenFill',
                            columnResizable: true,
                            focusColor: "#ff5292f7",
                            focusActiveColor: "#ff1c90fb",
                            focusBorderWidth: 2,
                            rowHeight: 28
                        },
                        footer: {
                            visible: false
                        }
                    },
                    styles: GridStyle.styles,
                };
                return setInfo;
            default:
                return;
        }
    }
}


export default GridInfo;