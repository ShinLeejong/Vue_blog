# Vue_blog

Vue 2 + Vuetify + Firebase with Cypress, TypeScript

## 20210627
회원 정보의 스키마 구조를 다시 다듬어야겠다고 생각했고,
SignUp.vue를 통해 회원 가입을 구현하고 있습니다.
id duplicate 검사, id & password validation, datepicker bug fix 필요
mdi-phone 제거 on Team.vue

## 20210626
본격적으로 만들어진 프로젝트를 재설계하기 시작합니다.
저와 제 친한 사람들이 같이 사용할 수 있는 공간을 마련하고 싶습니다.
더불어 몇몇 게임에 편리함을 제공할 수 있도록 하고 싶습니다.
PWA 기반으로 만들어졌기 때문에 설치 가능한 웹이므로
다각적으로 UI를 신경써야할 것 같습니다.
<pre>
// /src/components/weather.js
navigator.geolocation.getCurrentPosition(onSuccess, onFail);
</pre>
Navbar의 Sign out 옆에 geolocation에 따른 날씨 정보를 주고 싶어서
만들어 openweathermap.org 의 API를 이용해 만들어보았습니다.

## 20210625
Avatar에 대하여 익혔습니다. 이미지를 예쁘게 사용할 수 있게 하네요.
Navbar를 조금 더 꾸몄습니다.
Projects.vue를 시작했습니다. expansion-panel에 대해 익혔습니다.
<br />
Navbar에 Dropdown을 구현하였습니다(v-menu).
v-dialog를 이용해 Popup을 구현하였습니다.
Popup을 통해 form을 작성하고 submit하도록 했습니다.
<br />
Firebase를 적용하기 시작했습니다. 다음을 수행했습니다.
<pre>
npm install firebase
</pre>
Vuetify Tutorial을 마쳤습니다.

## 20210624
v-btn과 v-icon을 익혔습니다.
mdi(Material Design Icons)와 fa(Font Awesome)라는 것들은 처음 들어보는데, 
유용하게 사용할 수 있을 것 같습니다.
반응형 웹과 관련이 있는 Breakpoint, 그에 따른 Visibility에 대하여 배웠습니다.
toolbar와 spacer에 대하여 학습하였는데, v-toolbar는 v-app-bar로 이름이 바뀌었네요.
v-app-bar-nav-icon 까지 배웠습니다. 개발이 굉장히 편리하네요.
또한 Theme에 대하여 익혔습니다. 이것만 써도 잘 만들 수 있을 것 같습니다.
v-list-item에 대해서 익히는 중입니다. Navbar를 먼저 잘 작성해 볼 예정입니다.
Navbar에서 v-for를 이용해 list를 나열하였고, 그에 따라 Route를 설정했습니다.
<br />
<pre>
v-container, v-card, v-layout, v-flex, etcs & props(xs12, md6, row, wrap 등)
</pre>
Vuetify에서의 Grid System에 대하여 공부했습니다. 거의 디자인적으로 불가능이
없어보일 만큼의 많은 color 종류들과 props가 있는 것을 알게 되었고,
더욱 더 Vuetify를 통해 많은 것을 할 수 있을 것이란 기대감을 얻게 되었습니다.
SelectBar와 v-btn을 만들어 Sorting할 수 있도록 아주 간단하게 만들었습니다.
Tooltip에 대하여 익혔습니다. 좀 복잡한가 싶었는데 이해되었습니다.
<br />
Team.vue를 꾸미기 시작했습니다. 그러면서 다음 내용을 익혔습니다.
<pre>
v-responsive, v-card-text, v-card-actions
</pre>

## 20210623
<pre>
// By Default
vue add Vuetify
</pre>
Vuetify 설치하고, package.json 약간의 수정 등의 기본 세팅 완료했습니다.
<br />
설정 조금 더 건드리고, Vuetify의 아주 기초적인 부분(Props(아주 기초적인, app, dark, height, width 등), Class 일부, v-app의 의미)을 익혔습니다.