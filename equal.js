jQuery(document).ready(function(){
	var intAnim = null,
		retry = 0,
		storedEvent = null,
		history = [];
	
	function startAnim(event) {
		
		if (null !== intAnim) {
			console.log('Animation is in progress');
			storedEvent = event;
			return;
		}
	
		intAnim = setInterval(function () {
			var height;
			$('.content, .sidebar').css('height', 'auto');
			
			if ($('.content').height() > $('.sidebar').height()) {
				height = $('.content').height();
			} else {
				height = $('.sidebar').height();
			}

			$('.content').height(height);
			$('.sidebar').height(height);
			
			if (-1 === history.indexOf(height)) {
				history.push(height);
			} else if (retry < 5) {
				retry += 1;
			} else {
				retry = 0;
				history = [];
				clearInterval(intAnim);
				intAnim = null;
				
				if (null !== storedEvent) {
					startAnim(storedEvent);
					storedEvent = null;
				}
				
			}
			
		}, 10);
	}
	
	function stopAnim(event) {
//		clearInterval(intAnim);
	}
	
	$('#accordion, #accordion2').on('show.bs.collapse hide.bs.collapse', startAnim);
	$('#accordion, #accordion2').on('shown.bs.collapse hidden.bs.collapse', stopAnim);
});
