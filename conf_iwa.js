var conf_iwa = {};

var data_iwa={};
var data_thread_iwa={};

conf_iwa.start = function () {
    document.addEventListener("click", conf_iwa.click);
};

conf_iwa.click = function (ev) {
    var src = ev.target;

    if (src.has_class("threads_inp")) {
        conf_iwa.threads();
	}else if (src.has_class("createThread_inp")) {
        conf_iwa.createThread();
	}else if (src.has_class("showThread_inp")){
		conf_iwa.showThread();
	}else if (src.has_class("reply_inp")){
		conf_iwa.reply();
	}else if (src.has_class("deleteThread_inp")){
		conf_iwa.deleteThread();
	}else if (src.has_class("thread_id")){
		conf_iwa.open_thread(src);
	}else if (src.has_class("prevListThread_inp")){
		conf_iwa.prev_listThread();
	}else if (src.has_class("nextListThread_inp")){
		conf_iwa.next_listThread();
	}else if (src.has_class("prevPage_inp")){
		conf_iwa.prev_page();
	}else if (src.has_class("nextPage_inp")){
		conf_iwa.next_page();
	}else if (src.has_class("actualise_inp")){
		conf_iwa.actualise();
	}else if (src.has_class("image_inp")){
		conf_iwa.baliseImage();
	}else if (src.has_class("video_inp")){
		conf_iwa.baliseVideo();
	}
};

conf_iwa.actualise = function() {
	window.location.reload();
};

conf_iwa.open_thread = function(src) {
	var thread = src.getAttribute("data-thread");
	document.getElementsByClassName("nb_thread")[0].value=thread;
	conf_iwa.showThread();
};

conf_iwa.cb_threads = function () {
    if (this.readyState == 4 && this.status == 200) {
		var regexp = new RegExp("[0-9]+","g");
		var donnees = this.responseText.match(regexp);
		data_iwa.threads=donnees;
		data_iwa.thread_page = 0;
		data_iwa.thread_page_max = (donnees.length-(donnees.length%10))/10;
		document.getElementsByClassName("threads_res")[0].innerHTML = "";
		for(var i = 0; i<donnees.length && i < 10; i++){
			document.getElementsByClassName("threads_res")[0].innerHTML += "<span class=\"list-group-item thread_id\" data-thread=\""+donnees[i]+"\">"+"Thread : "+donnees[i]+"</span>";
		}
    }
};

conf_iwa.prev_listThread = function(){
	data_iwa.thread_page--;
	data_iwa.thread_page= (data_iwa.thread_page<0?0:data_iwa.thread_page);
	var p = data_iwa.thread_page;
	document.getElementsByClassName("threads_res")[0].innerHTML = "";
		for(var i = p*10; i<data_iwa.threads.length && i < (p+1)*10; i++){
			document.getElementsByClassName("threads_res")[0].innerHTML += "<span class=\"list-group-item thread_id\" data-thread=\""+data_iwa.threads[i]+"\">"+"Thread : "+data_iwa.threads[i]+"</span>";
		}
}

conf_iwa.next_listThread = function(){
	data_iwa.thread_page++;
	data_iwa.thread_page= (data_iwa.thread_page>data_iwa.thread_page_max?data_iwa.thread_page_max:data_iwa.thread_page);
	var p = data_iwa.thread_page;
	document.getElementsByClassName("threads_res")[0].innerHTML = "";
		for(var i = p*10; i<data_iwa.threads.length && i < (p+1)*10; i++){
			document.getElementsByClassName("threads_res")[0].innerHTML += "<span class=\"list-group-item thread_id\" data-thread=\""+data_iwa.threads[i]+"\">"+"Thread : "+data_iwa.threads[i]+"</span>";
		}
}

conf_iwa.cb_showThread = function () {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse( this.responseText);
		document.getElementsByClassName("thread_res")[0].innerHTML = "";
		document.getElementsByClassName("nbThread_res")[0].innerHTML = "<span data-show-thread=\""+data.id+"\">"+data.id+"    <button  class=\"deleteThread_inp btn btn-danger\" type=\"submit\"><span class=\"glyphicon glyphicon-remove\"></span> Supprimer le thread</button>";
		data_thread_iwa.messages = [];
		for(var i = 0; i<data.thread.length; ++i){
			var message = data.thread[i];
			var reg = new RegExp("https://", "g");
			message = message.replace(reg, "//");
			if(message.search(/\[author\].+\[\/author\]/i ) != -1){
				message = message.replace(/\[author\](.+)\[\/author\]/i ,"<img src=\"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-33-512.png\" height=\"40\" width=\"40\" class=\"img-circle\"><strong> $1</strong></br></br>");
			}else
				message = "<img src=\"https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-33-512.png\" height=\"40\" width=\"40\" class=\"img-circle\"><strong> Inconnu</strong></br></br>" + message;
				
			var t = message;
			while(t != ""){
				message = t;
				t="";
				if(message.search(/\[vid\].+\[\/vid\]/i ) != -1)
					t =  message.replace(/\[vid\](.+)\[\/vid\]/i ,"<iframe width=\"560\" height=\"315\" src=\"$1\" frameborder=\"0\" allowfullscreen></iframe>");
				if(message.search(/\[img\].+\[\/img\]/i ) != -1)
					t = message.replace(/\[img\](.+)\[\/img\]/i ,"<img  src=\"$1\"/ height=\"400\" width=\"400\">");
			}
			message = "</br><div class=\"well well-sm\"><p style=\"overflow-wrap:break-word;\">&nbsp;&nbsp;&nbsp;"+message+"</p></div>";
		
			data_thread_iwa.messages.push(message);
		}
		data_thread_iwa.thread_page = 0;
		data_thread_iwa.thread_page_max = (data_thread_iwa.messages.length-(data_thread_iwa.messages.length%10))/10;
		for(var i = 0; i< data_thread_iwa.messages.length && i < 10; i++){
			document.getElementsByClassName("thread_res")[0].innerHTML += data_thread_iwa.messages[i];
		}
		if(data_thread_iwa.messages.length >10){
			document.getElementsByClassName("thread_res_button")[0].innerHTML = "<ul class=\"pager\"><li class=\"previous\"><a class=\"prevPage_inp\"><span class=\"glyphicon glyphicon-backward\"></span> Page précédente</a></li><li class=\"next\"><a class=\"nextPage_inp\">Page suivante <span class=\"glyphicon glyphicon-forward\"></span></a></li></ul>";
		}
	}
};

conf_iwa.prev_page = function(){
	data_thread_iwa.thread_page--;
	data_thread_iwa.thread_page= (data_thread_iwa.thread_page<0?0:data_thread_iwa.thread_page);
	var p = data_thread_iwa.thread_page;
	document.getElementsByClassName("thread_res")[0].innerHTML = "";
		for(var i = p*10; i<data_thread_iwa.messages.length && i < (p+1)*10; i++){
			document.getElementsByClassName("thread_res")[0].innerHTML += data_thread_iwa.messages[i];
		}
}

conf_iwa.next_page = function(){
	data_thread_iwa.thread_page++;
	data_thread_iwa.thread_page= (data_thread_iwa.thread_page>data_thread_iwa.thread_page_max?data_thread_iwa.thread_page_max:data_thread_iwa.thread_page);
	var p = data_thread_iwa.thread_page;
	document.getElementsByClassName("thread_res")[0].innerHTML = "";
		for(var i = p*10; i<data_thread_iwa.messages.length && i < (p+1)*10; i++){
			document.getElementsByClassName("thread_res")[0].innerHTML += data_thread_iwa.messages[i];
		}
}

conf_iwa.cb_createThread = function () {
    if (this.readyState == 4 && this.status == 200) {
		var regexp = new RegExp("[0-9]+","g");
		var donnees = this.responseText.match(regexp);
        document.getElementsByClassName("createThread_res")[0].innerHTML = "<span class=\"list-group-item thread_id\" data-thread=\""+donnees+"\">"+"ID: "+donnees+"</span>";
    }
};

conf_iwa.cb_replyThread = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("replyThread_res")[0].innerHTML = "<h3 class=\"bg-success\">Message envoyé</h3>";
		document.getElementsByClassName("reply")[0].value = "";
		setInterval(function () { document.getElementsByClassName("replyThread_res")[0].innerHTML = "";}, 6000);
    }
};

conf_iwa.cb_deleteThread = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("deleteThread_res")[0].innerHTML = "</br><p class=\"bg-danger\">Thread supprimé</p>";
		document.getElementsByClassName("thread_res")[0].innerHTML = "";
		document.getElementsByClassName("nbThread_res")[0].innerHTML = "";
		document.getElementsByClassName("nb_thread")[0].value = "";
		document.getElementsByClassName("author")[0].value = "";
		document.getElementsByClassName("reply")[0].value = "";
		setInterval(function () { document.getElementsByClassName("deleteThread_res")[0].innerHTML = "";}, 6000);
    }
};

conf_iwa.threads = function () {
	var req = "http://tp-iwa.waxo.org/get_threads?id_log=Ipestis";
	conf_iwa.get(req, conf_iwa.cb_threads);
};

conf_iwa.createThread = function () {
	var message = document.getElementsByClassName("add_message")[0].value;
    if (message) {
		var req = "http://tp-iwa.waxo.org/new_thread?info="+message+"&id_log=Ipestis";
		conf_iwa.get(req, conf_iwa.cb_createThread);
    } else {
        console.log("42");
    }
};

conf_iwa.showThread = function () {
	var nbThread = +document.getElementsByClassName("nb_thread")[0].value;
    if (nbThread) {
		var req = "http://tp-iwa.waxo.org/show_thread?id="+nbThread+"&id_log=Ipestis";
		conf_iwa.get(req, conf_iwa.cb_showThread);
    } else {
        console.log("42");
    }
};

conf_iwa.reply = function () {
	var replyNbThread = +document.getElementsByClassName("nb_thread")[0].value;
	var authorMsg = document.getElementsByClassName("author")[0].value;
	var msgReply = document.getElementsByClassName("reply")[0].value;
	var date= new Date();
    if (msgReply) {
		if(authorMsg){
			var req = "http://tp-iwa.waxo.org/reply_to_thread?id="+replyNbThread+"&info=\[author\]"+authorMsg+", le "+date.toLocaleDateString() +" à "+date.toLocaleTimeString()+"[\/author\]"+msgReply+"&id_log=Ipestis";
		}else{
			var req = "http://tp-iwa.waxo.org/reply_to_thread?id="+replyNbThread+"&info="+msgReply+"&id_log=Ipestis";
		}
		conf_iwa.get(req, conf_iwa.cb_replyThread);
		conf_iwa.showThread();
    } else {
        console.log("42");
    }
};

conf_iwa.deleteThread = function () {
	var threadToDelete = document.getElementsByClassName("nb_thread")[0].value;
    if (threadToDelete) {
		var req = "http://tp-iwa.waxo.org/delete_thread?id="+threadToDelete+"&id_log=Ipestis";
		conf_iwa.get(req, conf_iwa.cb_deleteThread);
    } else {
        console.log("42");
    }
};

conf_iwa.baliseImage = function () {
	document.getElementsByClassName("reply")[0].value += "[img][/img]";
};

conf_iwa.baliseVideo = function () {
	document.getElementsByClassName("reply")[0].value += "[vid][/vid]";
};

conf_iwa.get = function(req, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", req, true);
    xhr.onreadystatechange = cb;
    xhr.send();
};

window.onload = setTimeout(conf_iwa.start, 1);

HTMLElement.prototype.has_class = function (c) {
    return this.className.indexOf(c) >= 0;
};
