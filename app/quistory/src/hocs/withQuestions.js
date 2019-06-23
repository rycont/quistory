import React from 'react'
function getQuestions() {

}

export default (Component) => {
    return () => <Component questions={[{
        examiner: '유헷',
        type: '주관식',
        content: `세력을 확대하며, 철기문화를 받아드린 2세기 이후 집권자 이름은 무엇인가요?`,
        comment: '해설은 이렇게 표시된다고 하네요?!',
        answer: '페니키아'
    }, {
        examiner: '유헷',
        type: 'OX',
        content: `홍경래의 난, 진주 농민 봉기, 임술 농민 봉기를 계기로 농민의 사회의식은 성장하였다.`,
        answer: 'X',
        comment: '해설은 이렇게 표시된다고 하네요?!',
    }, {
        examiner: '유헷',
        type: '4지선다',
        content: "권문세족의 특징으로 옳지 않은 것은무엇인가요?",
        answer: 2,
        comment: '해설은 이렇게 표시된다고 하네요?!',
    }]} />
}