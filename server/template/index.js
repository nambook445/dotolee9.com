module.exports = {
    HTML:function(title, list, body, control,login){
        return `<!DOCTYPE html>
        <html lang="ko">
        <head>
    <link rel="stylesheet" type="text/css" href="/css/style.css"">
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="lang/summernote-ko-KR.js"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Dongle&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="css/style.css">
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>

            <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

            <title>${title}</title>
        </head>
        <body>
            <div class="intro_bg">
                <header>    
                    <img src="" alt="로고">
                    <h1>${title}</h1>
                   ${login}
                </header>
                    <nav>
                        <ul class="nav">
                            <li><a href="/">홈</a></li>
                            <li><a href="/create">글쓰기</a></li>
                            <li><a href="/board/1">관리</a></li>
                        </ul>
                    </nav>
            </div>
            <main>
                <article>
                    ${list}
                    ${control}
                    ${body}
                </article>
                <aside>
                    광고
                </aside>
            </main>
            <footer>
                만든사람과 연락처
            </footer>
        </body>
        </html>`
    },LIST:function (results) {
        var list = '<ul>';
        var i = 0;
        while(i < results.length){
        list = list + `<li><a href="/page/${results[i].id}">${results[i].title}</a></li>`;
        i++;
        }   
    list = list+'</ul>';
    return list;      
    },BOARD:function (results) {
        var tag = `<table>
                    <tr>
                        <td>번호</td>
                        <td>제목</td>
                        <td>등록시간</td>
                        <td>닉네임</td>
                        <td>수정</td>
                        <td>삭제</td>
                    </tr>`
        var i = 0;            
        while(i < results.length){
            tag += `
            <tr>
                <td>${results[i].id}</td>
                <td><a href="/page/${results[i].id}">${results[i].title}</a></td>
                <td>${results[i].created}</a></td>
                <td>${results[i].nickname}</td>
                <td><a href="/update/${results[i].id}">update</a></td>
                <td>
                    <form method="post" action="delete_process">
                        <input type="hidden" name="id" value="${results[i].id}">
                        <input type="submit" name="${results[i].id}" value="delete">
                    </form>    
                </td>
                </tr>
            `;
            i++;
        }    
        tag += `
        </table>
        `
        ;
        return tag;     
    },LOGIN: function (req, res) {
        if(!req.user){
          return '<a class="nav-link" href="/login">Login</a>'
        } return "<a class='nav-link' href='/logout'>Logout</a>"
    },IsOwner: function (req, res) {
          if(req.user){
              return true;
          } else {
              return false;
          }
    },LISTCONTROL: function (listNum, pageNum) {
        // var curpage = pageNum;
        // var startpage = ;
        // var pagelimit = 5;
        
        // }
        
        
        
        var tag = `
        <table>
        <td><a href="/board/"><</a></td>`;
        var i = 1;
        while(i <= listNum){
           tag += `<td><a href="/board/${i}">${i}</a></td>`
            i++;
        }
        tag += `
        <td><a href="/board/">></a></td>
        </table>`;
        return tag;
      }
};