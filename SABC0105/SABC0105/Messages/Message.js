import React from "react"

let MSGs = {
    //그리드에서 데이터 삭제시
    singleDeleteMessage : (pCode) => { return pCode + " 공급자를 삭제하시겠습니까?" },
    multiDeleteMessage : (pRowCnt) => {
        return (
            <div>
                현재 체크된 데이터가 {pRowCnt}건 존재합니다.<br />
                체크된 데이터를 모두 삭제하시겠습니까?
            </div>
        )
    },
    failInputValidate : "입력값 유효성 검사 실패",
    noneExistsLoadData : "조회할 데이터가 없습니다.",
    noneExistsDeleteRow : "삭제할 데이터가 없습니다.",
    //관리항목이 존재하는 전표에서 삭제버튼을 클릭할때
    failDelete : "관리항목이 존재합니다. 관리항목을 먼저 삭제한 후 삭제 및 편집이 가능합니다.",

    //코드도움이 없는 컬럼에서, 코드도움(f2) 클릭시
    noneExistsCodehelp : "해당 코드도움이 없습니다.",

    //(자금, 어음, 일마감, 계좌관리, 자동전표)가 존재하는 데이터를 체크한 상태에서 이동버튼을 클릭할때
    failCopy : "자금(어음등), 일마감, 계좌관리, 자동전표 데이터는 이동하실 수 없습니다.",

    successCopy : "전표를 해당일자로 성공적으로 복사했습니다.",
    successMove : "전표를 해당일자로 성공적으로 이동했습니다.",
    noneExistsDiffJournalizing : "대차차액이 발생된 분개 데이터가 없습니다.",
    usingSupplierMessage : "선택한 공급자는 일반전표 사용자입니다. 자세한 리스트를 확인하시겠습니까?"

}

export default MSGs;