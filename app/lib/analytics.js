Ti.App.sep = "|";
var recordurl = 'http://analytics.teamim.net/batchmobile.php';
var teamimurl = 'http://www.teaminternetmarketing.com/mobile?device='+Titanium.Platform.id+'&app='+Ti.App.app
var timer = 10000;

function logEvent(type,aux) {

	var id=Ti.App.uuid;
	var m=Titanium.Platform.model;
	var n=Titanium.Platform.name;
	var o=Titanium.Platform.ostype;
	var v=Titanium.Platform.version;
	
	var displayCaps = Titanium.Platform.displayCaps;
	var w=Titanium.Platform.displayCaps.platformWidth;
	var h=Titanium.Platform.displayCaps.platformHeight;
	var d=Titanium.Platform.displayCaps.density;
	var dpi=Titanium.Platform.displayCaps.dpi;
	var app = Ti.App.app;
	var appv = Ti.App.appv;
	
	sep = Ti.App.sep;

	var evttime = new Date().getTime();
	
	var everything = id+sep+m+sep+n+sep+o+sep+v+sep+w+sep+h+sep+d+sep+dpi+sep+appv+sep+app+sep+type+sep+aux+sep+evttime;
	var format="id"+sep+"model"+sep+"name"+sep+"ostype"+sep+"osversion"+sep+"width"+sep+"height"+sep+"density"+sep+"dpi"+sep+"appversion"+sep+"app"+sep+"eventtype"+sep+"aux"+sep+"evttime";
	
	Ti.API.info("LOG EVENT: " + type+"--");
	var db = Titanium.Database.open(Ti.App.dbname);

	db.execute('INSERT INTO event (timestamp,kind,format,vals,sep,mark) VALUES (?,?,?,?,?,?) ',evttime,type+":"+aux,format,everything,sep,0);
	db.close();
	
	sendLog();
}

var time;


function sendLog() {
	
	var db = Titanium.Database.open(Ti.App.dbname);

	var rows = db.execute('SELECT * FROM event WHERE mark = ?', 0);
	var str = '';
	var marktime  = new Date().getTime();
	var t = '';
	while (rows.isValidRow())
	{
		t = rows.fieldByName('timestamp');
		if(str != '') str = str + "\n";
		str = str + 
			rows.fieldByName('format')+"\t"+
			rows.fieldByName('vals')+"\t"+				
			Ti.App.sep;
		db.execute('UPDATE event SET mark = ? WHERE timestamp = ?',marktime,t);
		rows.next();
	}
	db.close();
	
	var data = {data: str, evtsent: marktime};
	var xhr3 = Titanium.Network.createHTTPClient();
	xhr3.setTimeout(timer);
	xhr3.open("POST",recordurl);
	xhr3.send(data);
	xhr3.mark = marktime;
	Ti.API.info("START: "+recordurl+"  data="+str+"&evtsent="+marktime);
	xhr3.onload = function(e)
	{
		var marktime = this.mark;
		var db = Titanium.Database.open(Ti.App.dbname);
		db.execute('DELETE FROM event WHERE mark = ?',marktime);
		db.close();
		Ti.API.info("SEND ANALYTICS");
//		alert("success: "+marktime+"\n"+this.responseText);
	};
	xhr3.onerror = function(e)
	{
		var marktime = this.mark;
		var db = Titanium.Database.open(Ti.App.dbname);
		db.execute('UPDATE event set mark = ? WHERE mark = ?',0,marktime);
		db.close();
		Ti.API.info("ERROR ANALYTICS: "+e.error);
//		alert("error"+this.responseText);
	};
//	alert(str);
}

