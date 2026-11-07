/* Hồ sơ người học đơn giản: không cần tài khoản, lưu trong trình duyệt của thiết bị này. */
(function(){
  var PK="lp_profiles", AK="lp_active";
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function del(k){try{localStorage.removeItem(k)}catch(e){}}
  function list(){try{return JSON.parse(get(PK)||"[]")||[]}catch(e){return []}}
  function saveList(a){set(PK,JSON.stringify(a))}
  function active(){var id=get(AK);return list().filter(function(p){return p.id===id})[0]||null}
  var DEF_EN="I’m a business analyst in Vietnam working on IT projects for Japanese clients";
  var DEF_JP="ベトナム人のBA。日本語はN2+、日系のIT案件に携わっている";
  window.LP={
    list:list, saveList:saveList, active:active, get:get, set:set, del:del,
    DEF_EN:DEF_EN, DEF_JP:DEF_JP,
    setActive:function(id){set(AK,id)},
    clearActive:function(){del(AK)},
    key:function(base){var p=active();return p?base+"@"+p.id:base},
    aboutEn:function(){var p=active();return (p&&p.aboutEn)||DEF_EN},
    aboutJp:function(){var p=active();return (p&&p.aboutJp)||DEF_JP},
    ROLES:{ba:"Business Analyst (BA)",dev:"Developer",qa:"QA / Tester",pm:"Project Manager / Team lead",other:"Khác"},
    prof:function(){var a=active()||{};return {role:a.role||"ba",roleText:a.roleText||"",industry:a.industry||"",level:a.level||"B1",goal:a.goal||"Giao tiếp công việc"}},
    roleLabel:function(){var q=this.prof();return q.role==="other"?(q.roleText||"IT professional"):this.ROLES[q.role]},
    keysOf:function(id){var out=[];try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.slice(-(id.length+1))==="@"+id)out.push(k)}}catch(e){}return out},
    /* Trang khoá học gọi hàm này ngay trong <head>: chưa chọn người học thì quay về trang chủ. */
    require:function(){
      if(active())return true;
      document.documentElement.style.visibility="hidden";
      var page=location.pathname.split("/").pop()||"";
      location.replace("index.html?next="+encodeURIComponent(page+location.hash));
      return false;
    },
    bar:function(){
      var p=active();if(!p)return;
      var nav=document.createElement("nav");
      nav.className="lp-bar";nav.setAttribute("aria-label","Điều hướng chung");
      nav.innerHTML='<a href="index.html">← Trang chủ</a><span class="lp-who">👤 <b></b></span><a href="index.html?switch=1">Đổi người học</a>';
      nav.querySelector("b").textContent=p.name;
      var st=document.createElement("style");
      st.textContent=".lp-bar{display:flex;gap:16px;align-items:center;flex-wrap:wrap;max-width:1180px;margin:0 auto;padding:10px 20px 0;font:14px/1.4 'Be Vietnam Pro','Lexend',system-ui,sans-serif;color:inherit}.lp-bar a{color:inherit;opacity:.75;text-decoration:none}.lp-bar a:hover{opacity:1;text-decoration:underline}.lp-who{margin-left:auto;opacity:.85}.lp-bar b{font-weight:600}";
      document.head.appendChild(st);
      document.body.insertBefore(nav,document.body.firstChild);
    }
  };
})();
