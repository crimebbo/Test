import React, { Component } from 'react';
import LUXSelectField from 'luna-rocket/LUXSelectField'

const styles = {
    gubun: {
        width: "80px",
        marginTop: "10px",
        marginLeft: "10px",
    }
}

const selectedObj = {
    fromYn : 0,
    toYn: 1
}

class SearchCondition extends Component {
    constructor(){
        super(...arguments);
    }

    handleOnChangeGubun = (eventY) => {

        let selectedGubun = eventY;

        if(selectedGubun == "전체"){
            selectedObj.fromYn = '0';
            selectedObj.toYn = '1'
        }
        else if(selectedGubun == "사용"){
            selectedObj.fromYn = '0';
            selectedObj.toYn = '0'
        }
        else{
            selectedObj.fromYn = '1';
            selectedObj.toYn = '1'
        }

        this.props.Callbacks.onChange(selectedObj)
    }

    handleOnFocus = () => {
        this.props.Callbacks.onFocus()
    }


    render() {
        return (
            <ul className="inquiryarea">
                <li style={{display : "inline-block"}}>
                    <LUXSelectField
                        id='gubun'
                        ref="gubun"
                        defaultData="전체"
                        selectFieldData={["전체", "사용", "사용안함"]}
                        style={styles.gubun}
                        listAutoHeight ={true}
                        handleChoiceData={this.handleOnChangeGubun.bind(this)}
                        onFocus={this.handleOnFocus.bind(this)}
                    />
                </li>
            </ul>
        );
    }
};

export default SearchCondition;