
const EsClient = require('@elastic/elasticsearch').Client;

function getFuncName() {
   return getFuncName.caller.name
}

//TODO Set index settings/mappings!

module.exports = function (config) {

	return {
		
		getThing: async function (name, def){
			return new Promise((resolve, reject) => {
				this.esclient.get({
					index: this.index,
					id: this.prefix+"_"+name
				}).then((res) => {
	// 				console.dir(res)
					try {
						resolve(JSON.parse(res._source.content))
					} catch(e) {
						reject(e)
					}
				}, (err) => {
	// 				console.warn(err);
					// return default if not found
					resolve(def)
				})
			});
		},
		
		saveThing: async function (name, content){
			return new Promise((resolve, reject) => {
				this.esclient.index({
					index: this.index,
					id: this.prefix+"_"+name,
					body: {
						"@timestamp": new Date().toISOString(),
						content: JSON.stringify(content)
					}
				}).then((res) => {
	// 				console.dir(res)
					resolve(true)
				}, reject)
			});
		},
		
		init: async function(settings) {
	// 		console.log(getFuncName())
			
			this.config = config;
			this.runtime = settings;
			this.index = config.index;
			this.prefix = config.prefix || "NodeRed";
			this.esclient = new EsClient(config);
			
		},
		getFlows: async function() {
	// 		console.dir(getFuncName())
			return this.getThing('Flows', []);
		},
		saveFlows: async function(flows) {
	// 		console.log(getFuncName())
			return this.saveThing('Flows', flows);
		},
		getCredentials: async function() {
	// 		console.log(getFuncName())
			return this.getThing('Credentials', {});
		},
		saveCredentials: async function(creds) {
	// 		console.log(getFuncName())
			return this.saveThing('Credentials', creds);
		},
		getSettings: async function(){
	// 		console.log(getFuncName())
			return this.getThing('Settings', {});
		},
		saveSettings: async function(settings) {
	// 		console.log(getFuncName())
			return this.saveThing('Settings', settings);
		},
		getSessions: async function() {
	// 		console.log(getFuncName())
			return this.getThing('Sessions', {});
		},
		saveSessions: async function(sessions) {
	// 		console.log(getFuncName())
			return this.saveThing('Sessions', sessions);
		}//,

		/* Library Functions */

	// 	getLibraryEntry: async function(type, path) {
	// 		console.log(getFuncName())
	// 
	// 	},
	// 	saveLibraryEntry: async function(type, path, meta, body) {
	// 		console.log(getFuncName())
	// 
	// 	}
	}
}

