(function () {
	
	var d = document;

	var c = {
		tag:'gameCanvas',

		engineDir:'../../lib/cocos2d/',
		
		appFiles:['../../lib/box2d/box2d.js','Passo2.js','MenuLayer.js']
	};

	window.addEventListener('DOMContentLoaded', function () {
		
		var s = d.createElement('script');
		
		s.src = c.engineDir + 'platform/jsloader.js';
		
		d.body.appendChild(s);
		
		s.c = c;
		
		s.id = 'cocos2d-html5';
		

	});
})();