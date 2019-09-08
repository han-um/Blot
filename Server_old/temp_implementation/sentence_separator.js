/*
  문장 구분 패키지 설치
  npm install sentence-splitter

  패키지 홈페이지
  https://www.npmjs.com/package/sentence-splitter

  위 패키지는 문장 구분 Golden Rule에 따른 라이브러리
  골든 룰 : https://github.com/azu/sentence-splitter/blob/HEAD/test/pragmatic_segmenter/test.ts
*/

var splitter = require("sentence-splitter");

const newsPost = `STATE DEPARTMENT - VOA's Ken Bredemeier and Chris Hannas contributed to this report.

The United States calls Iran's plan to surpass the internationally agreed limit on its stock of low-enriched uranium "nuclear blackmail."

"President [Donald] Trump has made it clear that he will never allow Iran to develop nuclear weapons. The regime's nuclear blackmail must be met with increased international pressure," said White House National Security Council spokesperson Garrett Marquis.

At the State Department, senior officials urged the international community not to yield to the "nuclear extortion" by Iran.

"We continue to call on the Iranian regime not to obtain a nuclear weapon, to abide by their commitments to the international community," said State Department spokesperson Morgan Ortagus on Monday during a briefing, adding that Iran's announcement is "unfortunate" but not surprising.`;

const simplePost = "Her email is Jane.Doe@example.com... I sent her an email.";
let sentences = splitter.split(simplePost);

for(var i=0; i<sentences.length; i++) {
  console.log(sentences[i].raw);
}

//console.log(JSON.stringify(sentences, null, 2));



// 이하 내용은 무시

/*
var text = `If he's restin', I'll wake him up! (Shouts at the cage.) Hello.?
'Ello, Mister Polly Parrot! (Owner hits the cage.) There, he moved!!!`;

var t = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);

console.log(t);

자바스크립트 정규표현식

문자열에서 특정한 캐릭터 조합을 찾아내기 위한 패턴

정규 표현식 플래그
  g : 발생할 모든 pattern에 대한 전역 검색
  [^...] : 대괄호 안의 문자를 제외한 모든 문자
  + : 앞문자를 0~1번 반복
  ? : 문자열 중 가장 적은 문자열을 이용하여 매칭


match()
  문장에서 매치를 위해 검색을 수행하는 String 메소드
  배열 또는 null 문자 리턴
  지정된 패턴과 동일한 패턴을 찾음

split()
  문장에서 매치하는 부분을 배열에 할당하는 String 메소드
  지정된 패턴부분에서 문자열을 나눔

정규 표현식
  ? : 0개 또는 1개의 문자가
  ^ : 입력값의 시작
*/
