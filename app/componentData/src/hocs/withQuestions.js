import React from 'react'
function getQuestions() {

}

export default (Component) => {
    return ({navigation}) => <Component navigation={navigation} questions={[{
        examiner: '정한',
        type: 'shortAnswer',
        contents: '2019년 Github의 최고 Star 수를 기록하는 그룹은 무엇일까?',
        comment: '2019년 10월 6일 기준, Google은 983,825개의 총 Star 수를 기록하며 2등인 Microsoft와 10만개정도의 격차를 두고있습니다.',
        answer: '구글',
        otherAnswers: ['Google']
    }, {
        examiner: '정한',
        type: 'OX',
        contents: `React에서 SSR을 사용하지 않으면 검색엔진에 노출되지 않는다.`,
        answer: false,
        comment: 'Google에서는 자체 자바스크립트 엔진을 사용하여 웹사이트를 먼저 렌더링 한 후에 검색DB에 반영합니다.',
    }, {
        examiner: '정한',
        type: 'multipleChoice',
        answer: 0,
        selections: ['Function', 'Object', 'map', 'Weak-map'],
        contents: 'Vue의 Single file component에서 $vm.data는 어떤 타입이여야 할까?',
        comment: 'Single file component에서 $vm.data는 Object를 반환하면 `Function`이여야 합니다.'
    }]} />
}