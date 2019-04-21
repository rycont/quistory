import React from 'react'
import withTitleAndContent from '../components/basicScreen'
import { QuestionCard } from '../components/questioncard'

export default () => {
    let scrolly
    const QnaScreenWithData = withTitleAndContent('질문')(false)(({hideTitlebar, showTitlebar, scrollHeight}) => {
        console.log(scrollHeight)
        return (<React.Fragment>
            <QuestionCard hideTitlebar={hideTitlebar} showTitlebar={showTitlebar} author="클리앙" content={`여기엔 트위터스러운 짧은 문구가 어울립니다.`} date="2019-04-11 13:41:26" />
            <QuestionCard hideTitlebar={hideTitlebar} showTitlebar={showTitlebar} author="클리앙" content={`1kg 정도 무게에 가벼운 게이밍이 가능한 14인치 노트북을 알아보던중 작년말에 출시한 ASUS 젠북 UX433FN 모델이 눈에 띄더라구요



무게도 적당하고 외장 GPU인 MX150(비록 max-q 모델로 추정되지만)을 탑재한데다 가격대도 100만원 정도로 저렴한편이어서 구매하게 되었습니다.



일반적인 사무용으로는 흠잡을데가 없었습니다만 게이밍시 문제가 심각하더라구요.



무슨 게임이든지간에 처음에는 멀쩡하다가 시작한지 1~2분 경과시 쓰로틀링에 걸려 FPS가 10프레임 수준으로 떨어지면서 정상적인 게임이 불가능해집니다.



재미있는건 GPU 온도가 65도 정도밖에 안되는데도 쓰로틀링이 걸린다는겁니다. GPU 사용률도 50% 정도밖에 안되는데도 말이죠.



제가 알기론 엔간한 노트북은 게임시 65도 정도면 매우 양호한 수준이고 80도 정도까지도 흔히 올라가는 것 같은데



이 모델은 애초에 설계할때 온도가 65도에 도달하면 성능을 죽여서 이 이상으로는 온도가 올라가지 못하도록 만들어놓은것 같습니다.



해외 포럼에 검색해봐도 비슷한 문제를 겪고있는 사람들이 많던데 이렇게 세팅해놓고 MX150을 탑재해서 게임이 가능하다고 광고하는것은 허위광고 아닌가 싶은 생각까지 들더군요.



관련하여 아수스 코리아에 문의메일을 보냈더니 그래픽 드라이버를 다시 설치해보고 해결이 안되면 AS센터에 맡기라는 동문서답을 들을 수 있었습니다.ㅋ



여튼 문제를 해결해보려고 인터넷을 뒤져가며 ASUS GPU Tweak, MSI 애프터버너, throttlestop 등 각종 프로그램을 설치해서 이런저런 설정을 다 만져본 결과



throttlestop으로 CPU 전압을 -125mv 내리고 애프터버너로 GPU 클럭을 900Mhz 정도로 고정시켜놓으니 10분 정도 게임을 돌려도 심하게 끊기지 않고 어느정도 플레이 할만한 수준이 되었습니다.



제가 하드웨어쪽은 잘 모르지만 언더볼팅으로 성능을 낮춰서 발열 수준을 65도 밑으로 끌어내려 해결이 된것 같습니다.



65도 온도제한을 풀어서 해결하고 싶었지만 이건 도저히 방법을 못찾겠더라구요. 혹시 방법을 아시는분은 댓글 부탁드립니다.



여튼 외장그래픽을 탑재한 노트북의 발열문제가 심각하다고는 하지만 65도 온도제한은 너무한것 아닌가 싶네요. 쓰지도 못할 외장그래픽은 왜 달아놓은건지 모르겠습니다.



결론은 가격대비 나쁘지 않은 노트북인것 같긴 합니다만 게이밍을 생각하고 살 모델은 아니라는 생각이 들구요.



그리고 추가적인 단점으로 화면 반사가 좀 심합니다. 동영상같은거 보고있으면 화면에 제 얼굴이 거울처럼 비쳐서 좀 불쾌하더라구요ㅋ



제가 노트북을 잘 알지는 못하지만 같은 모델 구입을 고려중이신 분들이나 비슷한 쓰로틀링 문제를 겪고 계신분들께 혹시 도움이 될까 싶어서 글을 올려봤습니다.`} />
            <QuestionCard hideTitlebar={hideTitlebar} showTitlebar={showTitlebar} author="달덩이또율이" content={`안녕하세요 달덩이또율이 입니다

시작하기 앞서 저는

100만원대 유선이어폰

50만원이하 코드리스제품을

많이 써본 리스너 입니다

(제주관^^)



음질

돈값하는 음질입니다

공간감도 적당히 있고

선명 합니다



저음이 강조되어 있으며

둥둥 거리고 묵직한

양감저음 입니다

소니의 양감저음과는 다른

젠하이저의 묵직함이 느껴집니다

`} />
        </React.Fragment>)
    })
    return (
        <QnaScreenWithData />
    )
}