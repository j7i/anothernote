export default class Controller {

    constructor(store) {
        this.store = store;
    }

    getAll() {
        this.store.all()
    }

    addItem(title, content, date, rating) {
        this.store.insert({
            id: Date.now(),
            title,
            content,
            date,
            rating,
            completed: false
        }, () => {
            console.log('Added Item');
        });
    }

    removeItem(id) {
		this.store.remove({id}, () => {
			console.log('Removed Item');
		});
    }
    
    updateItem(query, callback) {
        this.store.update({id}, () => {
            console.log('Updated Status');
        });
    }
}
