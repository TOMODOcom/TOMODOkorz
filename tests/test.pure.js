describe('synchronous:\n', function(){
	beforeEach(function(){
        korz.config({router: "http://korz.betterinternethome.com/"})
    });
    describe('	GET:\n', function(){
		describe('	cross-origin:\n', function(){
			it('			success', function(){
				korz.ON();
				var url = 'https://facebook.com';
				var req = new XMLHttpRequest();
				req.open("get", url, false);
				req.send();
				expect(req.responseText.length).toBeGreaterThan(0);
				expect(req.statusText).toEqual('OK');
			});

			it('			fail', function(){
				korz.OFF();
				var req;
				try{
					var url = 'https://facebook.com';
					req = new XMLHttpRequest();
					req.open("get", url, false);
					req.send();
				}
				catch(err){

				}
				expect(req.responseText.length).toEqual(0);
				expect(req.statusText).toEqual('');
			});
		});

		describe('		in-origin:\n', function(){
			it('			success', function(){
				korz.ON();
				var url = 'http://localhost:8000';
				var req = new XMLHttpRequest();
				req.open("get", url, false);
				req.send();
				
				expect(req.responseText.length).toBeGreaterThan(0);
				expect(req.statusText).toEqual('OK');
			});
		});
	});
	describe('	POST:\n', function(){
		describe('	cross-origin:\n', function(){
			it('			success', function(){
				korz.ON();
				var url = 'https://facebook.com';
				var req = new XMLHttpRequest();
				req.open("post", url, false);
				req.send();
				
				expect(req.responseText.length).toBeGreaterThan(0);
				expect(req.statusText).toEqual('OK');
			});
			it('			fail', function(){
				korz.OFF();
				var req;
				try{
					var url = 'https://facebook.com';
					req = new XMLHttpRequest();
					req.open("post", url, false);
					req.send();
				}
				catch(err){

				}
				expect(req.responseText.length).toEqual(0);
				expect(req.statusText).toEqual('');
			});

		});
		describe('		in-origin:\n', function(){
			it('			success', function(){
				korz.ON();
				var url = 'http://localhost:8000';
				var req = new XMLHttpRequest();
				req.open("post", url, false);
				req.send();
				
				expect(req.responseText.length).toBeGreaterThan(0);
				expect(req.statusText).toEqual('OK');
			});
		});
	});
});

describe('Asynchronous:\n', function(){
	describe('	GET:\n', function(){
		describe('		cross-origin:\n', function(){
			it('			success', function(){
				var done = false;
				var req;
				runs(function(){
					korz.ON();
					var url = 'https://facebook.com';
					req = new XMLHttpRequest();
					req.open("get", url, true);
					req.send();
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
				
				runs(function(){
					expect(req.responseText.length).toBeGreaterThan(0);
					expect(req.statusText).toEqual('OK');
				});
			});

			it('			fail', function(){
				korz.OFF();
				var done = false;
				var req;

				runs(function(){
					try{
						var url = 'https://facebook.com';
						req = new XMLHttpRequest();
						req.open("get", url, true);
						req.send();
						
					}
					catch(err){
					
					}
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
				
				runs(function(){
					expect(req.responseText.length).toEqual(0);
					expect(req.statusText).toEqual('');
				});
			});
		});

		describe('		in-origin:\n', function(){
			it('			should success', function(){
				korz.ON();
				var req;
				runs(function(){
					var url = 'http://localhost:8000';
					req = new XMLHttpRequest();
					req.open("get", url, false);
					req.send();
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
					
				runs(function(){
					expect(req.responseText.length).toBeGreaterThan(0);
					expect(req.statusText).toEqual('OK');
				});
			});
		});
	});
	describe('	POST:\n', function(){
		describe('		cross-origin:\n', function(){
			it('			success', function(){
				var done = false;
				var req;
				runs(function(){
					korz.ON();
					var url = 'https://facebook.com';
					req = new XMLHttpRequest();
					req.open("post", url, true);
					req.send();
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
				
				runs(function(){
					expect(req.responseText.length).toBeGreaterThan(0);
					expect(req.statusText).toEqual('OK');
				});
			});

			it('			fail', function(){
				korz.OFF();
				var done = false;
				var req;

				runs(function(){
					try{
						var url = 'https://facebook.com';
						req = new XMLHttpRequest();
						req.open("post", url, true);
						req.send();
						
					}
					catch(err){
					
					}
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
				
				runs(function(){
					expect(req.responseText.length).toEqual(0);
					expect(req.statusText).toEqual('');
				});
			});
		});

		describe('		in-origin:\n', function(){
			it('			should success', function(){
				korz.ON();
				var req;
				runs(function(){
					var url = 'http://localhost:8000';
					req = new XMLHttpRequest();
					req.open("post", url, false);
					req.send();
				});
				waitsFor(function(){
					return req.readyState == 4;
				});
					
				runs(function(){
			        expect(req.responseText.length).toBeGreaterThan(0);
					expect(req.statusText).toEqual('OK');
				});
			});
		});
	});
});