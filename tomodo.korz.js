//ifndef
if(typeof korz == 'undefined'){

    var korz = {
       router:"http://korz.tomodo.me/"
    };
    korz.config = function(options){
        for(var opt in options){
            this[opt] = options[opt];
        }
        return this;
    }

    korz.OriginalHttpRequest = XMLHttpRequest;
    korz.SuperHttpRequest = function (){

        var superHttpRequest = this;
        //  korz.OriginalHttpRequest is just the regular XMLHttpRequest
        var originalHttpRequest = new korz.OriginalHttpRequest();

        // used in case of regrets :)
        this.regret = function(){
            originalHttpRequest = new korz.OriginalHttpRequest();
            originalHttpRequest.open.apply(originalHttpRequest, superHttpRequest.openArguments);
        }

        // -------------------------------------------------------------------------
        // 		overload it
        // -------------------------------------------------------------------------

        this.open = function(){
            superHttpRequest.url = arguments[1];

            // saved in case of regret... :(
            superHttpRequest.openArguments = arguments;


        };

        this.yokoman = function(){
            if(!superHttpRequest.isRelative()){
                // not a relative url
                if(!superHttpRequest.hasProtocol()){
                    superHttpRequest.url = location.protocol + superHttpRequest.url;
                }
                // now url is 'canonical' with protocol

                // check for cross domain
                if(superHttpRequest.isCrossDomain()){
                    superHttpRequest.openArguments[1] = korz.router +  superHttpRequest.url;
                }
            }
            //
        }

        this.doOpen = function(){
            try{
                originalHttpRequest.open.apply(originalHttpRequest, superHttpRequest.openArguments);
            }
            catch(error){
                console.log('open failed');
                console.log(error);
            }
            //
        }

        this.send = function(){
            try{

                if(!this.withCredentials){
                    this.yokoman();
                }
                superHttpRequest.doOpen();
                while(this.headers.length > 0){
                    var header = this.headers.shift();
                    var key = header[0];
                    var value= header[1];
                    originalHttpRequest.setRequestHeader(key, value);
                }
                return originalHttpRequest.send(arguments[0] || null);
            }
            catch(error){
                console.log('send failed');
                console.log(error);
            }
        };

        this.headers = [];
        this.setRequestHeader = function(){
            this.headers.push(arguments);
        }

        // -------------------------------------------------
        //  proxify it ~
        // -------------------------------------------------

        for(var prop in originalHttpRequest){
            if(!superHttpRequest[prop]){
                // set every XMLHttpRequest property that SuperHttpRequest doesn't override
                (function(prop){
                    if(prop.indexOf('on') == 0){
                        // XMLHttpRequest callbacks
                        // are assigned SuperHttpRequest methods
                        originalHttpRequest[prop] = function(){
                            if(superHttpRequest[prop]){
                                return superHttpRequest[prop].apply(superHttpRequest, arguments);
                            }
                        }
                    }
                    else if(typeof originalHttpRequest[prop] == 'function'){
                        // all other method of XMLHttpRequest are proxied by coresponding SuperHttpRequest methods
                        superHttpRequest[prop] = function(){
                            return originalHttpRequest[prop].apply(originalHttpRequest, arguments);
                        }
                    }
                    else {
                        //
                        // all memebers of XMLHttpRequest are proxied by coresponding SuperHttpRequest members
                        Object.defineProperty(superHttpRequest, prop,{
                            set: function(value){
                                originalHttpRequest[prop] = value;
                            },
                            get: function(){
                                try{
                                    return originalHttpRequest[prop];
                                }
                                catch(error){
                                    console.log('error getting property ', prop);
                                    console.log(error)
                                }

                            }
                        });
                    }
                })(prop);
            }
        }
    };

// -------------------------------------------------
// tests for cross domain request
// -------------------------------------------------
    korz.SuperHttpRequest.prototype.isCrossDomain = function(){
        var notCrossDomain = RegExp('^' + location.origin.replace(/\./g,'\\.') );
        return !notCrossDomain.test(this.url);
    };
// -------------------------------------------------

// -------------------------------------------------
// test for
// -------------------------------------------------
    korz.SuperHttpRequest.prototype.hasProtocol = function(url){
        var hasProtocol = RegExp('^https?://');
        return hasProtocol.test(this.url);
    };
// -------------------------------------------------

// -------------------------------------------------
// test for relative urls
// -------------------------------------------------
    korz.SuperHttpRequest.prototype.isRelative = function(url){
        var notRelative = RegExp('^(https?:)?//');
        return !notRelative.test(this.url);
    };
// -------------------------------------------------

// -------------------------------------------------
// turns cross domain sharing ON
// -------------------------------------------------
    korz.ON = function (){
        if( window.XMLHttpRequest != korz.SuperHttpRequest)
            window.XMLHttpRequest = korz.SuperHttpRequest;
        return this;
    }
// -------------------------------------------------

// -------------------------------------------------
// turns cross domain sharing OFF
// -------------------------------------------------
    korz.OFF = function (){
        if( window.XMLHttpRequest != korz.OriginalHttpRequest )
            window.XMLHttpRequest = korz.OriginalHttpRequest;
        return this;
    }
// -------------------------------------------------

// defualt is on :)
    korz.ON();

}
//endif
