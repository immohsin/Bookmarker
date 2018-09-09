document.getElementById("myform").addEventListener("submit", saveBookmark);

function saveBookmark(e){
       var siteName = document.getElementById("siteName").value;
       var siteUrl = document.getElementById("siteUrl").value;
       
       if(validateRegex(siteUrl)){
       var bookmark = {
           siteName: siteName,
           siteUrl: siteUrl
       }
       if(localStorage.getItem('bookmarks') == null){
           var bookmarks = [];
           bookmarks.push(bookmark);
           localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       }
       else{
           var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
           bookmarks.push(bookmark);
           localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       }
       document.getElementById("myform").reset();
       showResult();
    }
    else{
        alert("Enter a valid website url");
    }
}

function showResult(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var result = document.getElementById("boomarkResult");
    result.innerHTML = "";
     bookmarks.forEach((bookmark) => {
         var name = bookmark.siteName;
         var url = bookmark.siteUrl;

        result.innerHTML+='<div class="well">'+
                          '<h3>'+name+
                          '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                          ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" >Delete</a> ' +
                          '</h3>'+
                          '</div>';
     });
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i =0; i< bookmarks.length;i++){
        if(bookmarks[i].siteUrl == url){
            bookmarks.splice(i,1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    showResult();
    
}

function validateRegex(url){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
       
       if(url.match(regex)){
           return true;
       }
       return false;
}