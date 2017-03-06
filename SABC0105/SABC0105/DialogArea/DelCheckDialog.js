import React, { Component } from 'react';

import {GridInfo, GridStyle, SOGrid} from '../GridSetting'

import LUXButton from 'luna-rocket/LUXButton'
import LUXDialog from 'luna-rocket/LUXDialog';

class DelCheckDialog extends React.Component {
    constructor(props) {
        super(props);
        // 그리드설정을 불러옵니다.
        this.subGridSetting = GridInfo.getGridInfo('subGrid');

        this.state = {
            DialogOpen: false,

            customContentStyle: {
                width: '600px',
                maxWidth: 'none',
            },
            searchText: String(),
            tabIndex: 0,
            filter: String(),

            // 그리드 스타일(넓이, 높이)
            subGridStyle: this.subGridSetting.style
        }
    }

    // 컴포넌트가 렌더링 된 후 호출 된다
    componentDidMount = () => {
        this.SubGridView = this.refs["subGrid"]; //실제 그리드

        //소스상에서 조작은 아래 두가지로만!////////////////////////
        this.gridView     = this.SubGridView.getGridView(); //조작을위해 전달 받은 그리드 뷰
        this.dataProvider = this.SubGridView.getDataProvider(); //조작을 위해 전달받은 Provider
    }

    componentWillReceiveProps = (nextProp) => {
        this.setState({DialogOpen: nextProp.Dialog_show});
        this.dataProvider.setRows(nextProp.Dialog_data);
    }

    componentDidUpdate(prevProps, prevState){
        this.gridView.resetSize();
    }

    handleClose(){
        this.setState({
            DialogOpen: false,
            searchText: '',
            tabIndex: 0
        })

        this.props.Callbacks.DelCheckClose();
    }
    render() {
        const dummyGrid = (
            <div>
                <div style={{width: "100%", height: "100%", background: "#abc", lineHeight: "200px", textAlign: "center", color: "#fff", display: "inline-block"}}>
                    <SOGrid ref="subGrid" gridSetting={this.subGridSetting} style={this.state.subGridStyle}/>
                </div>
            </div>

        )

        return(
            <LUXDialog
                dialogOpen={this.state.DialogOpen}
                dialogButton={[
                    <LUXButton onTouchTap={this.handleClose.bind(this)} label="닫기" style={{marginRight: '5px'}}/>
                ]}
                contentStyle={this.state.customContentStyle}
                modal={false}
                dialogBoxStyle={{padding: 20}}
            >
                <div style={{position: "relative", height: 30, textAlign: "center", borderBottom: "1px solid #666"}}>
                    <h6 style={{fontSize: "20px", textAlign: "center"}}>{this.props.Dialog_id}</h6>
                </div>

                <div>
                    {dummyGrid}
                </div>



            </LUXDialog>
        );
    }
}
export default DelCheckDialog;