//------------------------------------------------------------------
//Copyright 2019, All rights reserved, Prolecto Resources, Inc.

//No part of this file may be copied or used without express, written
//permission of Prolecto Resources, Inc.
//------------------------------------------------------------------

//------------------------------------------------------------------
//Description: Server/View/Render.js
//              The view module for the server side SAW app.
//Developer: Sylvain Muise
//Date: August 21, 2019

/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(['../Library', './Tag'],

function(lib, tag) {

    var newTag = tag.newTag;

    return { wizard : wizard };

    function wizard(DEF, SAW, params) {
        var currentUrl = params.sawUrl +'&customerid='+ params.customerid;

        var head = newTag('head')
            //  Basic Page Needs
            .append(newTag('title')
                .append(DEF.APP_NAME)
            )
            .append(newTag('meta')
                .attr({
                    charset : 'utf-8'
                })
            )
            .append(newTag('meta')
                .attr({
                    name : 'viewport',
                    content : 'width=device-width, ' +
                                'initial-scale=1, ' +
                                'maximum-scale=1, ' +
                                'user-scalable=no'
                })
            );

        head.append(newTag('script')
            .attr({
                src : DEF.URL.jQuery
            })
        );

        for (var i = 0; i < DEF.URL.stylesheet.length; i++) {
            head.append(newTag('link')
                .attr({
                    href : DEF.URL.stylesheet[i],
                    rel : 'stylesheet',
                    type : 'text/css',
                })
            );
        }

        head.append(newTag('style')
            .attr({
                id : 'css_image_map'
            })
        )
        .append(newTag('style')
            .attr({
                id : 'computed_styles',
                type : 'text/css'
            })
            .append(
                '@media print{\n' +
                    '@page {size : landscape }\n' +
                    '.search-container .container {\n' +
                        'transform: scale(0.8);\n' +
                        'transform-origin: top;\n' +
                    '}\n' +
                '}\n'
            )
        );

        var bodyHeader = newTag('header')
            .attr({
                class : 'header-style-2',
                id : 'header-container'
            })
            .append(newTag('div')
                .attr({
                    id : 'header'
                })
                .append(newTag('div')
                    .attr({
                        class : 'container'
                    })
                    .append(newTag('div')
                        .attr({
                            class : 'left-side'
                        })
                        .append(newTag('div')
                            .attr({
                                class : 'margin-top-10',
                                id : 'logo'
                            })
                            .append(newTag('a')
                                .attr({
                                    href : currentUrl
                                })
                                .append(newTag('img')
                                    .attr({
                                        alt : '',
                                        src : DEF.URL.image.logo1
                                    })
                                )
                            )
                            .append(newTag('a')
                                .attr({
                                    class : 'sticky-logo',
                                    href : currentUrl
                                })
                                .append(newTag('img')
                                    .attr({
                                        alt : '',
                                        src : DEF.URL.image.logo2
                                    })
                                )
                            )
                        )
                    )
                    .append(newTag('div')
                        .attr({
                            class : 'right-side'
                        })
                        .append(newTag('div')
                            .attr({
                                class : 'margin-top-10',
                                id : 'title'
                            })
                            .append(newTag('label')
                                .append(DEF.APP_NAME)
                            )
                        )
                    )
                )
                .append(newTag('div')
                    .attr({
                        class : 'menu-responsive'
                    })
                    .append(newTag('i')
                        .attr({
                            class : 'fa fa-reorder menu-trigger'
                        })
                    )
                )
                .append(newTag('nav')
                    .attr({
                        class : 'style-2',
                        id : 'navigation'
                    })
                    .append(newTag('div')
                        .attr({
                            class : 'container'
                        })
                        .append('&nbsp')
//                      .append(newTag('ul')
//                          .attr({
//                              id : 'responsive'
//                          })
//                          .append(newTag('li')
//                              .attr({
//                                  class : 'home'
//                              })
//                              .append(newTag('a')
//                                  .attr({
//                                      class : 'current',
//                                      href : '/app/site/hosting/scriptlet.nl?script=265&deploy=2'
//                                  })
//                                  .append('Home')
//                              )
//                              .append('&nbsp')
//                          )
//                      )
                    )
                )
                .append(newTag('div')
                    .attr({
                        class : 'clearfix'
                    })
                )
            );

        var bodyBody = newTag('div')
            .attr({
                class : 'parallax',
                'data-background' : DEF.URL.image.background,
                'data-color' : '#36383e',
                'data-color-opacity' : '0.5',
                'data-img-height' : '3744',
                'data-img-width' : '5616'
            })
            .append(newTag('div')
                .attr({
                    class : 'container'
                })
                .append(newTag('div')
                    .attr({
                        class : 'row'
                    })
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-2'
                        })
                        .append(newTag('div')
                            .attr({
                                class : 'search-container filter',
                            })
                            .append(newTag('div')
                                .attr({
                                    class : 'row with-forms',
                                    id : 'section_list'
                                })
                            )
                            .append(newTag('div')
                                .attr({
                                    class : 'row with-forms',
                                    id : 'summary'
                                })
                            )
                        )
                    )
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-10'
                        })
                        .append(newTag('div')
                            .attr({
                                class : 'search-container filter',
                            })
                            .append(newTag('div')
                                .attr({
                                    class : 'row with-forms',
                                    id : 'screen'
                                })
//                              .css({
//                                  'padding-top' : '0px',
//                                  'padding-bottom' : '0px'
//                              })
                                .append(newTag('label')
                                    .attr({
                                        id : 'screen_label'
                                    })
                                )
//                              .append(newTag('div')
//                                  .attr({
//                                      class : 'col-md-4'
//                                  })
//                                  .append(newTag('div')
//                                      .attr({
//                                          class : 'search-container filter'
//                                      })
//                                      .append(newTag('div')
//                                          .attr({
//                                              class : 'row',
//                                              id : 'screen'
//                                          })
//                                      )
//                                  )
//                              )
//                              .append(newTag('div')
//                                  .attr({
//                                      class : 'col-md-8'
//                                  })
//                                  .append(newTag('div')
//                                      .attr({
//                                          class : 'search-container filter'
//                                      })
//                                      .append(newTag('div')
//                                          .attr({
//                                              class : 'row',
//                                              id : 'subscreen'
//                                          })
//                                      )
//                                  )
//                              )
                            )
                            .append(newTag('div')
                                .attr({
                                    class : 'row'
                                })
                                .append(newTag('div')
                                    .attr({
                                        class : 'col-md-1'
                                    })
                                    .append(newTag('div')
                                        .attr({
                                            class : 'main-search-input'
                                        })
                                        .append(newTag('button')
                                            .attr({
                                                class : 'button',
//                                              disabled : 'true',
                                                id : 'back'
                                            })
                                            .append('Back')
                                        )
                                    )
                                )
                                .append(newTag('div')
                                    .attr({
                                        class : 'col-md-1'
                                    })
                                )
                                .append(newTag('div')
                                    .attr({
                                        class : 'col-md-1'
                                    })
                                    .append(newTag('div')
                                        .attr({
                                            class : 'main-search-input'
                                        })
                                        .append(newTag('button')
                                            .attr({
                                                class : 'button',
                                                disabled : 'true',
                                                id : 'next'
                                            })
                                            .append('Next')
                                        )
                                    )
                                )
                            )
                            .append(newTag('br'))
                            .append(newTag('div')
                                .attr({
                                    class : 'row with-forms',
                                    id : 'notes_screen'
                                })
                                .append(newTag('label')
                                    .attr({
                                        id : 'notes_label'
                                    })
                                )
                            )
                        )
                    )
//                  .append(newTag('div')
//                      .attr({
//                          class : 'col-md-2'
//                      })
//                      .append(newTag('div')
//                          .attr({
//                              class : 'search-container filter',
//                          })
//                          .append(newTag('div')
//                              .attr({
//                                  class : 'row with-forms',
//                                  id : 'summary'
//                              })
//                          )
//                      )
//                  )
                )
            );

        var bodyFooter = newTag('div')
            .attr({
                id : 'footer'
            })
            .append(newTag('div')
                .attr({
                    class : 'container'
                })
                .append(newTag('div')
                    .attr({
                        class : 'row'
                    })
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-3 col-sm-6'
                        })
                        .append(newTag('img')
                            .attr({
                                alt : '',
                                class : 'footer-logo',
                                src : DEF.URL.image.logo1
                            })
                        )
                        .append(newTag('br'))
                        .append(newTag('br'))
                        .append(newTag('span')
                            .append('(800) 600-0076')
                        )
                        .append(newTag('br'))
                        .append(newTag('span')
                            .append('(323) 469-6000')
                        )
                        .append(newTag('br'))
                        .append(newTag('span')
                            .append('24 hours a day')
                        )
                    )
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-5 col-sm-12'
                        })
                        .append(newTag('h4')
                            .append('Locations')
                        )
                        .append(newTag('div')
                            .attr({
                                class : 'text-widget'
                            })
                            .append(newTag('strong')
                                .append('Mount Sinai Hollywood Hills FD1010')
                            )
                            .append(newTag('br'))
                            .append(newTag('span')
                                .append('5950 Forest Lawn Drive')
                            )
                            .append(newTag('br'))
                            .append(newTag('span')
                                .append('Los Angeles, CA 90068')
                            )
                            .append(newTag('br'))
                        )
                        .append(newTag('br'))
                        .append(newTag('div')
                            .attr({
                                class : 'text-widget'
                            })
                            .append(newTag('strong')
                                .append('Mount Sinai Simi Valley FD1745')
                            )
                            .append(newTag('br'))
                            .append(newTag('span')
                                .append('6150 Mount Sinai Drive')
                            )
                            .append(newTag('br'))
                            .append(newTag('span')
                                .append('Simi Valley, CA 93063')
                            )
                            .append(newTag('br'))
                        )
                    )
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-4 col-sm-12'
                        })
                        .append(newTag('h4')
                            .append('Park Hours')
                        )
                        .append(newTag('div')
                            .attr({
                                class : 'text-widget'
                            })
                            .append('Our cemeteries are open Sunday - Friday 8:00 AM - 5:00 PM daily except Saturday in observance of the Sabbath.')
                        )
                    )
                )
                .append(newTag('div')
                    .attr({
                        class : 'row'
                    })
                    .append(newTag('div')
                        .attr({
                            class : 'col-md-12'
                        })
                        .append(newTag('div')
                            .attr({
                                class : 'copyrights'
                            })
                            .append('© 2020 Mount Sinai Memorial Parts and Mortuaries. All Rights Reserved.')
                        )
                    )
                )
            );

        var body = newTag('body')
        .append(newTag('div')
            .attr({
                id : 'wrapper'
            })
            .append(bodyHeader)
            .append(newTag('div')
                .attr({
                    class : 'clearfix'
                })
            )
            .append(bodyBody)
            .append(bodyFooter)
            .append(newTag('div')
                .attr({
                    id : 'backtotop'
                })
                .append(newTag('a')
                    .attr({
                        href : '#'
                    })
                )
            )
        );

        lib.objForEach(params, function(val, id) {
            body.firstChild().append(newTag('input')
                .attr({
                    id : 'param_'+ id,
                    type : 'hidden',
                    value : (typeof val == 'string' ? val : JSON.stringify(val))
                })
            );
        });

        var script = DEF.URL.include.concat(DEF.URL.customScript);
        for (var i = 0; i < script.length; i++) {
            body.firstChild().append(newTag('script')
                .attr({
                    src : script[i],
                    type : 'text/javascript'
                })
            );
        }

        return newTag('html').append(head).append(body).toString();
    }
});
