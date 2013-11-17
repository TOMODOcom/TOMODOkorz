describe('Jquery\n 	', function(){
    describe('$.ajax:\n', function(){
		describe('	GET:\n', function(){
			describe('	cross-origin:\n', function(){
                it('			success', function(){
                    korz.ON();
                    var url = 'https://facebook.com';
                    var response = '';
                    var done = false;
                    var jqXHR;
                    runs(function(){
                        $.ajax(
                            {
                                type: "GET",
                                url: url
                            }
                        )
                            .done(function(data){
                                // console.log(data);
                            })
                            .always(function(data, status,_jqXHR){

                                done = true;
                                response = data;
                                jqXHR = _jqXHR;
                            })
                            .fail(function(jqXHR, textError, error){
                                // console.log(jqXHR, textError, error);
                                done = true;
                            });
                    });

                    waitsFor(function(){
                        return done;
                    });


                    // console.log(reponse)
                    runs(function(){
                        expect(response.length).toBeGreaterThan(0);
                        expect(jqXHR.statusText).toEqual('OK');
                    });
                });
                it('			fail', function(){
                    korz.OFF();
                    var url = 'https://facebook.com';
                    var response = '';
                    var done = false;
                    var fail = false;
                    runs(function(){
                        $.ajax(
                            {
                                type: "GET",
                                url: url
                            }
                        )
                            .done(function(data){

                            })
                            .always(function(data, jqXHR){

                            })
                            .fail(function(jqXHR, textError, error){
                                fail = true;
                                done = true;
                            });
                    });

                    waitsFor(function(){
                        return done;
                    });

                    // console.log(reponse)
                    runs(function(){
                        expect(response.length).toEqual(0);
                    });
                });
				
			});

			describe('		in-origin:\n', function(){
                it('			success', function(){
                    korz.ON();
                    var url = 'http://localhost:9876/?id=27749648';
                    var response = '';
                    var done = false;
                    runs(function(){
                        $.ajax(
                            {
                                type: "GET",
                                url: url
                            }
                        )
                            .done(function(data){
                                // console.log(data);
                            })
                            .always(function(data, jqXHR){

                                done = true;
                                response = data;
                            })
                            .fail(function(jqXHR, textError, error){
                                // console.log(jqXHR, textError, error);
                                done = true;
                            });
                    });

                    waitsFor(function(){
                        return done;
                    });


                    // console.log(reponse)
                    runs(function(){
                        expect(response.length).toBeGreaterThan(0);
                    });
                });
                it('			succes without korz', function(){
                    korz.OFF();
                    var url = 'http://braude.biz:9876/?id=27749648';
                    var response = '';
                    var done = false;
                    runs(function(){
                        $.ajax(
                            {
                                type: "GET",
                                url: url
                            }
                        )
                            .done(function(data){
                                // console.log(data);
                            })
                            .always(function(data, jqXHR){
                                done = true;
                                response = data;
                            })
                            .fail(function(jqXHR, textError, error){
                                // console.log(jqXHR, textError, error);
                                done = true;
                            });
                    });

                    waitsFor(function(){
                        return done;
                    });


                    // console.log(reponse)
                    runs(function(){
                        expect(response.length).toBeGreaterThan(0);
                    });
                });
			});
		});
		describe('	POST:\n', function(){
			describe('	cross-origin:\n', function(){
				it('	        success', function(){
					korz.ON();
					var url = 'https://facebook.com';
                    var done = false;
                    var response = '';
                    var jqXHR;
                    runs(function(){
                        $.ajax(
                            {
                                type: "POST",
                                url: url
                            }
                        )
                        .always(function(data, status, _jqXHR){
                            jqXHR = _jqXHR;
                            response = data;
                            done = true;
                        })
                        ;
                    });
                    waitsFor(function(){
                        return done;
                    });
                    runs(function(){
                        expect(response.length).toBeGreaterThan(0);
                        expect(jqXHR.statusText).toEqual('OK');
                    });

				});
				it('			fail', function(){
                    korz.OFF();
                    var url = 'https://facebook.com';
                    var done = false;
                    var response = '';
                    var jqXHR;
                    runs(function(){
                        $.ajax(
                            {
                                type: "POST",
                                url: url
                            }
                        )
                        .always(function(data, status, _jqXHR){
                            if(status != 'error'){
                                jqXHR = _jqXHR;
                                response = data;
                                done = true;
                            }
                        })
                        .fail(function(_jqXHR){
                            jqXHR = _jqXHR;
                            done = true;
                        })
                        ;
                    });
                    waitsFor(function(){
                        return done;
                    })
                    ;
                    runs(function(){

                        expect(response.length).toEqual(0);
                        expect(jqXHR.statusText).toEqual('error');
                    });
				});
			});
		});
	});

    describe('$.ajax syncronous:\n', function(){
        describe('  GET:\n', function(){
            describe('      cross origin:\n', function(){
                it('        with korz -- success', function(){
                    korz.ON();
                    var url = 'https://facebook.com';

                    var done = false;
                    var jqXHR;
                    var response;
                    $.ajax(
                        {
                            type: "GET",
                            url: url,
                            async: false
                        }
                    )
                    .always(function(data, status, _jqXHR){
                            jqXHR = _jqXHR;
                            response = data;
                    })
                    ;

                    expect(response.length).toBeGreaterThan(0);
                    expect(jqXHR.statusText).toEqual('OK');

                });
                it('        without korz -- fails', function(){
                    korz.OFF();
                    var url = 'https://facebook.com';

                    var done = false;
                    var jqXHR;
                    var response;
                    $.ajax(
                        {
                            type: "GET",
                            url: url,
                            async: false
                        }
                    )
                        .fail(function(_jqXHR){
                            jqXHR = _jqXHR;
                        })
                    ;
                    var fail =
                        jqXHR.statusText.indexOf('error') > -1 ||
                        jqXHR.statusText.indexOf('Failure') > -1;
                    expect(fail).toBe(true);

                });
            });
        });
        describe('  POST:\n', function(){
            describe('      cross origin:\n', function(){
                it('        with korz -- success', function(){
                    korz.ON();
                    var url = 'https://facebook.com';

                    var done = false;
                    var jqXHR;
                    var response;
                    $.ajax(
                        {
                            type: "POST",
                            url: url,
                            async: false
                        }
                    )
                        .always(function(data, status, _jqXHR){
                            jqXHR = _jqXHR;
                            response = data;
                        })
                    ;
                    expect(response.length).toBeGreaterThan(0);
                    expect(jqXHR.statusText).toEqual('OK');

                });
                it('        without korz -- fails', function(){
                    korz.OFF();
                    var url = 'https://facebook.com';

                    var done = false;
                    var jqXHR;
                    var response;
                    $.ajax(
                        {
                            type: "POST",
                            url: url,
                            async: false
                        }
                    )
                        .fail(function(_jqXHR){
                            jqXHR = _jqXHR;
                        })
                    ;
                    var fail =
                        jqXHR.statusText.indexOf('error') > -1 ||
                        jqXHR.statusText.indexOf('Failure') > -1;
                        expect(fail).toBe(true);
                });
            });
        });
    });
    describe(' real post', function(){
        it('    $.post', function(){
           korz.ON();
            var done = false;
            var data;
            runs(function(){
                $.post('http://braude.biz/korz/mock_post' ,JSON.stringify({ha:"loha"}) , function(_data){
                   data = JSON.parse(_data);
                   done = true;
                });
            });
            waitsFor(function(){
                return done;
            });
            runs(function(){
                expect(data.success).toBe(true);
                expect(data.data.ha).toEqual('loha');
            });
        });
    });

    describe('test with credentials', function(){
        it(' with korz off -- seccusseds', function(){
            korz.OFF();
            var done = false;
            var response_data = '';
            var status = '';
            runs(function(){
                $.ajax({
                    type: "POST",
                    url: 'http://betterinternethome.com/korz/mock_post_with_credentials',
                    data: {},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: 'json',
                    success: function(data, _status, jqXHR){
                        done = true;
                        status = _status;
                        response_data = data;
                    },
                    error: function(jqXHR, status, something_else){
                        done = true;
                    }
                });
            });
            waitsFor(function(){
                return done;
            });
            runs(function(){
                expect(status).toEqual('success');
                expect(response_data['I am']).toEqual('a mock');
            });
        });
        it(' with korz ON -- seccusseds', function(){
            korz.ON();
            var done = false;
            var response_data = '';
            var status = '';
            runs(function(){
                $.ajax({
                    type: "POST",
                    url: 'http://betterinternethome.com/korz/mock_post_with_credentials',
                    data: {},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: 'json',
                    success: function(data, _status, jqXHR){
                        done = true;
                        status = _status;
                        response_data = data;
                    },
                    error: function(jqXHR, status, something_else){
                        done = true;
                    }
                });
            });
            waitsFor(function(){
                return done;
            });
            runs(function(){
                expect(status).toEqual('success');
                expect(response_data['I am']).toEqual('a mock');
            });

        });
    });

});