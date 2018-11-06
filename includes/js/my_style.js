 
	/* ONLOAD */
	
		/*jQuery.fn.outerHTML = function(s) { return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html(); };*/
  
		$(function () { 
		
			/* SEARCH */ 
			
				var FORM_ID = "_com_liferay_portal_search_web_portlet_SearchPortlet_fm";
				
				var INPUT_ID = "_com_liferay_portal_search_web_portlet_SearchPortlet_keywords"; 
				
				if( ( $("#top-menu-pane-4 form#" + FORM_ID).length == 0 ) && ( $("form#" + FORM_ID).length ) ){
					
					$('<div class="bg bg-white ph-sm-xs pt-no-xs mt-lg-xs"> <div class="container"> <div class="search-header"> <p class="mb-md"><span class="search-count"></span> Resultados para</p> <div class="row mb_md"> <div class="col-md-5 pull-right"> <form class="rounded-form"> <div class="input-group">  <input id="searh-str" class="form-control" placeholder="Realizar otra búsqueda">  <span class="input-group-btn"> <button class="btn btn-default form-control" type="submit"> <i class="fa fa-search" aria-hidden="true"></i> </button> </span> </div> </form>   </div> <div class="col-md-7"> <h1 class="search-title">“Ahorrar para el futuro”</h1> </div> </div> </div> <hr class="color-light-gray mv-lg"><div class="row"> <div class="col-md-8 col-md-offset-2">      <div class="div-resultados">  <div class="box-white box-plantilla hidden"> <p class="box-title text-blue text-md"> <span class="span-blue"></span> </p> <p class="box-text"></p> <p class="box-info text-xs"></p> </div>  </div>       <nav class="nav-navigation"> <ul class="pagination gray" style="margin:0; width:auto;"> </ul> </nav>   </div> </div> </div> </div>').insertBefore("form#" + FORM_ID); 
					 
					$(".search-header form").attr("name"  , $( "form#" + FORM_ID ).attr("name")   );
					$(".search-header form").attr("action", $( "form#" + FORM_ID ).attr("action") );
					
					$("form#" + FORM_ID + " input").not( "input#" + INPUT_ID ).addClass("hidden").clone().appendTo(".search-header form .input-group");
					 
					$(".search-header form input#searh-str").attr( "name", INPUT_ID );					
					
					//$(".search-header form button").attr( "id", $( "form#" + FORM_ID + " button" ).attr("id") );
					//$(".search-header form button").attr( "onclick", $( "form#" + FORM_ID + " button" ).attr("onclick") );
					
					$(".search-header h1.search-title").html( '"' + $( "input#" + INPUT_ID ).val() + '"' ); 
					
					$("form#" + FORM_ID + " ul.display-style-descriptive.tabular-list-group li.list-group-item").each( function() { 
					
						var param = $( "input#" + INPUT_ID ).val(); 
						
						var regex = new RegExp( '(' + param + ')', "gi" );
							
							if( $(this).find('h5').length ) { 
					 
								var new_box = $("div.div-resultados .box-plantilla").clone().removeClass("box-plantilla").removeClass("hidden");
						
								$(this).find('h5 a:first-child').addClass('text-blue text-md');  
								
								$(this).find('h5 a').html( $(this).find('h5 a').html().replace( '<strong>', '' ).replace( '</strong>', '' ) );
								
								$(this).find('h5 a').each( function() {  $(this).html( $(this).html().replace( regex, '<span class="span-blue">' + '$1' + '</span>') );  });
								 
								 
								if( $(this).find('h5'             ).length )	new_box.find('.box-title').html( $(this).find('h5').html() ); 
																				 
								if( $(this).find('h6:nth-child(3)').length )    new_box.find('.box-text' ).html( $(this).find('h6:nth-child(3)').html().replace( regex, '<span class="span-blue">' + '$1' + '</span>') ); 
								
								if( $(this).find('h6:nth-child(2)').length )    var box_info = $(this).find('h6:nth-child(2)').html();
								
								
								var box_links = '';	
								
									if( $(this).find('span.taglib-asset-tags-summary').length ) {
										
										$(this).find('span.taglib-asset-tags-summary').find('a').removeClass( 'badge badge-default badge-sm' ).addClass('link_ text-xs text-deep-blue');
										box_links = $(this).find('span.taglib-asset-tags-summary').html(); 
										box_links = ' - <span class="text-xs text-deep-blue">' + box_links + '</span>';
									}
							 
								new_box.find('.box-info').html( box_info + box_links );

								new_box.appendTo("div.div-resultados");
							}
					});
					
					$("form#" + FORM_ID + " ul.pagination > li:first-child a").html('<span aria-hidden="true">&laquo;</span>');
					$("form#" + FORM_ID + " ul.pagination > li:last-child a").html('<span aria-hidden="true">&raquo;</span>');
					
					$("form#" + FORM_ID + " ul.pagination > li").each( function() {
						
						var new_li = $(this).clone();
						
						new_li.appendTo("div.div-resultados + .nav-navigation ul.pagination");
					});
				
					$("form#" + FORM_ID).addClass("hidden"); //.remove()
				}
				 
				
			/* MENU LAPTOP-DESKTOP */
			
				$('.header-bg-dark .navbar-1 li').on('show.bs.dropdown', function () {
				
					if( !( $(this).hasClass('open') ) ) { 
					 
						$( '.top-menu-content .top-menu-tab-pane').slideUp( "fast", "swing", function(){ $('.header-bg-dark .navbar-3 li.dropdown').removeClass('open'); } );  
						 
						$( $(this).find('a').data('pane') ).slideDown(); 
					}
				});
			
				$('.header-bg-dark .navbar-1 li').on('hide.bs.dropdown', function () {
				
					if( ( $(this).hasClass('open') ) ) { $( $(this).find('a').data('pane') ).slideUp(); }
				}); 
				
				// ----------------------------------------------------------------------------------------------
			
				$('.header-bg-dark .navbar-3 li.dropdown').on('click', function (e){ 
				
					$(this).toggleClass('open');
				
					if( ( $(this).hasClass('open') ) ) { 
					 
						$( '.top-menu-content .top-menu-tab-pane:not( #top-menu-pane-4 )').slideUp( "fast", "swing", function(){} ); 
						
						$( $(this).find('a').data('pane') ).slideDown( "fast", "swing", function(){} ); 
					}
					else 
					{ 
						$( $(this).find('a').data('pane') ).slideUp();  
					} 
				});
			
				$('.header-bg-dark .navbar-3 li.dropdown').on('show.bs.dropdown', function (e){ e.preventDefault(); }); //
			
				$('.header-bg-dark .navbar-3 li.dropdown').on('hide.bs.dropdown', function (e){ e.preventDefault(); }); //
				
				// ----------------------------------------------------------------------------------------------
			
				$('.header-bg-white .navbar-nav li').on('show.bs.dropdown', function () {
				
					if( !( $(this).hasClass('open') ) ) { 
					
						$( '.main-menu-content .main-menu-tab-pane').slideUp( "fast", "swing", function(){} ); 
					
						$( '.top-menu-content #top-menu-pane-4').slideUp( "fast", "swing", function(){ $('.header-bg-dark .navbar-3 li.dropdown').removeClass('open'); } ); 
						 
						$( $(this).find('a').data('pane') ).slideDown(); 
					}
				});
			
				$('.header-bg-white .navbar-nav li').on('hide.bs.dropdown', function () {
				
					if( ( $(this).hasClass('open') ) ) { $( $(this).find('a').data('pane') ).slideUp(); }
				}); 
			
		
			/* MENU */
		 
				$('a.menu-btn').click(function(){  $(this).toggleClass("active");  $('body').toggleClass("hide-overflow");  $('#menu-lateral').toggleClass("open");  $('#menu-lateral ul').removeClass("open");  });
				 
				// ----------------------------------------------------------------------------------------------
				
				$('#menu-lateral a:not( [data-toggle="collapse"] )').click(function(){ $('body').toggleClass("hide-overflow"); $('a.menu-btn').toggleClass("active"); $('#menu-lateral').toggleClass("open"); });
				 
				 
				$('#menu-lateral a[data-toggle="collapse"]').click(function(){ $('#menu-lateral').toggleClass("hide-overflow"); $( '#menu-lateral-pane-' + $(this).data('id') ).toggleClass("open"); }); // $(this).parent().find("ul").toggleClass("open");
				
				// ----------------------------------------------------------------------------------------------
				
				$('.menu-lateral-content a[data-toggle="collapse"]').unbind( "click" );
				 
				 
				$('.menu-lateral-content a[data-toggle="collapse"]').click(function(){ $('.menu-lateral-content .menu-lateral-tab-pane').removeClass("open"); $('#menu-lateral').toggleClass("hide-overflow"); }); //$(this).parent().toggleClass("open"); 
				  
				// ----------------------------------------------------------------------------------------------
				 
				$('.header-bg-blue .btn-rounded-white-xs').click(function(){ $('body').toggleClass("hide-overflow"); $('.menu-lateral-content #menu-lateral-pane-9').toggleClass("open"); });  
					
					
				$('.menu-lateral div.light-header .ion-close-round').click(function(){ $('body').toggleClass("hide-overflow"); $('a.menu-btn').toggleClass("active"); $('#menu-lateral').toggleClass("open"); });
				
		
			/* CONTENT */ 
				
			load_Select();
			
			$('.input-date').datepicker( { language: "es", autoclose:1, format:'dd-mm-yyyy', weekStart:1, todayHighlight: true } ); $('#img-date').on('changeDate', function() { var str = $(this).datepicker('getFormattedDate'); var res = str.split("-"); });   
		  
			// ----------------------------------------------------------------------------------------------
			
			$('.panel-group-filter a').click(function(e){ 
			
				e.preventDefault(); $('.panel-group-filter a').removeClass("selected"); $(this).addClass("selected"); 
				
				$('.panel-group .panel-set').removeClass('hidden');
				
				$('.panel-group .panel-set').show(); if( $(this).data('filter') !== "all") { $('.panel-group .panel-set:not( [data-filter="'+ $(this).data('filter') +'"] )').hide(); } 
				
				$('.panel-group .panel-set:visible .panel-subset').show(); 
				
				load_Select();				
			});
			  
			// ----------------------------------------------------------------------------------------------
			
			$('.btn-select-rounded .dropdown-menu li a').click(function( e ){ e.preventDefault(); $(this).parents().eq(2).find('.selected-value').text( $(this).text() ); $(this).parents().eq(2).find('input').val( $(this).text() ); });
		}); 
		 
		 
		function load_Select() { 
					 
			$('#select-panel-group-filter option').remove(); 
			
			$('#select-panel-group-filter').append( '<option value="all">Ver todo</option>' ); 
			
			$('.panel-group .panel-set:visible .panel-subset').each( function() { var subset = this; var titulo = $( subset ).find('h3').text(); $('#select-panel-group-filter').append( '<option value="' + $( subset ).data('filter') + '">' + titulo + '</option>' ); }); 
		
			$( "#select-panel-group-filter" ).change(function() { 
				
				$('.panel-group .panel-set').removeClass('hidden'); 
				
					$('.panel-group .panel-set:visible .panel-subset').show(); 
				
					if( $(this).val() !== "all") { $('.panel-group .panel-set:visible .panel-subset:not( [data-filter="'+ $(this).val() +'"] )').hide(); }
				
				$('.panel-group .panel-set:visible').each( function() { var set = this; if( $( set ).find('.panel-subset:visible').length == 0  ) $( set ).addClass('hidden'); }); 
		
			}); 
		}
		 
	 
	/* RESIZE */
  
		function onResize() { 
 
			$('.slider-white').each( function() { 
			
				var slider = this; var max = 0; 

				$(slider).find('.carousel-inner .item').each( function() { if( $(this).height() > max ) max = $(this).height(); }); 

				$(slider).find('.carousel-inner').height( max + 20 ); 
			});  

			
			$('.slider-blue').each( function() { 
			
				var slider = this; var max = 0; 

				$(slider).find('.carousel-inner .item').each( function() { if( $(this).height() > max ) max = $(this).height(); }); 

				$(slider).find('.carousel-inner').height( max + 20 ); 
			}); 
		}  
		 
	 
	/* SCROLL_UP */
		 
		function scroll_Up( time = 500, pos = 0, func = 0 ) { 
		
			jQuery('html,body').animate( { scrollTop: pos }, time, function() { if( func != 0 ) func(); } ); 
		} 
	 
	 
	/* PAGINADOR */
		 
		function jPipo( padre, hijo, n, paginador ) {  
			
			var total = $( padre + ' > ' + hijo ).length;  var pages = Math.ceil( total / n ); 
			 
			for (var i = 1; i <= total; i++) { $( padre + ' > ' + hijo + ':nth-child(' + i + ')' ).attr('data-page', Math.ceil( i / n ) ); }      //   $( padre + ' > ' + hijo + ':nth-child(' + i + ')' ).append( '<p class="text-med">' + i + '</p>' ); 
			
			for (var i = 1; i <= pages; i++) { $( paginador ).append( '<li><a href="#" data-page="' + i + '">' + i + '</a></li>' ); } 
			
			$( paginador ).attr('data-padre', padre ); $( paginador ).attr('data-hijo', hijo );
			
			$( paginador + " > li a" ).click(function(e) { e.preventDefault();  jPipo_show( this ); });
			
			$( padre + ' > ' + hijo + '[data-page="1"]' ).show();   $( paginador + " > li:first-child a" ).addClass('selected'); 
		}
		 
		 
		function jPipo_bind( padre, hijo, paginador ) {  
			 
			$( paginador ).attr('data-padre', padre ); $( paginador ).attr('data-hijo', hijo );
			
			$( paginador + " > li a" ).click(function(e) { e.preventDefault();  jPipo_show( this ); });
			
			$( padre + ' > ' + hijo ).hide();   $( padre + ' > ' + hijo + ':first-child' ).show();   $( paginador + " > li:first-child a" ).addClass('selected'); 
		}
		
		
		function jPipo_show( e ) {
		 
			var ul = $( e ).parent().parent();  var padre = ul.data('padre');  var hijo = ul.data('hijo'); ul.find('a').removeClass('selected');  $( e ).addClass('selected');  
			
			scroll_Up( 300, $( padre ).parent().parent().offset().top - 50, 
			
				function() {  
			 
					$( padre + ' > ' + hijo + ":visible" ).fadeOut( "fast", function() { jQuery( padre ).animate( { scrollTop: 0 }, 10, function() {} ); $( padre + ' > ' + hijo + '[data-page="' + $( e ).data('page') + '"]' ).fadeIn( "fast"); }); 
				});
		}
