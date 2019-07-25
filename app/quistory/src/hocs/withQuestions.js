import React from 'react'
function getQuestions() {

}

export default (Component) => {
    return () => <Component questions={[{
        examiner: '유헷',
        type: '4지선다',
        content: '다음중 내가 오늘 먹은 반찬은?',
        selection: ['된장찌개', '고구마 줄기', '맛탕', '김가루'],
        comment: '맛탕은 맛있기 때문입니다. 맛탕은 특히 감자로 해도 되고 고구마로 해도 되고 호박도 맛있기 때문이에요.',
        answer: 2
    }, {
        examiner: '유헷',
        type: 'OX',
        content: `홍경래의 난, 진주 농민 봉기, 임술 농민 봉기를 계기로 농민의 사회의식은 성장하였다.`,
        answer: false,
        comment: '해설은 이렇게 표시된다고 하네요?!',
    }]} />
}