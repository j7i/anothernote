import Datastore from 'nedb-promise';

export default class Store {

	constructor(name, callback) {
		const localStorage = window.localStorage;
        let liveTasks;

		this.DB = new Datastore({filename: 'notes.db', autoload: true, timestampData: true})

		if (callback) {
			callback();
		}
    }
    
    all() {
        let notes = this.DB.find({});
        return notes;
    }

	insert(item) {
		this.DB.insert(item, function(err, docs) {
                console.log('Saved note:', item);
        });
        console.log(this.DB)
    }

    remove(query, callback) {
		let task;

		const tasks = this.getLocalStorage().filter(tasks => {
			for (task in query) {
				if (query[task] !== tasks[task]) {
					return true;
				}
			}
			return false;
		});

        this.setLocalStorage(tasks);
        console.log('Updated Status');

		if (callback) {
			callback(tasks);
		}
    }

    
}