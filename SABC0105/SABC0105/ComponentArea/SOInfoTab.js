import React, {Component} from 'react';
import {LUXTextField,LUXBusinessField} from 'luna-rocket/LUXTextField';

const styles = {
    inputBlock: {
        marginTop: 10
    }
}

class SOInfoTab extends Component {

    constructor() {
        super(...arguments);

        this.state = {
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
        };
    }

    componentWillReceiveProps = (nextProp) => {
        this.setState({
            disabled: nextProp.disabled,
            no_biz: nextProp.no_biz,
            no_social: nextProp.no_social,
            nm_krname: nextProp.nm_krname,
            nm_bank: nextProp.nm_bank,
            no_acnum: nextProp.no_acnum,
            nm_bankn: nextProp.nm_bankn,
            no_zip: nextProp.no_zip,
            add_sup1: nextProp.add_sup1,
            add_sup2: nextProp.add_sup2,
            tel_sup1: nextProp.tel_sup1,
            tel_sup2: nextProp.tel_sup2,
            tel_sup3: nextProp.tel_sup3,
            nm_supplprt: nextProp.nm_supplprt,
            rmk_sup: nextProp.rmk_sup
        });
    }

    enterEvent = (e) => {
        let inputID  = e.target.id;
        let inputVal = e.target.value;
        if(e.key == 'Enter'){

            let inputObj ={
                inputID: inputID,
                inputVal: inputVal
            }

            //Input data를 dataprovider에 셋팅
            this.props.Callbacks.SetFromInputData(inputObj);

            setTimeout(() => {
                //포커스 이동
                if(inputID == 'no_biz'){
                    this.refs['no_social'].handleInputFocus();
                }
                else if(inputID == 'no_social'){
                    this.refs['nm_krname'].handleInputFocus();
                }
                else if(inputID == 'nm_krname'){
                    this.refs['nm_bank'].handleInputFocus();
                }
                else if(inputID == 'nm_bank'){
                    this.refs['no_acnum'].handleInputFocus();
                }
                else if(inputID == 'no_acnum'){
                    this.refs['nm_bankn'].handleInputFocus();
                }
                else if(inputID == 'nm_bankn'){
                    this.refs['no_zip'].handleInputFocus();
                }
                else if(inputID == 'no_zip'){
                    this.refs['add_sup1'].handleInputFocus();
                }
                else if(inputID == 'add_sup1'){
                    this.refs['add_sup2'].handleInputFocus();
                }
                else if(inputID == 'add_sup2'){
                    this.refs['tel_sup1'].handleInputFocus();
                }
                else if(inputID == 'tel_sup1'){
                    this.refs['tel_sup2'].handleInputFocus();
                }
                else if(inputID == 'tel_sup2'){
                    this.refs['tel_sup3'].handleInputFocus();
                }
                else if(inputID == 'tel_sup3'){
                    this.refs['nm_supplprt'].handleInputFocus();
                }
                else if(inputID == 'nm_supplprt'){
                    this.refs['rmk_sup'].handleInputFocus();
                }
                else if(inputID == 'rmk_sup'){
                    this.props.Callbacks.SetFocusGrid('addRow');
                }
            }, 100);
        }
    }

    onClick = () =>{
        this.props.Callbacks.OnCodeHelpClick("nm_bank");
    }

render()
{
    return (
        <div className="LUX_basic_tbl">
            <table className="tblarea2">
                <colgroup>
                    <col style={{width: 120}}/>
                    <col />
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">
                        <div className="inbx">사업자등록번호</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                               <LUXTextField id="no_biz"
                                             ref="no_biz"
                                             disabled={this.state.disabled}
                                             disabledHintText=''
                                             defaultValue={this.state.no_biz}
                                             onKeyDown={this.enterEvent.bind(this)}
                                             style={{maxWidth: '134px', width: '80%'}}
                                             maxLength={'12'}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">주민등록번호</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                                <LUXTextField id="no_social"
                                              ref="no_social"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.no_social}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '134px', width: '80%'}}
                                              maxLength={'14'}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">성 명</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                                <LUXTextField id="nm_krname"
                                              ref="nm_krname"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.nm_krname}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '134px', width: '80%'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">은 행 명</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                                <LUXTextField id="nm_bank"
                                              ref="nm_bank"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              customIconType="help"
                                              defaultValue={this.state.nm_bank}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              onTouchTapButton={this.onClick.bind(this)}
                                              style={{maxWidth: '134px', width: '80%'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">계좌번호/예금주</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                                    <LUXTextField id="no_acnum"
                                                  ref="no_acnum"
                                                  disabled={this.state.disabled}
                                                  disabledHintText=''
                                                  defaultValue={this.state.no_acnum}
                                                  onKeyDown={this.enterEvent.bind(this)}
                                                  style={{float: 'left', maxWidth: '134px', width: '80%',marginRight: '5px'}}/>

                                    <LUXTextField id="nm_bankn"
                                                  ref="nm_bankn"
                                                  disabled={this.state.disabled}
                                                  disabledHintText=''
                                                  defaultValue={this.state.nm_bankn}
                                                  onKeyDown={this.enterEvent.bind(this)}
                                                  style={{float: 'left', maxWidth: '134px', width: '80%',marginRight: '5px'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">우편번호</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_small">
                                <LUXTextField id="no_zip"
                                              ref="no_zip"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.no_zip}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '134px', width: '80%'}}
                                              maxLength={'5'} />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">주 소</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_full">
                                <LUXTextField id="add_sup1"
                                              ref="add_sup1"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.add_sup1}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '306px', width: '80%'}}/>
                            </div>
                            <div className="inbx_full">
                                <LUXTextField id="add_sup2"
                                              ref="add_sup2"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.add_sup2}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '306px', width: '80%'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">전화번호</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_num">
                                <LUXTextField id="tel_sup1"
                                              ref="tel_sup1"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.tel_sup1}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{float:'left', maxWidth: '46px', width: '80%'}}
                                              maxLength={'4'} />
                                <span className="dash"> ) </span>
                                <LUXTextField id="tel_sup2"
                                              ref="tel_sup2"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.tel_sup2}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{float:'left', maxWidth: '46px', width: '80%'}}
                                              maxLength={'4'} />
                                <span className="dash"> - </span>
                                <LUXTextField id="tel_sup3"
                                              ref="tel_sup3"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.tel_sup3}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{float:'left', maxWidth: '46px', width: '80%'}}
                                              maxLength={'4'} />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">인쇄할공급자명</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_full">
                                <LUXTextField id="nm_supplprt"
                                              ref="nm_supplprt"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.nm_supplprt}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '306px', width: '80%'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <div className="inbx">비 고</div>
                    </th>
                    <td>
                        <div className="inbx">
                            <div className="inbx_full">
                                <LUXTextField id="rmk_sup"
                                              ref="rmk_sup"
                                              disabled={this.state.disabled}
                                              disabledHintText=''
                                              defaultValue={this.state.rmk_sup}
                                              onKeyDown={this.enterEvent.bind(this)}
                                              style={{maxWidth: '306px', width: '80%'}}/>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        );
    }
};
export default SOInfoTab;