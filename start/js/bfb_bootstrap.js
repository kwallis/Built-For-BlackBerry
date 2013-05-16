/*
 * Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// called by the webworks ready event
function initApp() {
	console.log('app init');
	bb.pushScreen('main.html', 'main');
}


// setup window covers, and register with bbm platform
function welcome() {
	// show a welcome message
	toast("Welcome to the BFB Sample!");

	// setup the window cover (displayed when app is minimized)
	blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
		path: 'local:///cover.png'
	});
	blackberry.ui.cover.updateCover();

	// register with bbm
	bbm.register();
}


// called when access is given by the user to connect w/bbm via bbm.register()
function accessChangedCallback(accessible, status) {
	if (status == "unregistered") {
		// App is unregistered, proceed to register
		registerApp();
	} else if (status == "allowed") {}
	// Listen for other status...
}


// setup the global bbm object so we can call bbm.<function> from where-ever in the app
var bbm = {
	registered: false,

	// registers this application with the blackberry.bbm.platform APIs.
	register: function() {
		blackberry.event.addEventListener('onaccesschanged', function(accessible, status) {

			if (status === 'unregistered') {
				blackberry.bbm.platform.register({
					/* Complete TASK #2 */
					uuid: 'd5ea6d8d-facd-410f-8812-a8d173a3c0c8'
				});

			} else if (status === 'allowed') {
				bbm.registered = accessible;
			}
			/* Complete TASK #3 */


		}, false);
	},

	// update the users personal message in bbm
	updateMessage: function() {

		// dialog callback
		function dialogCallBack(selection) {
			var txt = selection.promptText;
			blackberry.bbm.platform.self.setPersonalMessage(
			txt,

			function(accepted) {
			});
		}

		// standard async dialog to get new 'personal message' for bbm
		blackberry.ui.dialog.standardAskAsync("Enter your new status", blackberry.ui.dialog.D_PROMPT, dialogCallBack, {
			title: "I am a dialog"
		});
	},

	// invite a contact to download your app via bbm
	inviteToDownload: function() {
		/* Complete TASK #7 */

	},

	/**
	 * populate: Retrieve BBM profile information and populate a BBUI screen.
	 */
	populate: function (element) {
		element.querySelector('#displayname').setCaption(blackberry.bbm.platform.self.displayName);

		element.querySelector('#available').setChecked(
			blackberry.bbm.platform.self.status === 'available' ? true : false
		);
		/* Complete TASK #4 */

	},

	/**
	 * save: Updates the user's BBM profile based on the current information.
	 */
	save: function () {
		/* Complete TASK #5 */

		/* Complete TASK #6 */
	}

};


// invoke the filepicker card
function invokeFilePicker(details, type) {
	//TODO: Invoke the filePicker
	//blackberry.invoke.card.invokeFilePicker
	//For more info: http://developer.blackberry.com/html5/apis/blackberry.invoke.card.html#.invokeFilePicker


	blackberry.invoke.card.invokeFilePicker(details, function(path) {

		//TODO: Handle OnDone
		// 		Create 'share' request object and send it to loadShareCard
	},

	// cancelled filepicker
	function(reason) {
		//TODO: Handle OnCanel
		//		Send a toast message with the reason it was cancelled
		//		See toast()


		// filepicker error
	}, function(error) {
		//TODO: Hande OnInvoke
		//		1. Handle error === true
		//			Show Toast Message
		//		2. Handle error === false
		//			Here we dont need to worry about this so we can just log that it was a success
	});

}


// load the share card
function loadShareCard(title, request) {
	//TODO: Make invoke target picker request
	//For more info check
	//http://developer.blackberry.com/html5/apis/blackberry.invoke.card.html#.invokeTargetPicker
	//blackberry.invoke.card.invokeTargetPicker
}


// display a toast message to the user
function toast(msg) {
	blackberry.ui.toast.show(msg);
}