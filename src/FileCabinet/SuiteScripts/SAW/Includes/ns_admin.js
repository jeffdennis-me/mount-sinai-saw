(function($) {

	$(document).ready(function() {

		var zindex_tool = '<div id="zindex"><span class="increase_zindex"><i class="fas fa-plus"></i></span><span class="zvalue"><input type="textbox" value="{{current_zindex}}"></span><span class="decrease_zindex"><i class="fas fa-minus"></i></span></div>';
		var hw_tool = '<div id="heightwidth"><div class="heightwidth_row"><span class="change_height"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></span><span class="shift_icon"><span class="height">{{height}}</span><span class="width">{{width}}</span><i class="fas fa-square"></i></span></div><div class="heightwidth_row"><span class="change_width"><i class="fas fa-arrow-left"></i><i class="fas fa-arrow-right"></i></span></div><span class="change_width"></span></div>';

		var active_transform = null;
		var initial_matrix = null;
		var initial_top = null;
		var initial_left = null;
		var current_matrix = null;
		var current_top = null;
		var current_left = null;
		var current_zindex = null;
		var current_unit_height = null;
		var current_unit_width = null;
		var current_rule = null;

		if ( $('#poszoom').length > 0 ) {

			console.log( "Admin scripts loaded" );

			$('#draw-tool-toggle').remove();
			$('#print_button').remove();
			$('#show_available').remove();

			$('.zoom').off("panzoomend");

			$(document).on('click', '.poszoom', function ( e ) {

				if ( active_transform != null ) {
					// Do nothing if there is an active transform
					alert("Cannot change modes when a map is selected. Press Escape, Backspace, or Return / Enter to release the map.");
					return;
				}

				/*
				 * If in the positioning mode, move to the zindex / widthheight mode
				 */
				if ( $('.poszoom').hasClass('setpos') ) {

					$('#poszoom .poszoom-icon').removeClass('fa-unlock-alt').addClass('fa-lock');
					//$('.zoom').panzoom("enable");

					$('.poszoom').removeClass('setpos').addClass('setzoom');

					if ( active_transform != null ) {

						active_transform.freetrans('destroy');
					}

				} else {

					/*
					 * If in the zindex / widthheight mode, move to the positioning mode
					 */

					$('#poszoom .poszoom-icon').removeClass('fa-lock').addClass('fa-unlock-alt');
					//$('.zoom').panzoom("resetDimensions");
					//$('.zoom').panzoom("disable");

					$('.poszoom').removeClass('setzoom').addClass('setpos');

					//$('#image-map-pro-container').width('1500px');
					MTS.alignOverlay();

				}

				$('.poszoom').blur();

			});

			$(document).keydown( function ( event ) {
console.log( "Noted keydown: " + event.which );
				if ( active_transform == null ) {
					console.log("Active Transform");
					return;
				}

				if ( event.which == 13 ) {
					// "Return" pressed, submit change

					current_matrix = active_transform.css('transform').replace("matrix(", "").replace(")", "");
					current_top = active_transform.css('top');
					current_left = active_transform.css('left');
					current_zindex = active_transform.css('zIndex');

					if ( current_top == '0px' ) {
						var matrix_array = current_matrix.split(',');
						current_left = matrix_array[ 4 ];
						current_top = matrix_array[ 5 ];
					}

					var update_map = active_transform.attr('id').replace('-container', '');
					var url = "/app/site/hosting/scriptlet.nl?script=customscript_cemetery_app&deploy=customdeploy_cemetery_app&update_map=" + update_map + "&matrix=" + current_matrix + "&top=" + current_top + "&left=" + current_left + "&zindex=" + current_zindex + "&unit_width=" + current_unit_width + "&unit_height=" + current_unit_height;
					$.get( url, function ( data ) {
						if ( data != 'success' ) {
							alert( data );
						} else {
							console.log( data );
						}
					});

					if ( $('.poszoom').hasClass('setpos') ) {

						// Only re-adjust the freetrans object if we were moving it

						active_transform.freetrans('destroy');

						// Now, because this plugin resets location (top / left), we need to add the top/left attributes back into the matrix and remove the top / left from the element
						var matrix_array = current_matrix.split(',');
						matrix_array[ 4 ] = current_left.replace('px', '');
						matrix_array[ 5 ] = current_top.replace('px', '');
						active_transform.css('transform', 'matrix(' + matrix_array.join(',') + ")");
						active_transform.css('left','0px');
						active_transform.css('top','0px');
						current_zindex = null;

					}
					
					active_transform.removeClass('active');

					active_transform = null;

					$('#zindex').remove();
					$('#heightwidth').remove();

				} else if ( event.which == 27 ) {

					// "Escape" Pressed, ignore change and reset position

					active_transform.css('transform', initial_matrix);
					active_transform.css('left', initial_left);
					active_transform.css('top', initial_top);
					current_zindex = null;
					if ( $('.poszoom').hasClass('setpos') ) {
						// Only do this if we are in the transform mode
						active_transform.freetrans('destroy');
					}
					active_transform.removeClass('active');
					active_transform = null;

					$('#zindex').remove();
					$('#heightwidth').remove();

				} else if ( event.which == 8 ) {

					// "Backspace" Pressed, ignore change, leave position
					current_matrix = active_transform.css('transform').replace("matrix(", "").replace(")", "");
					current_zindex = null;
					if ( $('.poszoom').hasClass('setpos') ) {
						// Only do this if we are in the transform mode
						active_transform.freetrans('destroy');
					}
					active_transform.removeClass('active');
					var matrix_array = current_matrix.split(',');
					matrix_array[ 4 ] = current_left.replace('px', '');
					matrix_array[ 5 ] = current_top.replace('px', '');
					active_transform.css('transform', 'matrix(' + matrix_array.join(',') + ")");
					active_transform.css('left','0px');
					active_transform.css('top','0px');
					active_transform = null;

					$('#zindex').remove();
					$('#heightwidth').remove();

				}
			});

			$(document).on('click', '.location-map-container', function( e ) {
console.log("Initiate Map Change");
				if ( active_transform == null && $('.poszoom').hasClass('setpos') ) {
console.log("No Active Transform, Set the map position");
					active_transform = $(e.target).closest( '.location-map-container' );

					active_transform.addClass('active');

					initial_matrix = active_transform.css('transform');
					initial_left = active_transform.css('left');
					initial_top = active_transform.css('top');

					console.log( "Transforming Map: " + active_transform.attr('id').replace('-container', '') );
					var top = active_transform.css('top').replace('px', '');
					var left = active_transform.css('left').replace('px', '');
					var matrix = ( active_transform.css('transform') != 'none' ) ? active_transform.css('transform').replace("matrix(", "").replace(")", "") : '1, 0, 0, 1, 0, 0';

					var matrix_numbers = matrix.split(',');

					for ( var i = 0; i < matrix_numbers.length; i++ ) {
						matrix_numbers[ i ] = matrix_numbers[ i ].replace('0.', '.');
					}

					matrix = "matrix(" + matrix_numbers.join(',') + ")";

					var freeTransOps = {
						matrix: matrix
					};

					active_transform.freetrans( freeTransOps );

					

				} else if ( active_transform == null && $('.poszoom').hasClass('setzoom') ) {
console.log("No Active Transform, Set the map zindex");
					// Do everything else with the units and zindex
					active_transform = $(e.target).closest( '.location-map-container' );
					active_transform.css('border', '1px solid #F00');
					active_transform.addClass('active');

					current_zindex = parseInt(active_transform.css('zIndex')) - 400; // Minimum z-index is 400, so we want this to appear as "1" if default
					current_zindex = ( current_zindex >= 1 ) ? current_zindex : 1;

					var css_rules = $('#computed_styles').text();
					var find_rule_id = active_transform.attr('id');
					var regex_string = '#' + find_rule_id + ' .imp-shape {(.*)}';
					var regex = new RegExp( regex_string, 'gi' );

					current_rule = css_rules.match( regex )[ 0 ];
					var replace = '#' + find_rule_id + ' .imp-shape {';
					var rule_data = current_rule.replace(replace, '').replace('}','').split(';');

					current_unit_width = 9;
					current_unit_height = 27;

					if ( rule_data.length > 0 ) {
						for ( var i = 0; i < rule_data.length; i++ ) {
							var rule_info = rule_data[ i ].split(':');
							if ( typeof rule_info[ 1 ] == 'undefined' ) {
								continue;
							}
							var rule_value = rule_info[ 1 ].replace('!important', '').replace('%','');

							switch( rule_info[ 0 ] ) {
							case 'width':
								current_unit_width = Math.round( parseFloat(rule_value) * 10);
								break;
							case 'height':
								current_unit_height = Math.round( parseFloat(rule_value) * 10);
								break;
							}
						}
					}

					var current_zindex_tool = zindex_tool.replace('{{current_zindex}}', current_zindex);
					var current_hw_tool = hw_tool.replace('{{width}}', current_unit_width).replace('{{height}}', current_unit_height);

					$('body').append( current_zindex_tool );
					$('body').append( current_hw_tool );


				} else {
console.log("Do nothing, either an active transform or something else went wrong");
console.log( active_transform );
				}

			});

			$(document).on('click', '.increase_zindex, .decrease_zindex', function( e ) {

				if ( $( e.target ).closest('span').hasClass('decrease_zindex') ) {

					current_zindex--;

				} else if ( $( e.target ).closest('span').hasClass('increase_zindex') ) {

					current_zindex++;

				}

				$('.zvalue input').val( current_zindex );
				active_transform.css('zIndex', current_zindex + 400);

			});

			$(document).on('click', '#heightwidth .fas', function( e ) {

				var icon = $( e.target ).closest('i');
				var action = icon.attr('class').replace('fas','').replace('fa-arrow-','').trim();

				switch( action ) {
				case 'up':
					// Increase height
					current_unit_height++;
					break;
				case 'down':
					// Decrease height
					current_unit_height--;
					break;
				case 'right':
					// Increase width
					current_unit_width++;
					break;
				case 'left':
					// Decrease width
					current_unit_width--;
					break;
				}

				$('#heightwidth .height').text( current_unit_height );
				$('#heightwidth .width').text( current_unit_width );

				var css_rules = $('#computed_styles').text();
				// 		#la-ca-2-container .imp-shape {width: 1.2% !important;height: 1.3% !important;}
				var converted_width = parseFloat( current_unit_width / 10 );
				var converted_height = parseFloat( current_unit_height / 10 );
				var new_rule = "#" + active_transform.attr('id') + ' .imp-shape { width: ' + converted_width + "% !important;height: " + converted_height + "% !important;}";

				css_rules = css_rules.replace( current_rule, new_rule );
				current_rule = new_rule;

				$('#computed_styles').text( css_rules );
			});

			$(document).on('mouseover', '.location-map-container', function( e ) {
				$(e.target).closest('.location-map-container').css('border', '1px solid #DDD');
			});

			$(document).on('mouseout', '.location-map-container', function( e ) {
				$(e.target).closest('.location-map-container').css('border', '');
			});

		}

	});

} )(this.jQuery);