import React from 'react'
function getQuestions() {

}

export default (Component) => {
    return () => <Component questions={[{
        examiner: '유헷',
        type: '주관식',
        content: `지중해 동부에 위치했으며 알파벳의 기원이 되는 문자를 사용한 국가는무엇인가요?`,
        answer: '페니키아 문자'
    }, {
        examiner: '유헷',
        type: 'OX',
        content: `홍경래의 난, 진주 농민 봉기, 임술 농민 봉기를 계기로 농민의 사회의식은 성장하였다.`,
        answer: 'X'
    }, {
        examiner: '유헷',
        type: '4지선다',
        content: "권문세족의 특징으로 옳지 않은 것은무엇인가요?",
        answer: 2
    }]} />
}