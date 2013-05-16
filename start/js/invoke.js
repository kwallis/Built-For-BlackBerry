/**
 * Copyright (c) 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, document, console, alert, blackberry */

/* This file holds the majority of the functionality for Media Capture and File Pickers
 * both with and without Cards.
 */

var _invoke = {
	/* These variables will be updated to reflect our currently selected Card and Mode. */
	card: null,
	mode: null,

	/* We will leverage _invoke.log instead of alert to keep our messages from interfering with our flow. */
	log: function (text) {
		'use strict';
		var div, log;

		/* Create a new <div> to house our message and populate it. */
		div = document.createElement('div');
		div.innerHTML = text;
		div.style.fontSize = 'smaller';

		/* Retrieve the logging <div> and insert this message at the top. */
		log = document.querySelector('#log');
		log.insertBefore(div, log.firstChild);
	},

	/* Called when the user clicks one of the Card pill buttons. */
	setCard: function (card) {
		
		/* Update our current Card selection. */
		_invoke.card = card;

		if (card === 'camera') {
		 	_invoke.setMode(blackberry.invoke.card.CAMERA_MODE_PHOTO);
		} else if (card === 'filepicker') {
			_invoke.setMode(blackberry.invoke.card.FILEPICKER_MODE_PICKER);
		}

	},

	/* Called when the user clicks one of the Mode pill buttons. */
	setMode: function (mode) {
		
		/* Depending on the current card, we update the associated mode. */
		_invoke.mode[_invoke.card] = mode;
	},

	/* This function will be called when the user clicks the Invoke button. */
	invoke: function () {
		'use strict';
		var options, onComplete, onCancel, onInvoke, onError;

		if (_invoke.card === 'camera') {
			/****************************************/
			/*********** TASK MC2 GOES HERE ***********/
			/****************************************/
		} else if (_invoke.card === 'filepicker') {
			/**
			 * Additional options that are available include:
			 * - type					(e.g. FILEPICKER_TYPE_* where * can be PICTURE, DOCUMENT, MUSIC, VIDEO, OTHER)
			 * - viewMode				(e.g. FILEPICKER_VIEWER_MODE_* where * can be LIST, GRID, DEFAULT)
			 * - sortBy					(e.g. FILEPICKER_SORT_BY_* where * can be NAME, DATE, SUFFIX, SIZE)
			 * - sortOrder				(e.g. FILEPICKER_SORT_ORDER_* where * can be ASCENDING, DESCENDING)
			 * - filter					(e.g. ["*.mp3", "*.png*"])
			 * - imageCropEnabled		(true or false)
			 * - defaultSaveFileNames	(when opening a single or multiple items, default names can be provided as an [] for saving.)
			 * - defaultType			(if multiple type values are provided as an [], the default to filter by.)
			 * - allowOverwrite:		(true or false)
			 */
			options = {
				mode: _invoke.mode.filepicker
			};

			/* Log the path(s) we pick on completion. */
			onComplete = function (path) {
				_invoke.log('Picked: ' + path);
			};

			/* Log if we cancel selection. */
			onCancel = function (reason) {
				_invoke.log('Cancelled: ' + reason);
			};

			/* Will be called when the File Picker is invoked. */
			onInvoke = function (error) {
				if (error) {
					_invoke.log('Invoke error: ' + error);
				} else {
					_invoke.log('Invoke success.');
				}
			};

			/* Call the invokeFilePicker function with our defined arguments. */
			blackberry.invoke.card.invokeFilePicker(options, onComplete, onCancel, onInvoke);
		} else if (_invoke.card === 'custom') {
			/****************************************/
			/*********** TASKS MC3 and MC4 GO HERE ***********/
			/****************************************/
		}
	}
};