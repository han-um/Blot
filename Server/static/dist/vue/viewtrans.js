      $(document).ready(function(){

          // VUE : 상단 메뉴 조작
          // 기능1 : 로그인 여부를 판단하여 로그인 버튼을 표시함
          // 기능2 : 로그인되어있다면 유저 이름을 보여줌
            var username_app = new Vue({
                  el: '#username_app',
                  data: {
                    isLoggedIn : false,
                    s_username : ''
                  },
                 created: function () { // 문서를 불러오면 시작되는 훅
                     //현재 세션이 만들어져있는지 판단(server.js에서 보내줌)
                     <%if(session_user){
                       console.log('[ViewProj-HTML] Recieved Session : ', session_user);%>
                       this.isLoggedIn = true;
                       this.s_username = '<%=session_user.name%>';
                     <%}else{%>
                       this.isLoggedIn = false;
                     <%}%>
                 }
            });

            // VUE COMPONENT : 문장 컴포넌트
            var data = { stcNum: 0 }
             Vue.component('sentence',{
                props:['stc','index'],
                template: "<a href='#' v-on:click='selectStc(1)'>{{stc}} </a>",
                   data: function () {
                    return data;
                  },
              methods: {
                    selectStc: function (input) {
                    // 현재 선택한 문장 정보를 VUE에서 바꾸고
                    view_app.currStcTxt = this.stc;
                    view_app.currStcId = this.index;
                    view_app.currStcTmp = "";
                    // 해결법 : Sentence 전체 반복문을 돌리고
                    // currStcId==%문장인덱스 로 if문 걸어서
                    // 딱 맞을때만 출력하는걸로
                    <% projectInfo[0].doc.sentences.forEach(function(element, index, array) {%>
                        // 해당하는 문장을 판별
                        if(Number(view_app.currStcId) == Number('<%=index%>')){
                            // 문장 안에서 모든 번역 출력
                            <% console.log("NOW : ",element.trans);%>
                                view_app.transHTML = "";
                            <% if(element.trans)
                            {element.trans.forEach(function(e){
                                %>view_app.transHTML += "<div class='info-box' style='padding:15px;'><span class='info-box-icon bg-green'><i class='fa fa-flag-o'></i></span><div class='info-box-content'><span class='info-box-number'>"+'<%=e.text%>'+"</span> <span class='info-box-text'>작성자 : "+'<%=e.idUser%>'+"</span></div></div>";
                            <%});
                            }%>
                        }
                    <%});%>
                }
              }
            })

          // VUE : 전체 프로젝트 보기 처리
          // TODO : 기능 주석 작성
            var view_app = new Vue({
                  el: '#view_app',
                  data: {
                    currTit:"Default",
                    currDesc:"Default",
                    currDId:1,
                    currStcId : 1,
                    currStcTmp : [],
                    currStcTxt : "Default",
                    transHTML : "",
                    compStc: ''
                  },
                 created: function () { // 문서를 불러오면 시작되는 훅
                     <%console.log('[ViewProj-HTML] Recieved Param : ', projectInfo);%>
                     // 현재 프로젝트의 정보 기입
                     this.currTit = '<%=projectInfo[0].title%>';
                     this.currDesc = '<%=projectInfo[0].description%>';
                     this.currDId = '<%=projectInfo[0]._id%>';

                     // 문장 목록을 Node.js에서 VUE변수로 변환해주는 과정
                     this.compStc = [];
                      <% projectInfo[0].doc.sentences.forEach(function(e) { %>
                     this.compStc.push('<%=e.text%>');
                    <%});%>

                 },
                 methods: { // 일반 메소드
                     // 새 번역 등록 메소드
                     submitTrans : function (event) {
                         var input=$("#inpTrans").val();
                         var url="/submitTrans";
                         $.ajax({
                            type:"POST",
                            url:url,
                            data:{"input":input,
                                  "nowProj":view_app.currDId,
                                  "nowStc":view_app.currStcId},
                            success: function(data){
                              // 추가되었으면 수동으로 번역DIV추가
                            }
                            ,
                            error:function(e){
                                alert(e.responseText);
                            }
                        });
                     }
                 }
            });

        });